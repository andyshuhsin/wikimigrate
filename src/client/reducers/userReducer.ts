import { Action } from '../actions'
import {
    DEFAULT_AGE,
} from '../data'
import { getInitialPerson, Person } from '../../definitions/Person'
import { clone } from '../utils/clone'
import { LanguageTestId, LanguageTestItem } from '../../definitions/auxiliary/LanguageTest'
import { duration } from '../../definitions/auxiliary/Duration'


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

export type VisaPlannerUserState = Person

export const INITIAL_USER_STATE: VisaPlannerUserState
    = getInitialPerson(DEFAULT_AGE)

function userReducer(state = INITIAL_USER_STATE, action: Action): VisaPlannerUserState {
    const newState = clone(state)
    switch (action.type) {

        case 'LANGUAGE_TEST_ADD': {
            if (!newState.languageTests) {
                newState.languageTests = []
            }
            const existingTests = newState.languageTests.map(test => test.testId)
            for (const test of newLanguageTestPreference) {
                if (existingTests.indexOf(test) === -1) {
                    newState.languageTests.push({
                        testId: test,
                        scores: defaultLanguageTestResults[test]
                    })
                    break
                }
            }
            return newState
        }

        case 'LANGUAGE_TEST_REMOVE': {
            if (!newState.languageTests) {
                newState.languageTests = []
            }
            newState.languageTests.splice(action.payload.index, 1)
            return newState
        }

        case 'LANGUAGE_TEST_CHANGE': {
            if (!newState.languageTests) {
                newState.languageTests = []
            }
            newState.languageTests[action.payload.index] = {
                testId: action.payload.test,
                scores: defaultLanguageTestResults[action.payload.test]
            }
            return newState
        }

        case 'Language_Test_Score_Change': {
            if (!newState.languageTests) {
                newState.languageTests = []
            }
            newState.languageTests[action.payload.index]
                .scores[action.payload.item] = action.payload.score
            return newState
        }

        case 'EDUCATION_ADD': {
            if (!newState.education) {
                newState.education = []
            }
            newState.education.push({
                qualityId: 'education',
                stage: 'bachelor',
                region: 'world',
                duration: duration(4, 'year'),
                graduationDate: { year: 2000 },
            })
            return newState
        }

        case 'EDUCATION_REMOVE': {
            if (!newState.education) {
                return state
            }
            newState.education.splice(action.payload.index, 1)
            return newState
        }

        case 'EDUCATION_STAGE_CHANGE': {
            if (!newState.education) {
                return state
            }
            newState.education[action.payload.index].stage = action.payload.stage
            return newState
        }

        case 'EDUCATION_REGION_CHANGE': {
            if (!newState.education) {
                return state
            }
            newState.education[action.payload.index].region = action.payload.region
            return newState
        }

        case 'EDUCATION_DURATION_CHANGE': {
            if (!newState.education) {
                return state
            }
            newState.education[action.payload.index].duration = action.payload.duration
            return newState
        }

        case 'EDUCATION_CHANGE_GRADUATION_DATE': {
            if (!newState.education) {
                return state
            }
            newState.education[action.payload.index].graduationDate =
                {year: action.payload.graduateYear}
            return newState
        }

        case 'BIRTH_YEAR_CHANGE': {
            newState.birth.date.year = action.payload.year
            return newState
        }

        case 'WORK_ADD': {
            if (!newState.workExperiences) {
                newState.workExperiences = []
            }
            newState.workExperiences.push({
                qualityId: 'work_experience',
                region: 'world',
                duration: duration(1, 'year')
            })
            return newState
        }

        case 'WORK_REMOVE': {
            if (!newState.workExperiences) {
                newState.workExperiences = []
            }
            newState.workExperiences.splice(action.payload.index, 1)
            return newState
        }

        case 'WORK_DURATION_CHANGE': {
            if (!newState.workExperiences) {
                newState.workExperiences = []
            }
            newState.workExperiences[action.payload.index].duration =
                action.payload.duration
            return newState
        }

        case 'WORK_REGION_CHANGE': {
            if (!newState.workExperiences) {
                newState.workExperiences = []
            }
            newState.workExperiences[action.payload.index].region =
                action.payload.region
            return newState
        }

        case 'SPOUSE_EXISTENCE_CHANGE': {
            if (action.payload.hasSpouse) {
                newState.spouse = getInitialPerson(30)
            }
            else {
                newState.spouse = null
            }
            return newState
        }

        default: {
            return state
        }
    }
}

export default userReducer
