import "./utils/windowPolyfill"
import {readFile} from "fs-extra"
import * as Koa from "koa"

import * as React from "react"
import {createStore} from "redux"
import {renderToString} from "react-dom/server"
import {Provider} from "react-redux"

import {ConnectedVisaPlanner} from "../client/web/components/VisaPlanner"
import reducer, {VisaPlannerState} from "../client/reducers/reducer"
import {urlpathChangeAction} from "../client/actions/index"
import {data} from "../data/index"
import {text} from "../client/utils/text"
import {getDocumentTitle} from "../client/utils/getDocumentTitle"
import {LangId} from "../definitions/auxiliary/MultiLang"

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
    store.dispatch(urlpathChangeAction(context.path))
    const preloadedState = store.getState()
    context.body = await renderFullPage(html, preloadedState, "en")
    return next
}

async function renderFullPage(html: string, preloadedState: VisaPlannerState, lang: LangId) {
    if (!template) {
        template = String(await readFile("./index.html"))
    }
    const pathwayOnDisplay = preloadedState.ui.pathwayOnDisplay
    const title = getDocumentTitle(pathwayOnDisplay, lang)
    return template
        .replace(/<!--Inject-->[\s\S]*?<!--\/Inject-->/, `
            <script>
                window.__WKM_PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            ${html}
        `)
        .replace(/<!--title-->[\s\S]*?<!--\/title-->/, title)
}

app.use(handleRender)
app.listen(PORT)
