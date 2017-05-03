import * as Koa from 'koa'

const chat = new Koa()
const port = 20000

chat.use(((context, next) => {
    context.body = JSON.stringify(context.request.toJSON(), null, 4)
}))

chat.listen(port, () => console.info("Chat engine running at ", port))
