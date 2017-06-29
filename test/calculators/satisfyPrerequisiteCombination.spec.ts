import { satisfyPrerequisiteCombination } from '../../src/calculators/prerequisiteOperations'
import { getInitialStatus, Person } from '../../src/definitions/Person'
import { allOf, Combination, oneOf } from '../../src/definitions/auxiliary/Combination'
import AgePrereq from '../../src/definitions/Prerequisites/AgePrereq'
import { duration } from '../../src/definitions/auxiliary/Duration'
import { evaluate, Spec } from './evaluator'
import { Prerequisite } from '../../src/definitions/Prerequisites'

const simpleCanadian: Person = {
    birth: {
        date: {
            year: 1980,
        },
    },
    status: getInitialStatus('canada'),
}

const specs: Spec<[Person, Prerequisite | Combination<Prerequisite>], Boolean>[] = [

    [
        "Single age prerequisite - positive",
        [
            simpleCanadian,
            {
                prereqId: 'age',
                value: ["<", duration(100, "year")],
            } as AgePrereq,
        ],
        true
    ],

    [
        "Single age test - negative",
        [
            simpleCanadian,
            {
                prereqId: 'age',
                value: [">", duration(100, "year")],
            } as AgePrereq,
        ],
        false
    ],

    [
        "Combination prerequisite - positive",
        [
            simpleCanadian,
            allOf([
                {
                    prereqId: 'age',
                    value: ["<", duration(100, "year")],
                } as AgePrereq,
                {
                    prereqId: 'age',
                    value: [">", duration(5, "year")],
                } as AgePrereq,
            ]),
        ],
        true
    ],

    [
        "Combination test - negative",
        [
            simpleCanadian,
            oneOf([
                {
                    prereqId: 'age',
                    value: [">", duration(100, "year")],
                } as AgePrereq,
                {
                    prereqId: 'age',
                    value: ["<", duration(5, "year")],
                } as AgePrereq,
            ]),
        ],
        false
    ],
]

evaluate(specs, satisfyPrerequisiteCombination)
