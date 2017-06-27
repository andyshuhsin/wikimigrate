import { ScoreCondition } from '../../../definitions/ScoreSystem'
import { languageTestItemValues } from '../../../definitions/auxiliary/LanguageTest'
import { allOf } from '../../../definitions/auxiliary/Combination'
import { LanguagePrereq, zeroLanguagePrereqScores } from '../../../definitions/Prerequisites/LanguagePrereq'
import { UnionPrereq } from '../../../definitions/Prerequisites/UnionPrereq'

type MarriedScore = number
type SingleScore = number

type ClbScore = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
const clbScores: ClbScore[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

type LanguageTable = {
    [clbScore in ClbScore]?: [MarriedScore, SingleScore]
}


const scoreTableFirstLanguage: LanguageTable = {
    4: [6, 6],
    5: [6, 6],
    6: [8, 9],
    7: [16, 17],
    8: [22, 23],
    9: [29, 31],
    10: [32, 34],
    11: [32, 34],
    12: [32, 34],
}

const scoreTableSecondLanguage: LanguageTable = {
    5: [1, 1],
    6: [1, 1],
    7: [3, 3],
    8: [3, 3],
    9: [6, 6],
    10: [6, 6],
    11: [6, 6],
    12: [6, 6],
}

function getConditionsForFirstLanguage(tableFirst: LanguageTable): ScoreCondition[] {

    function makeSingularScoreConditions(
        clbScore: number,
        crsScore: number,
        isMarried: boolean,
    ): ScoreCondition[] {
        return languageTestItemValues.map(itemKey => ({
            score: crsScore,
            batch: itemKey + '-singular',
            prerequisites: allOf([
                {
                    prereqId: 'language_test',
                    result: {
                        testId: 'clb',
                        scores: {
                            ...zeroLanguagePrereqScores,
                            [itemKey]: ['>=', clbScore],
                        },
                    },
                } as LanguagePrereq,
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
            ]),
        } as ScoreCondition))
    }

    const result: ScoreCondition[] = []
    for (const firstScore of clbScores) {
        const scores = tableFirst[firstScore]
        if (scores) {
            result.push(...makeSingularScoreConditions(+firstScore, scores[0], true))
            result.push(...makeSingularScoreConditions(+firstScore, scores[1], false))
        }
    }

    return result
}



function getConditionsForBothLanguages(
    tableFirst: LanguageTable,
    tableSecond: LanguageTable,
): ScoreCondition[] {

    function makeDualScoresConditions(
        clbScore1: number,
        clbScore2: number,
        crsScore: number,
        isMarried: boolean,
    ): ScoreCondition[] {
        return languageTestItemValues.map(itemKey => ({
            score: crsScore,
            batch: itemKey + '-dual',
            prerequisites: allOf([
                allOf([
                    {
                        prereqId: 'language_test',
                        result: {
                            testId: 'clb',
                            scores: {
                                ...zeroLanguagePrereqScores,
                                [itemKey]: ['>=', clbScore1],
                            },
                        },
                    } as LanguagePrereq,
                    {
                        prereqId: 'language_test',
                        result: {
                            testId: 'clb',
                            scores: {
                                ...zeroLanguagePrereqScores,
                                [itemKey]: ['>=', clbScore2],
                            },
                        },
                    } as LanguagePrereq,
                ], {surjective: true}),
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
            ]),
        }))
    }

    const result: ScoreCondition[] = []

    for (const firstScore of clbScores) {
        const scores = tableFirst[firstScore]
        if (scores) {
            for (const secondScore of clbScores) {
                const scores2 = tableSecond[secondScore]
                if (scores2) {
                    result.push(...makeDualScoresConditions(+firstScore, +secondScore, scores2[0], true))
                    result.push(...makeDualScoresConditions(+firstScore, +secondScore, scores2[1], false))
                }
            }
        }
    }
    return result
}

export const singularLanguageScore = getConditionsForFirstLanguage(scoreTableFirstLanguage)
export const dualLanguagesScore = getConditionsForBothLanguages(scoreTableFirstLanguage, scoreTableSecondLanguage)
