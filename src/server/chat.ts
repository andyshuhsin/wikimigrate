import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"

import {wechat} from "./middlewares/wechat"

const chat = new Koa()
const port = 20000

chat.use(bodyParser({
    enableTypes: ["text", "json", "form"],
    extendTypes: {
        text: ["text/xml"]
    }
}))
chat.use(wechat)

chat.listen(port, () => {
    console.info("Chat started listening to", port, "at", new Date())
})
