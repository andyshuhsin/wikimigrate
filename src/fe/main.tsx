import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, StoreEnhancer } from 'redux'
import reducer from './reducers'
import VisaPlanner from './components/VisaPlanner'
import './utils/assign-polyfill'
import {INITIAL_STATE, VisaPlannerState} from "./reducers/reducer"

import "./utils/global.css"
import "./utils/normalize.css"

let enhancer: StoreEnhancer<VisaPlannerState> | undefined

const reduxDevToolsPlugin = (window as any).__REDUX_DEVTOOLS_EXTENSION__
if (typeof reduxDevToolsPlugin === "function") {
    enhancer = reduxDevToolsPlugin()
}
else {
    enhancer = undefined
}

const REDUX_STATE_KEY = "redux_state"

function isDateString(value: any): boolean {
    return (typeof value === "string") && (!!Date.parse(value))
}

let state: VisaPlannerState
const persistedStateString = localStorage.getItem(REDUX_STATE_KEY)
const shouldForceResetReduxState = location.href.indexOf("reset") > -1
if (persistedStateString && !shouldForceResetReduxState) {
    state = JSON.parse(
        persistedStateString,
        (key: any, value: any) =>
            isDateString(value)
            // ? new Date(value)
            ? {}
            : value
    )
}
else {
    state = INITIAL_STATE
}

const store = createStore<VisaPlannerState>(
    reducer,
    state,
    enhancer,
)


store.subscribe(() => {
    localStorage.setItem(REDUX_STATE_KEY, JSON.stringify(store.getState()))
})

;(window as any).store = store

ReactDom.render(
    <Provider store={store}>
        <VisaPlanner />
    </Provider>,
    document.getElementById('react-entry')
)
