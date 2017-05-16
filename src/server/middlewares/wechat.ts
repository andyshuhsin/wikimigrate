import {Context} from "koa"
import {Db, MongoClient} from "mongodb"

import {createHash} from "crypto"
import {parseXml} from "../parseXml"
import {getInitialPerson, Person} from "../../definitions/Person"

import * as compose from "koa-compose"
import {TopicId, wechatDialog} from "../data/dialogue"
import {text, setTextLang} from "../../fe/utils/text"
import {MONGO_URL} from "../chat"
import {Path} from "../../fe/utils/definitions"

interface WechatOrdinaryMessageData {
    MsgType: "text"
    ToUserName: string
    FromUserName: string
    CreateTime: string
    Content: string
    MsgId: string
}

interface WechatEventData {
    MsgType: "event"
    ToUserName: string
    FromUserName: string
    CreateTime: string
    Event: "subscribe" | "unsubscribe"
}

interface ChatHistoryEntry {
    timestamp: number
    speaker: string
    content: string
}

type ChatHistory = ChatHistoryEntry[]

type WechatData = WechatOrdinaryMessageData | WechatEventData

interface WechatChatbotUserPlain {
    readonly id: string
    person: Person
    ui: {
        topic: TopicId
        invalidInput: boolean
        interestedPath: number
    }
    history: ChatHistory
}

export class WechatChatbotUser implements WechatChatbotUserPlain {
    readonly id: string
    person: Person
    ui: {
        topic: TopicId
        invalidInput: boolean
        interestedPath: number
        suitablePaths: Path[]
    }
    history: ChatHistory

    constructor(id: string, topic?: TopicId, person?: Person, history: ChatHistory = []) {
        this.id = id
        this.history = history
        this.initialize(topic, person)
    }

    static loadData(input: WechatChatbotUserPlain): WechatChatbotUser {
        return new WechatChatbotUser(input.id, input.ui.topic, input.person, input.history)
    }

    initialize(topic: TopicId = "initial", person = getInitialPerson(30)) {
        this.person = person
        this.ui = {
            topic,
            invalidInput: false,
            interestedPath: 0,
            suitablePaths: [],
        }
    }
}

class WxChatbotAppState {
    readonly users: WechatChatbotUser[]
    readonly db: Db | undefined

    constructor(users: WechatChatbotUser[] = [], db?: Db) {
        this.users = users
        this.db = db
    }

    async addUser(user: WechatChatbotUser): Promise<void> {
        this.users.push(user)
        if (this.db) {
            this.db.collection(USERS_COLLECTION_KEY).insert(user)
        }
        return undefined
    }

    getUser(id: string): WechatChatbotUser | undefined {
        return this.users.find(user => user.id === id)
    }

    updateUser(id: string, userData: Partial<WechatChatbotUserPlain>) {
        const user = this.getUser(id)
        if (!user) {
            console.warn("Unkown user id:", id)
            return
        }
        Object.assign(user, userData)
        if (this.db) {
            this.db.collection(USERS_COLLECTION_KEY)
                .update(
                    {id: id},
                    user
                )
        }
    }
}

interface WechatContext extends Context {
    state: WxChatbotAppState
}

setTextLang("zh_hans")

const TOKEN = process.env["WKM_WECHAT_TOKEN"]
const USERS_COLLECTION_KEY = "users"

export function sha1(s: any): string {
    const hasher = createHash("sha1")
    hasher.update(s)
    return hasher.digest("hex").toString()
}

/**
 * @see https://mp.weixin.qq.com/wiki/8/f9a0b8382e0b77d87b3bcc1ce6fbc104.html
 */
function isWechatSignatureValid(
    token: string,
    timestamp: string,
    nonce: string,
    signature: string,
): boolean {
    const hash = sha1([token, timestamp, nonce].sort().join(""))
    return hash === signature
}

function getWechatVerificationResponseBody(query: Object): string {
    const {
        timestamp,
        nonce,
        signature,
        echostr,
    } = (query as any)
    if (isWechatSignatureValid(TOKEN, timestamp, nonce, signature)) {
        return echostr
    }
    else {
        return ""
    }
}

function getResponseBodyXml(
    content: string,
    fromUsername: string,
    toUsername: string,
    msgType: WechatData["MsgType"],
    createTime: string = Date.now().toString().slice(0, 8),
) {
    return `<xml>
        <ToUserName><![CDATA[${toUsername}]]></ToUserName>
        <FromUserName><![CDATA[${fromUsername}]]></FromUserName>
        <CreateTime>${createTime}</CreateTime>
        <MsgType><![CDATA[${msgType}]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
        </xml>
    `
}


function isWechatRequest(path: string): boolean {
    return path === "/api-wechat"
}

async function loadPersistentState(context: WechatContext, next: () => Promise<any>) {
    if (Object.keys(context.state).length === 0) {
        const db = await MongoClient.connect(MONGO_URL)
        const users = (await db.collection(USERS_COLLECTION_KEY)
                              .find<WechatChatbotUserPlain>()
                              .toArray())
                              .map(user => WechatChatbotUser.loadData(user))
        context.state = new WxChatbotAppState(users, db)
    }
    return next()
}

async function wechatVerify(context: WechatContext, next: () => Promise<any>) {
    const isVerificationMode = context.request.query["echostr"]
    if (isWechatRequest(context.path) && isVerificationMode) {
        context.body = getWechatVerificationResponseBody(context.request.query)
    }
    else {
        await next()
    }
}


/** @see https://mp.weixin.qq.com/wiki/7/9f89d962eba4c5924ed95b513ba69d9b.html */
async function wechatEvent(context: WechatContext, next: () => Promise<any>) {
    const request = await parseXml<WechatData>(context.request.body, true)
    if (!isWechatRequest(context.path) || request.MsgType !== "event") {
        return next()
    }
    if (request.Event === "subscribe") {
        const user = new WechatChatbotUser(request.FromUserName)
        const responseText = wechatDialog.text(user)
        context.body = getResponseBodyXml(
            responseText,
            request.ToUserName,
            request.FromUserName,
            "text",
            Date.now().toString().slice(0, 8),
        )
        context.state.addUser(user)
    }
    else if (request.Event === "unsubscribe") {

    }
    else {
        console.error(`Cannot recognize event type ${request.Event}
                       ${JSON.stringify(context.request.body, null, 4)}`)
    }
}

/** @see https://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html */
async function wechatOrdindaryMessage(context: WechatContext, next: () => Promise<any>) {
    const request = await parseXml<WechatData>(context.request.body, true)
    if (!isWechatRequest(context.path) || request.MsgType !== "text") {
        return next()
    }

    let user = context.state.getUser(request.FromUserName)
    if (!user) {
        console.warn("Unknown user making conversation, subscribe event unprocessed?", request.FromUserName)
        user = new WechatChatbotUser(request.FromUserName)
        context.state.addUser(user)
    }

    user = wechatDialog.reduce(user, request.Content)

    context.body = getResponseBodyXml(
        wechatDialog.text(user),
        request.ToUserName,
        request.FromUserName,
        "text",
        Date.now().toString().slice(0, 8),
    )
    context.state.updateUser(user.id, user)
}

export const wechat = compose([
    loadPersistentState,
    wechatVerify,
    wechatEvent,
    wechatOrdindaryMessage,
])
