import {Context} from "koa"

import {createHash} from "crypto"
import {parseXml} from "../parseXml"

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

export async function wechat(context: Context, next: () => Promise<any>) {
    if (context.path !== `/api-wechat`) {
        return next()
    }
    const isVerificationMode = context.request.query["echostr"]
    if (isVerificationMode) {
        context.body = getWechatVerificationResponseBody(context.request.query)
    }
    else {
        // const responseText = JSON.stringify(context.request.toJSON(), null, 4)
        const data = await parseXml<WechatNormalTextData>(context.request.body, true)
        const responseText = data.Content
        context.body = `
            <xml>
                <ToUserName><![CDATA[${data.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[${data.ToUserName}]]></FromUserName>
                <CreateTime>${Date.now().toString().slice(0, 8)}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${responseText}]]></Content>
            </xml>
        `
    }
    await next()
}
