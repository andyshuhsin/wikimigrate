import BasePrereq from "./BasePrereq";
import {
    LanguageTestId, LanguageTestItem, LanguageTestItemValues, LanguageTestResult, LanguageTestScoreItemized,
    LanguageTestScores,
    LanguageTestScoreSingle,
} from "../auxillary/LanguageTest"
import {ArithmeticComparisonOperator, Interval} from "../auxillary/Operator"

export type LanguagePrereqScoreSingle = {
    overall: [ArithmeticComparisonOperator, (number | string)]
}

export type LanguagePrereqScoreItemized = {
    [key in LanguageTestItem]: Interval<number>
}

export type LanguagePrereqScores = LanguagePrereqScoreSingle | LanguagePrereqScoreItemized

export type LanguagePrereqResult = {
    testId: LanguageTestId
    scores: LanguagePrereqScores
}

export interface LanguagePrereq extends BasePrereq {
    prereqId: "language_test"
    result: LanguagePrereqResult
    // TODO: Add time limits
}

function transformMinScores(scores: LanguageTestScores): LanguagePrereqScores {
    if ((scores as LanguageTestScoreSingle).overall) {
        return {
            overall: [">=", (scores as LanguageTestScoreSingle).overall]
        }
    }
    else {
        let result: any = {}
        scores = scores as LanguageTestScoreItemized
        for (const key of LanguageTestItemValues) {
            result[key] = [">=", scores[key]]
        }
        return result
    }
}

export function languagePrereqMinScore(
    testId: LanguageTestId,
    scores: LanguageTestScores,
): LanguagePrereq {
    return {
        prereqId: "language_test",
        result: {
            testId,
            scores: transformMinScores(scores),
        }
    }
}

export default LanguagePrereq
