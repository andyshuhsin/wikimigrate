import { getInitialStatus, Person } from '../../src/definitions/Person'
import {
    LanguagePrereq, LanguagePrereqScoreSet,
    zeroLanguagePrereqScores,
} from '../../src/definitions/Prerequisites/LanguagePrereq'
import { satisfyBijectivePrerequisiteCombination } from '../../src/calculators/prerequisiteOperations'
import { evaluate, Spec } from './evaluator'
import { Prerequisite } from '../../src/definitions/Prerequisites'

const person: Person = {
    birth: {
        date: {
            year: 1980,
        },
    },
    status: getInitialStatus('canada'),
    languageTests: [
        {
            testId: 'clb',
            language: 'en',
            scores: {
                listening: 0,
                speaking: 0,
                reading: 0,
                writing: 0,
            },
        },
        {
            testId: 'clb',
            language: 'fr',
            scores: {
                listening: 7,
                speaking: 7,
                reading: 7,
                writing: 7,
            },
        },
    ],
}

const prerequisitesSingle = [
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                ...zeroLanguagePrereqScores,
                listening: ['>=', 3],
            },
        },
    } as LanguagePrereq,
]

const prerequisitesDual = [
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                ...zeroLanguagePrereqScores,
                listening: ['>=', 9],
            },
        },
    } as LanguagePrereq,
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                ...zeroLanguagePrereqScores,
                listening: ['>=', 3],
            },
        },
    } as LanguagePrereq,
]

const specs: Spec<[Person, Prerequisite[]], Boolean>[] = [
    [
        'Bijective: single',
        [
            person,
            prerequisitesSingle,
        ],
        true,
    ],
    [
        'Bijective: dual',
        [
            person,
            prerequisitesDual,
        ],
        false,
    ],
]

evaluate(specs, satisfyBijectivePrerequisiteCombination)
