import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import VisaPlanner from './components/VisaPlanner'
import './utils/assign-polyfill'
import {VisaPlannerState} from "./reducers/reducer"

const reduxDevToolsPlugin = (window as any).__REDUX_DEVTOOLS_EXTENSION__
const store = createStore<VisaPlannerState>(
    reducer,
    (typeof reduxDevToolsPlugin === "function") && reduxDevToolsPlugin()
)

ReactDom.render(
    <Provider store={store}>
        <VisaPlanner />
    </Provider>,
    document.getElementById('react-entry')
)
