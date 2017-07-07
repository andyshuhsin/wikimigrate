import './windowPolyfill'

import { readFile } from 'fs-extra'
import * as Koa from 'koa'

import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { ConnectedVisaPlanner } from '../web/components/VisaPlanner'
import reducer, { VisaPlannerState } from '../reducers'
import { setLangAction, urlpathChangeAction } from '../actions/index'
import { getDocumentTitle } from '../utils/getDocumentTitle'
import { LangId } from '../../definitions/auxiliary/MultiLang'

const app = new Koa()
const PORT = 11000

const langTable: { [acceptLang: string]: LangId } = {
    en: 'en',
    zh: 'zh_hans',
    'zh-hans': 'zh_hans',
    'zh-hant': 'zh_hant',
}

function getLang(acceptLang: string): LangId {
    const lang = langTable[acceptLang]
    if (lang) {
        return lang
    }
    else {
        return 'en'
    }
}

let template: string = ''

async function handleRender(context: Koa.Context, next: () => Promise<any>) {
    const store = createStore<VisaPlannerState>(reducer)

    store.dispatch(urlpathChangeAction(context.path))
    const lang = getLang(context.request.req.headers['accept-language'])
    store.dispatch(setLangAction(lang))

    let html = renderToString(
        <Provider store={store}>
            <ConnectedVisaPlanner />
        </Provider>,
    )
    const preloadedState = store.getState()
    context.body = await renderFullPage(html, preloadedState)
    return next
}

let cssCache: string = ''

async function getCss(filenames: string[]) {
    if (cssCache) {
        return cssCache
    }
    let result = ''
    for (const filename of filenames) {
        const content = await readFile(`./${filename}`)
        result += `<style>${content}</style>`
    }
    cssCache = result
    return result
}

async function renderFullPage(html: string, preloadedState: VisaPlannerState) {
    if (!template) {
        template = String(await readFile('../web/index.html'))
    }
    const pathwayOnDisplay = preloadedState.ui.pathwayOnDisplay
    const title = getDocumentTitle(pathwayOnDisplay, preloadedState.ui.lang)
    const css = await getCss(['normalize.css', 'global.css'])
    return template
        .replace(/<!--SSR-Inject-->[\s\S]*?<!--\/SSR-Inject-->/, `
            <script>
                window.__WKM_PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            ${html}
        `)
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
        .replace('<!--css-->', css)
}

app.use(handleRender)
app.listen(PORT, () => {
    console.info('Server-side rendering process started listening to', PORT, 'at', new Date())
})
