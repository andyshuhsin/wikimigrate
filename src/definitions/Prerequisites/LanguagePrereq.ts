import BasePrereq from './BasePrereq'
import {
    LanguageTestId,
    LanguageTestItem,
    languageTestItemValues,
    LanguageTestScoreSet
} from '../auxiliary/LanguageTest'
import { Interval } from '../auxiliary/Operator'
import { LangId } from '../auxiliary/MultiLang'


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
    language?: LangId
}

export interface LanguagePrereq extends BasePrereq {
    prereqId: 'language_test'
    result: LanguagePrereqResult

    /* A hack, to handle complex dual-language scoring from Canada.
       0 means only the first language in Person's languageTest can satisfy,
       1 means only the second, etc. */
    targetLanguageCategory?: number

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
