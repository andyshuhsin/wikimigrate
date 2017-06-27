import { ScoreCondition } from '../../../definitions/ScoreSystem'
import { allOf } from '../../../definitions/auxiliary/Combination'
import { UnionPrereq } from '../../../definitions/Prerequisites/UnionPrereq'
import { duration } from '../../../definitions/auxiliary/Duration'
import AgePrereq from '../../../definitions/Prerequisites/AgePrereq'

type MarriedScore = number
type SingleScore = number

type AgeTable = {
    [age: number]: [MarriedScore, SingleScore]
}

const ageTable: AgeTable = {
    18: [90, 99],
    19: [95, 105],
    20: [100, 110],
    21: [100, 110],
    22: [100, 110],
    23: [100, 110],
    24: [100, 110],
    25: [100, 110],
    26: [100, 110],
    27: [100, 110],
    28: [100, 110],
    29: [100, 110],
    30: [95, 105],
    31: [90, 99],
    32: [85, 94],
    33: [80, 88],
    34: [75, 83],
    35: [70, 77],
    36: [65, 72],
    37: [60, 66],
    38: [55, 61],
    39: [50, 55],
    40: [45, 50],
    41: [35, 39],
    42: [25, 28],
    43: [15, 17],
    44: [5, 6],
}

function getConditionsFromAgeTable(table: AgeTable): ScoreCondition[] {

    function makeAgeCondition(
        score: number,
        age: number,
        isMarried: boolean,
    ): ScoreCondition {
        return {
            score: score,
            batch: 'age',
            prerequisites: allOf([
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
                {
                    prereqId: 'age',
                    value: ['>=', duration(age, 'year')],
                } as AgePrereq,
                {
                    prereqId: 'age',
                    value: ['<', duration(age + 1, 'year')],
                } as AgePrereq,
            ]),
        }
    }

    const result: ScoreCondition[] = []
    for (const ageKey in table) {
        const age: number = Number(ageKey)
        const marriedScore = table[ageKey][0]
        const singleScore = table[ageKey][1]
        result.push(makeAgeCondition(marriedScore, age, true))
        result.push(makeAgeCondition(singleScore, age, false))
    }
    return result
}

export const ageConditions = getConditionsFromAgeTable(ageTable)
