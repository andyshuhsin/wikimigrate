import { Action } from '../actions'
import {
    DEFAULT_AGE,
    SpecifierId,
} from '../data'
import { PathwayDescriptor } from '../utils/definitions'
import { getInitialPerson, Person } from '../../definitions/Person'
import { clone } from '../utils/clone'
import { LanguageTestId, LanguageTestItem } from '../../definitions/auxiliary/LanguageTest'
import { LangId } from '../../definitions/auxiliary/MultiLang'
import data from '../../data/index'
import { PATHWAY_KW_COMPOSITE, PATHWAY_KW_SIMPLE } from '../../data/constants'
import { TransitionId } from '../../definitions/Transition'
import { duration } from '../../definitions/auxiliary/Duration'

const ESC_KEY_CODE = 27

type SIMPLE_PATHWAY_SEGMENTS = ['', PATHWAY_KW_SIMPLE, TransitionId]
type COMPOSITE_PATHWAY_SEGMENTS = ['', PATHWAY_KW_COMPOSITE, string /* "id1+id2+id3..." */]

type URLPATH_SEGMENTS = SIMPLE_PATHWAY_SEGMENTS | COMPOSITE_PATHWAY_SEGMENTS

type DefaultLanguageTestResults = {
    [test in LanguageTestId]: {
        [item in LanguageTestItem]: number
    }
}

const defaultLanguageTestResults: DefaultLanguageTestResults = {
    clb: {
        listening: 7,
        speaking: 7,
        writing: 7,
        reading: 7,
    },
    celpip: {
        listening: 7,
        speaking: 7,
        writing: 7,
        reading: 7,
    },
    ielts: {
        listening: 7,
        speaking: 7,
        writing: 7,
        reading: 7,
    },
    tef: {
        listening: 50,
        speaking: 50,
        writing: 50,
        reading: 50,
    },
    toefl: {
        listening: 20,
        speaking: 20,
        writing: 20,
        reading: 20,
    },
    'pte-academic': {
        listening: 50,
        speaking: 50,
        writing: 50,
        reading: 50,
    },
    cae: {
        listening: 50,
        speaking: 50,
        writing: 50,
        reading: 50,
    },
}

const newLanguageTestPreference: LanguageTestId[] = [
    'ielts',
    'toefl',
    'celpip',
    'tef',
    'pte-academic',
    'cae',
]

export interface VisaPlannerState {
    user: Person,
    ui: {
        lang: LangId
        query: string
        expandedFilterId: SpecifierId | null
        shouldSpecifierPanelExpand: boolean
        pathwayOnDisplay: PathwayDescriptor | null
    }
}

export const INITIAL_STATE: VisaPlannerState = {
    user: getInitialPerson(DEFAULT_AGE),
    ui: {
        lang: data.app.lang,
        query: '',
        shouldSpecifierPanelExpand: false,
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

        case 'LANGUAGE_TEST_ADD': {
            if (!newState.user.languageTests) {
                newState.user.languageTests = []
            }
            const existingTests = newState.user.languageTests.map(test => test.testId)
            for (const test of newLanguageTestPreference) {
                if (existingTests.indexOf(test) === -1) {
                    newState.user.languageTests.push({
                        testId: test,
                        scores: defaultLanguageTestResults[test]
                    })
                    break
                }
            }
            return newState
        }

        case 'LANGUAGE_TEST_REMOVE': {
            if (!newState.user.languageTests) {
                newState.user.languageTests = []
            }
            newState.user.languageTests.splice(action.payload.index, 1)
            return newState
        }

        case 'LANGUAGE_TEST_CHANGE': {
            if (!newState.user.languageTests) {
                newState.user.languageTests = []
            }
            newState.user.languageTests[action.payload.index] = {
                testId: action.payload.test,
                scores: defaultLanguageTestResults[action.payload.test]
            }
            return newState
        }

        case 'Language_Test_Score_Change': {
            if (!newState.user.languageTests) {
                newState.user.languageTests = []
            }
            newState.user.languageTests[action.payload.index]
                .scores[action.payload.item] = action.payload.score
            return newState
        }

        case 'EDUCATION_ADD': {
            if (!newState.user.education) {
                newState.user.education = []
            }
            newState.user.education.push({
                qualityId: 'education',
                stage: 'bachelor',
                region: 'world',
                duration: duration(4, 'year'),
                graduationDate: { year: 2000 },
            })
            return newState
        }

        case 'EDUCATION_REMOVE': {
            if (!newState.user.education) {
                return state
            }
            newState.user.education.splice(action.payload.index, 1)
            return newState
        }

        case 'EDUCATION_STAGE_CHANGE': {
            if (!newState.user.education) {
                return state
            }
            newState.user.education[action.payload.index].stage = action.payload.stage
            return newState
        }

        case 'EDUCATION_REGION_CHANGE': {
            if (!newState.user.education) {
                return state
            }
            newState.user.education[action.payload.index].region = action.payload.region
            return newState
        }

        case 'EDUCATION_DURATION_CHANGE': {
            if (!newState.user.education) {
                return state
            }
            newState.user.education[action.payload.index].duration = action.payload.duration
            return newState
        }

        case 'EDUCATION_CHANGE_GRADUATION_DATE': {
            if (!newState.user.education) {
                return state
            }
            newState.user.education[action.payload.index].graduationDate =
                {year: action.payload.graduateYear}
            return newState
        }

        case 'BIRTH_YEAR_CHANGE': {
            newState.user.birth.date.year = action.payload.year
            return newState
        }

        case 'WORK_ADD': {
            if (!newState.user.workExperiences) {
                newState.user.workExperiences = []
            }
            newState.user.workExperiences.push({
                qualityId: 'work_experience',
                region: 'world',
                duration: duration(1, 'year')
            })
            return newState
        }

        case 'WORK_REMOVE': {
            if (!newState.user.workExperiences) {
                newState.user.workExperiences = []
            }
            newState.user.workExperiences.splice(action.payload.index, 1)
            return newState
        }

        case 'WORK_DURATION_CHANGE': {
            if (!newState.user.workExperiences) {
                newState.user.workExperiences = []
            }
            newState.user.workExperiences[action.payload.index].duration =
                action.payload.duration
            return newState
        }

        case 'WORK_REGION_CHANGE': {
            if (!newState.user.workExperiences) {
                newState.user.workExperiences = []
            }
            newState.user.workExperiences[action.payload.index].region =
                action.payload.region
            return newState
        }

        case 'SPOUSE_EXISTENCE_CHANGE': {
            if (action.payload.hasSpouse) {
                newState.user.spouse = getInitialPerson(30)
            }
            else {
                newState.user.spouse = null
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
