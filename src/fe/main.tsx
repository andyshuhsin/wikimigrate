import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, StoreEnhancer } from 'redux'
import reducer from './reducers'
import VisaPlanner from './components/VisaPlanner'
import './utils/assign-polyfill'
import {VisaPlannerState} from "./reducers/reducer"

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

const store = createStore<VisaPlannerState>(
    reducer,
    enhancer,
)

ReactDom.render(
    <Provider store={store}>
        <VisaPlanner />
    </Provider>,
    document.getElementById('react-entry')
)
