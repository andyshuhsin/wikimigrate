import { Action } from '../actions'
import {
    DEFAULT_AGE,
    SpecifierId,
} from '../data'
import { PathwayDescriptor } from '../utils/definitions'
import { getInitialPerson, Person } from '../../definitions/Person'
import { clone } from '../utils/clone'
import { duration } from '../../definitions/auxiliary/Duration'
import { WorkExperienceQuality } from '../../definitions/Qualities/WorkExperience'
import { EducationQuality } from '../../definitions/Qualities/EducationExperience'
import { LanguageTestResult } from '../../definitions/auxiliary/LanguageTest'
import { LangId } from '../../definitions/auxiliary/MultiLang'
import data from '../../data/index'
import { PATHWAY_KW_COMPOSITE, PATHWAY_KW_SIMPLE } from '../../data/constants'
import { TransitionId } from '../../definitions/Transition'

const ESC_KEY_CODE = 27

type SIMPLE_PATHWAY_SEGMENTS = ['', PATHWAY_KW_SIMPLE, TransitionId]
type COMPOSITE_PATHWAY_SEGMENTS = ['', PATHWAY_KW_COMPOSITE, string /* "id1+id2+id3..." */]

type URLPATH_SEGMENTS = SIMPLE_PATHWAY_SEGMENTS | COMPOSITE_PATHWAY_SEGMENTS

export interface VisaPlannerState {
    user: Person,
    ui: {
        lang: LangId
        query: string
        expandedFilterId: SpecifierId | null
        shouldSpecifierPanelExpand: boolean
        specifierPanelHeight: number | null
        pathwayOnDisplay: PathwayDescriptor | null
    }
}

export const INITIAL_STATE: VisaPlannerState = {
    user: getInitialPerson(DEFAULT_AGE),
    ui: {
        lang: data.app.lang,
        query: '',
        shouldSpecifierPanelExpand: false,
        specifierPanelHeight: null,
        expandedFilterId: null,
        pathwayOnDisplay: null,
    },
}

function reducer(state = INITIAL_STATE, action: Action): VisaPlannerState {
    const newState = clone(state)
    switch (action.type) {

        case 'KEY_DOWN': {
            if (action.payload.keyCode === ESC_KEY_CODE) {
                newState.ui.pathwayOnDisplay = null
                newState.ui.shouldSpecifierPanelExpand = false
                return newState
            }
            return state
        }

        case 'SPECIFIER_CLICK': {
            switch (action.payload.specifier) {
                case 'language': {
                    switch (action.payload.operator) {
                        case 'NEW': {
                            newState.user.languageTests.push({
                                testId: 'ielts',
                                scores: {
                                    listening: 6,
                                    speaking: 6,
                                    writing: 6,
                                    reading: 6,
                                }
                            })
                            break
                        }
                        case 'REMOVE': {
                            newState.user.languageTests.splice(action.payload.index, 1)
                        }
                    }
                    break
                }
                case 'age': {
                    break
                }
                case 'education': {
                    break
                }
                case 'work_experience': {
                    break
                }
                default: {
                    console.warn('Unexpected filterId:', (action.payload as any).filterId)
                }
            }
            return newState
        }

        case 'PATH_BOX_CLICK': {
            newState.ui.pathwayOnDisplay = {
                transitionIds: action.payload.pathway.transitions.map(transition => transition.id),
            }
            return newState
        }

        case 'PATH_VIEW_CLOSE_BUTTON_CLICK': {
            newState.ui.pathwayOnDisplay = null
            return newState
        }

        case 'FILTER_BAR_CLICK': {
            newState.ui.shouldSpecifierPanelExpand = !newState.ui.shouldSpecifierPanelExpand
            return newState
        }

        case 'TITLE_FILTER_TEXT_CLICK': {
            newState.ui.shouldSpecifierPanelExpand = !newState.ui.shouldSpecifierPanelExpand
            return newState
        }

        case 'SHADE_CLICK': {
            newState.ui.shouldSpecifierPanelExpand = false
            return newState
        }

        case 'FILTER_PANEL_RENDER': {
            newState.ui.specifierPanelHeight = action.payload.height
            return newState
        }

        case 'URLPATH_CHANGE': {
            const segs = action.payload.path.split('/') as URLPATH_SEGMENTS
            if (segs[1] === PATHWAY_KW_SIMPLE) {
                newState.ui.pathwayOnDisplay = {
                    transitionIds: segs[2].split('+'),
                }
            }
            else {
                newState.ui.pathwayOnDisplay = null
            }
            return newState
        }

        case 'SET_LANG': {
            newState.ui.lang = action.payload.langId
            return newState
        }

        default: {
            return state
        }
    }
}

export default reducer
