import userReducer, { INITIAL_USER_STATE, VisaPlannerUserState } from './userReducer'
import uiReducer, { INITIAL_UI_STATE, VisaPlannerUIState } from './uiReducer'
import { combineReducers } from 'redux'


export interface VisaPlannerState {
    user: VisaPlannerUserState
    ui: VisaPlannerUIState
}

export const INITIAL_STATE: VisaPlannerState = {
    user: INITIAL_USER_STATE,
    ui: INITIAL_UI_STATE,
}

const reducer = combineReducers<VisaPlannerState>({
    user: userReducer,
    ui: uiReducer,
})

export default reducer
