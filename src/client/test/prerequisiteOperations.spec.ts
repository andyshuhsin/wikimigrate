import { satisfyBijectivePrerequisiteCombination } from '../utils/prerequisiteOperations'
import { LanguagePrereq, zeroLanguagePrereqScores } from '../../definitions/Prerequisites/LanguagePrereq'
import { Person } from '../../definitions/Person'

const person: Person = {
    'birth': {
        'date': {
            'year': 1982,
        },
    },
    'status': {
        'world': [
            'alien',
        ],
        'canada': [
            'alien',
        ],
        'australia': [
            'alien',
        ],
        'canada_atlantic_provinces': [
            'alien',
        ],
        new_zealand: [
            'alien',
        ],
    },
    'languageTests': [
        {
            'testId': 'clb',
            'language': 'en',
            'scores': {
                'listening': 0,
                'speaking': 0,
                'reading': 0,
                'writing': 0,
            },
        },
        {
            'testId': 'clb',
            'language': 'fr',
            'scores': {
                'listening': 7,
                'speaking': 7,
                'reading': 7,
                'writing': 7,
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

export function test() {
    console.info(satisfyBijectivePrerequisiteCombination(person, prerequisitesSingle))
    console.info(satisfyBijectivePrerequisiteCombination(person, prerequisitesDual))
}
