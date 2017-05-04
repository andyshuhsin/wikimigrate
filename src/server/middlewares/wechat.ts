import {Context} from "koa"

import {createHash} from "crypto"
import {parseXml} from "../parseXml"
import {getInitialPerson, Person} from "../../definitions/Person"

import * as compose from "koa-compose"
import {wechatDialogue} from "../data/dialogue"
import {text} from "../../fe/utils/text"


interface WechatNormalTextData {
    MsgType: "text"
    ToUserName: string
    FromUserName: string
    CreateTime: string
    Content: string
    MsgId: string
}

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
) {
    return `<xml>
        <ToUserName><![CDATA[${toUsername}]]></ToUserName>
        <FromUserName><![CDATA[${fromUsername}]]></FromUserName>
        <CreateTime>${createTime}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
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

async function wechatNormalResponse(context: Context, next: () => Promise<any>) {
    // const responseText = JSON.stringify(context.request.toJSON(), null, 4)
    if (!isWechatRequest(context.path)) {
        return next()
    }
    const request = await parseXml<WechatNormalTextData>(context.request.body, true)
    let responseText

    const isNewUser = !state.users[request.FromUserName]
    const forceReset = ["重来", "reset"].includes(request.Content)

    if (isNewUser || forceReset) {
        state.users[request.FromUserName] = getInitialUserState()
    }
    else {
    }
    const userState = state.users[request.FromUserName]
    const exchange = wechatDialogue.exchanges[userState.exchangeNo]
    userState.person = exchange.getNewPersonDescription(userState.person, request.Content)
    responseText = text(exchange.text)
    userState.exchangeNo += 1

    context.body = getResponseBodyXml(
        request.ToUserName,
        request.FromUserName,
        Date.now().toString().slice(0, 8),
        responseText
    )
}

export const wechat = compose([
    wechatVerify,
    wechatNormalResponse,
])
