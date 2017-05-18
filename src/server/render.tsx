import "./utils/windowPolyfill"
import {readFile} from "fs-extra"
import * as Koa from "koa"

import * as React from "react"
import {createStore} from "redux"
import {renderToString} from "react-dom/server"
import {Provider} from "react-redux"

import {ConnectedVisaPlanner} from "../client/web/components/VisaPlanner"
import reducer, {VisaPlannerState} from "../client/reducers/reducer"

const app = new Koa()
const PORT = 10000

let template: string = ""

async function handleRender(context: Koa.Context, next: () => Promise<any>) {
    const store = createStore<VisaPlannerState>(reducer)
    const html = renderToString(
        <Provider store={store}>
            <ConnectedVisaPlanner />
        </Provider>
    )
    const preloadedState = store.getState()
    context.body = await renderFullPage(html, preloadedState)
    return next
}

async function renderFullPage(html: string, preloadedState: VisaPlannerState) {
    if (!template) {
        template = String(await readFile("./index.html"))
    }
    return template.replace(/<!--Inject-->[\s\S]*?<!--\/Inject-->/, `
        <script>
            window.__WKM_PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        ${html}
    `)
}

app.use(handleRender)
app.listen(PORT)
