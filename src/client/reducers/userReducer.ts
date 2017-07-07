import { Action } from '../actions'
import {
    DEFAULT_AGE,
} from '../data'
import { getInitialPerson, Person } from '../../definitions/Person'
import {
    LanguageTestId,
    LanguageTestItem,
} from '../../definitions/auxiliary/LanguageTest'
import { duration } from '../../definitions/auxiliary/Duration'
import { clone } from '../utils/clone'

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

function shallowClone<T>(input: T[] | undefined): T[] {
    if (input) {
        return input.slice()
    }
    else {
        return []
    }
}

function userReducer(state = INITIAL_USER_STATE, action: Action): VisaPlannerUserState {

    const languageTests = shallowClone(state.languageTests)
    const education = shallowClone(state.education)
    const workExperiences = shallowClone(state.workExperiences)

    switch (action.type) {
        case 'LANGUAGE_TEST_ADD': {
            const existingTests = languageTests.map(test => test.testId)
            const testToAdd = newLanguageTestPreference.find(testId =>
                existingTests.indexOf(testId) === -1
            )
            if (testToAdd) {
                languageTests.push({
                    testId: testToAdd,
                    scores: defaultLanguageTestResults[testToAdd]
                })
            }
            return {
                ...state,
                languageTests
            }
        }

        case 'LANGUAGE_TEST_REMOVE': {
            return {
                ...state,
                languageTests: languageTests.splice(action.payload.index, 1)
            }
        }

        case 'LANGUAGE_TEST_CHANGE': {
            languageTests[action.payload.index] = {
                testId: action.payload.test,
                scores: defaultLanguageTestResults[action.payload.test]
            }
            return {
                ...state,
                languageTests
            }
        }

        case 'Language_Test_Score_Change': {
            const test = clone(languageTests[action.payload.index])
            test.scores[action.payload.item] = action.payload.score
            languageTests[action.payload.index] = test
            return {
                ...state,
                languageTests
            }
        }

        case 'EDUCATION_ADD': {
            education.push({
                qualityId: 'education',
                stage: 'bachelor',
                region: 'world',
                duration: duration(4, 'year'),
                graduationDate: { year: 2000 },
            })
            return {
                ...state,
                education
            }
        }

        case 'EDUCATION_REMOVE': {
            education.splice(action.payload.index, 1)
            return {
                ...state,
                education
            }
        }

        case 'EDUCATION_STAGE_CHANGE': {
            const newEducation = clone(education)
            newEducation[action.payload.index].stage = action.payload.stage
            return {
                ...state,
                education: newEducation
            }
        }

        case 'EDUCATION_REGION_CHANGE': {
            const newEducation = clone(education)
            newEducation[action.payload.index].region = action.payload.region
            return {
                ...state,
                education: newEducation
            }
        }

        case 'EDUCATION_DURATION_CHANGE': {
            const newEducation = clone(education)
            newEducation[action.payload.index].duration = action.payload.duration
            return {
                ...state,
                education: newEducation
            }
        }

        case 'EDUCATION_CHANGE_GRADUATION_DATE': {
            const newEducation = clone(education)
            newEducation[action.payload.index].graduationDate = {
                year: action.payload.graduateYear
            }
            return {
                ...state,
                education: newEducation
            }
        }

        case 'BIRTH_YEAR_CHANGE': {
            const newBirth = clone(state.birth)
            newBirth.date.year = action.payload.year
            return {
                ...state,
                birth: newBirth
            }
        }

        case 'WORK_ADD': {
            workExperiences.push({
                qualityId: 'work_experience',
                region: 'world',
                duration: duration(1, 'year')
            })
            return {
                ...state,
                workExperiences
            }
        }

        case 'WORK_REMOVE': {
            workExperiences.splice(action.payload.index, 1)
            return {
                ...state,
                workExperiences
            }
        }

        case 'WORK_DURATION_CHANGE': {
            const newWorkExperiences = clone(workExperiences)
            newWorkExperiences[action.payload.index].duration =
                action.payload.duration
            return {
                ...state,
                workExperiences: newWorkExperiences
            }
        }

        case 'WORK_REGION_CHANGE': {
            const newWorkExperiences = clone(workExperiences)
            newWorkExperiences[action.payload.index].region =
                action.payload.region
            return {
                ...state,
                workExperiences: newWorkExperiences
            }
        }

        case 'SPOUSE_EXISTENCE_CHANGE': {
            if (action.payload.hasSpouse) {
                return {
                    ...state,
                    spouse: getInitialPerson(DEFAULT_AGE)
                }
            }
            else {
                return {
                    ...state,
                    spouse: null
                }
            }
        }

        default: {
            return state
        }
    }
}

export default userReducer
