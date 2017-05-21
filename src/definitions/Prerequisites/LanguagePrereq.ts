import BasePrereq from './BasePrereq'
import {
    LanguageTestId,
    LanguageTestItem,
    languageTestItemValues,
    LanguageTestScoreSet
} from '../auxiliary/LanguageTest'
import { Interval } from '../auxiliary/Operator'


export const zeroLanguagePrereqScores: LanguagePrereqScoreSet = {
    listening: ['>=', 0],
    speaking: ['>=', 0],
    reading: ['>=', 0],
    writing: ['>=', 0],
}

export type LanguagePrereqScoreSet = {
    [key in LanguageTestItem]: Interval<number>
}

export type LanguagePrereqResult = {
    testId: LanguageTestId
    scores: LanguagePrereqScoreSet
}

export interface LanguagePrereq extends BasePrereq {
    prereqId: 'language_test'
    result: LanguagePrereqResult
    // TODO: Add time limits
}

function transformMinScores(scores: LanguageTestScoreSet): LanguagePrereqScoreSet {
    let result: any = {}
    for (const key of languageTestItemValues) {
        result[key] = ['>=', scores[key]]
    }
    return result
}

export function languagePrereqMinScore(
    testId: LanguageTestId,
    scores: LanguageTestScoreSet,
): LanguagePrereq {
    return {
        prereqId: 'language_test',
        result: {
            testId,
            scores: transformMinScores(scores),
        },
    }
}

export default LanguagePrereq
