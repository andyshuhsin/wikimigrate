import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import { wechat } from './middlewares/wechat'

const PORT = 20000
export const MONGO_URL = 'mongodb://localhost:27017/gomi'

const chat = new Koa()

chat.use(bodyParser({
    enableTypes: ['text', 'json', 'form'],
    extendTypes: {
        text: ['text/xml'],
    },
}))
chat.use(wechat)

chat.listen(PORT, () => {
    console.info('Chat started listening to', PORT, 'at', new Date())
})
