import { LangId } from '../../definitions/auxiliary/MultiLang'
import { SpecifierId } from '../data'
import { PathwayDescriptor } from '../utils/definitions'
import { data } from '../../data'
import { Action } from '../actions'
import { clone } from '../utils/clone'

import { PATHWAY_KW_COMPOSITE, PATHWAY_KW_SIMPLE } from '../../data/constants'
import { TransitionId } from '../../definitions/Transition'

type SIMPLE_PATHWAY_SEGMENTS = ['', PATHWAY_KW_SIMPLE, TransitionId]
type COMPOSITE_PATHWAY_SEGMENTS = ['', PATHWAY_KW_COMPOSITE, string /* "id1+id2+id3..." */]
type URLPATH_SEGMENTS = SIMPLE_PATHWAY_SEGMENTS | COMPOSITE_PATHWAY_SEGMENTS

export interface VisaPlannerUIState {
    lang: LangId
    query: string
    expandedFilterId: SpecifierId | null
    shouldSpecifierPanelExpand: boolean
    pathwayOnDisplay: PathwayDescriptor | null
}

export const INITIAL_UI_STATE: VisaPlannerUIState = {
    lang: data.app.lang,
    query: '',
    shouldSpecifierPanelExpand: false,
    expandedFilterId: null,
    pathwayOnDisplay: null,
}

const ESC_KEY_CODE = 27

function uiReducer(state = INITIAL_UI_STATE, action: Action): VisaPlannerUIState {
    const newState = clone(state)
    switch (action.type) {
        case 'KEY_DOWN': {
            if (action.payload.keyCode === ESC_KEY_CODE) {
                newState.pathwayOnDisplay = null
                newState.shouldSpecifierPanelExpand = false
                return newState
            }
            return state
        }

        case 'PATH_BOX_CLICK': {
            newState.pathwayOnDisplay = {
                transitionIds: action.payload.pathway.transitions.map(transition => transition.id),
            }
            return newState
        }

        case 'PATH_VIEW_CLOSE_BUTTON_CLICK': {
            newState.pathwayOnDisplay = null
            return newState
        }

        case 'FILTER_BAR_CLICK': {
            newState.shouldSpecifierPanelExpand = !newState.shouldSpecifierPanelExpand
            return newState
        }

        case 'TITLE_FILTER_TEXT_CLICK': {
            newState.shouldSpecifierPanelExpand = !newState.shouldSpecifierPanelExpand
            return newState
        }

        case 'SHADE_CLICK': {
            newState.shouldSpecifierPanelExpand = false
            return newState
        }

        case 'URLPATH_CHANGE': {
            const segs = action.payload.path.split('/') as URLPATH_SEGMENTS
            if (segs[1] === PATHWAY_KW_SIMPLE) {
                newState.pathwayOnDisplay = {
                    transitionIds: segs[2].split('+'),
                }
            }
            else {
                newState.pathwayOnDisplay = null
            }
            return newState
        }

        case 'SET_LANG': {
            newState.lang = action.payload.langId
            return newState
        }

        default: {
            return state
        }


    }
}

export default uiReducer
