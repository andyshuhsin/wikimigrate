import { evaluate, Spec } from './evaluator'
import crs from '../../src/data/canada/crs'
import { getInitialStatus, Person } from '../../src/definitions/Person'

const personA: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 30,
        },
    },
    status: getInitialStatus(),
    languageTests: [
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

// const spec: Spec<> = [
//
// ]
//
// evaluate()
