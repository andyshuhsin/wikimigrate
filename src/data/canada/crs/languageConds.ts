import { ScoreCondition } from '../../../definitions/ScoreSystem'
import { languageTestItemValues } from '../../../definitions/auxiliary/LanguageTest'
import { allOf } from '../../../definitions/auxiliary/Combination'
import { LanguagePrereq, zeroLanguagePrereqScores } from '../../../definitions/Prerequisites/LanguagePrereq'
import { UnionPrereq } from '../../../definitions/Prerequisites/UnionPrereq'

type MarriedScore = number
type SingleScore = number


type LanguageTable = {
    [clbScore: number] : [MarriedScore, SingleScore]
}


const scoreTableFirstLanguage: LanguageTable = {
    4: [6, 6],
    5: [6, 6],
    6: [8, 9],
    7: [16, 17],
    8: [22, 23],
    9: [29, 31],
    10: [32, 34],
}

const scoreTableSecondLanguage: LanguageTable = {
    5: [1, 1],
    6: [1, 1],
    7: [3, 3],
    8: [3, 3],
    9: [6, 6],
    10: [6, 6],
}

const languageConditions: ScoreCondition[] = []

for (const isInUnion of [true, false]) {
    for (const item of languageTestItemValues) {

        // Primary language
        for (const examScore in scoreTableFirstLanguage) {
            const scoreIndex = isInUnion ? 0 : 1
            const crsScore = scoreTableFirstLanguage[examScore][scoreIndex]
            languageConditions.push({
                score: +crsScore,
                batch: `language-primary:${item}`,
                prerequisites: allOf([
                    {
                        prereqId: 'union',
                        inUnion: isInUnion,
                    } as UnionPrereq,
                    {
                        prereqId: 'language_test',
                        targetLanguageCategory: 0,
                        result: {
                            testId: 'clb',
                            scores: {
                                ...zeroLanguagePrereqScores,
                                [item]: ['>=', examScore],
                            }
                        }
                    } as LanguagePrereq
                ])
            })
        }

        // Secondary language
        for (const examScore in scoreTableSecondLanguage) {
            const scoreIndex = isInUnion ? 0 : 1
            const crsScore = scoreTableSecondLanguage[examScore][scoreIndex]
            languageConditions.push({
                score: +crsScore,
                batch: `language-secondary:${item}`,
                prerequisites: allOf([
                    {
                        prereqId: 'union',
                        inUnion: isInUnion,
                    } as UnionPrereq,
                    {
                        prereqId: 'language_test',
                        targetLanguageCategory: 1,
                        result: {
                            testId: 'clb',
                            scores: {
                                ...zeroLanguagePrereqScores,
                                [item]: ['>=', examScore],
                            }
                        }
                    } as LanguagePrereq
                ])
            })
        }
    }
}

export {
    languageConditions
}
