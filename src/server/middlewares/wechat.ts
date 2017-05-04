import {Context} from "koa"

import {createHash} from "crypto"
import {parseXml} from "../parseXml"
import {getInitialPerson, Person} from "../../definitions/Person"

import * as compose from "koa-compose"
import {shouldReset, wechatDialog as dialog} from "../data/dialogue"
import {text, setTextLang} from "../../fe/utils/text"

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

type WechatData = WechatOrdinaryMessageData | WechatEventData

setTextLang("zh_hans")

const TOKEN = process.env["GOMIGRANT_WECHAT_TOKEN"]

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
    fromUsername: string,
    toUsername: string,
    createTime: string,
    content: string,
    msgType: WechatData["MsgType"]
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

interface UserState {
    exchangeNo: number
    person: Person
}

interface State {
    users: {
        [id: string]: UserState
    }
}

const state: State = {
    users: {
    }
}

function getInitialUserState(): UserState {
    return {
        exchangeNo: 0,
        person: getInitialPerson(30),
    }
}

function isWechatRequest(path: string): boolean {
    return path === "/api-wechat"
}

async function wechatVerify(context: Context, next: () => Promise<any>) {
    const isVerificationMode = context.request.query["echostr"]
    if (isWechatRequest(context.path) && isVerificationMode) {
        context.body = getWechatVerificationResponseBody(context.request.query)
    }
    else {
        await next()
    }
}


/** @see https://mp.weixin.qq.com/wiki/7/9f89d962eba4c5924ed95b513ba69d9b.html */
async function wechatEvent(context: Context, next: () => Promise<any>) {
    const request = await parseXml<WechatData>(context.request.body, true)
    if (!isWechatRequest(context.path) || request.MsgType !== "event") {
        return next()
    }
    if (request.Event === "subscribe") {
        state.users[request.FromUserName] = getInitialUserState()
        context.body = getResponseBodyXml(
            request.ToUserName,
            request.FromUserName,
            Date.now().toString().slice(0, 8),
            text(dialog.exchanges[0].text),
            "text",
        )
    }
    else if (request.Event === "unsubscribe") {

    }
    else {
        console.error(`Cannot recognize event type ${request.Event}
                       ${JSON.stringify(context.request.body, null, 4)}`)
    }
}

/** @see https://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html */
async function wechatOrdindaryMessage(context: Context, next: () => Promise<any>) {
    const request = await parseXml<WechatData>(context.request.body, true)
    if (!isWechatRequest(context.path) || request.MsgType !== "text") {
        return next()
    }
    let responseText: string

    const userState = state.users[request.FromUserName]

    const forceReset = shouldReset(request.Content)
    if (forceReset) {
        state.users[request.FromUserName] = getInitialUserState()
    }

    const exchangeExhausted = userState.exchangeNo >= dialog.exchanges.length
    if (exchangeExhausted) {
        context.body = getResponseBodyXml(
            request.ToUserName,
            request.FromUserName,
            Date.now().toString().slice(0, 8),
            text(dialog.terminalExchange.text),
            "text",
        )
        userState.exchangeNo += 1
    }
    else {
        const exchange = dialog.exchanges[userState.exchangeNo]
        userState.person = exchange.getNewPersonDescription(userState.person, request.Content)
        responseText = text(exchange.text)
        userState.exchangeNo += 1

        context.body = getResponseBodyXml(
            request.ToUserName,
            request.FromUserName,
            Date.now().toString().slice(0, 8),
            responseText,
            "text",
        )
    }
}

export const wechat = compose([
    wechatVerify,
    wechatEvent,
    wechatOrdindaryMessage,
])
