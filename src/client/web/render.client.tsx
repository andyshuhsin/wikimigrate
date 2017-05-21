import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, StoreEnhancer } from 'redux'
import reducer from '../reducers'
import VisaPlanner from './components/VisaPlanner'
import '../utils/assign-polyfill'
import { INITIAL_STATE, VisaPlannerState } from '../reducers/reducer'

import '../utils/normalize.css'
import '../utils/global.css'

let enhancer: StoreEnhancer<VisaPlannerState> | undefined

const reduxDevToolsPlugin = (window as any).__REDUX_DEVTOOLS_EXTENSION__
if (typeof reduxDevToolsPlugin === 'function') {
    enhancer = reduxDevToolsPlugin()
}
else {
    enhancer = undefined
}

const REDUX_STATE_KEY = 'redux_state'

let state: VisaPlannerState
const preloadedState = (window as any)['__WKM_PRELOADED_STATE__']
if (preloadedState) {
    state = preloadedState
}
else {
    const persistedStateString = localStorage.getItem(REDUX_STATE_KEY)
    const shouldForceResetReduxState = location.href.indexOf('reset') > -1
    if (persistedStateString && !shouldForceResetReduxState) {
        state = JSON.parse(persistedStateString)
    }
    else {
        state = INITIAL_STATE
    }
}

delete (window as any).__WKM_PRELOADED_STATE__

export const store = createStore<VisaPlannerState>(
    reducer,
    state,
    enhancer,
)

store.subscribe(() => {
    localStorage.setItem(REDUX_STATE_KEY, JSON.stringify(store.getState()))
})

ReactDom.render(
    <Provider store={store}>
        <VisaPlanner />
    </Provider>,
    document.getElementById('react-entry'),
)
