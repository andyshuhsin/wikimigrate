import {Context} from "koa"

import {createHash} from "crypto"
import {parseXml} from "../parseXml"
import {Person} from "../../definitions/Person"

import * as compose from "koa-compose"


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

interface State {
    users: {
        [id: string]: {
            exchangeNo: number
            person: Person
        }
    }
}

const state: State = {
    users: {
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
    const responseText = request.Content
    context.body = getResponseBodyXml(
        request.FromUserName,
        request.ToUserName,
        Date.now().toString().slice(0, 8),
        responseText
    )
}

export const wechat = compose([
    wechatVerify,
    wechatNormalResponse,
])
