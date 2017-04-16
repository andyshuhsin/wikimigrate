import BasePrereq from "./BasePrereq";
import {LanguageTestId, LanguageTestResult, LanguageTestScores} from "../auxillary/LanguageTest"

export interface LanguagePrereq extends BasePrereq {
    prereqId: "language_test"
    result: LanguageTestResult
    resultSecond?: LanguageTestResult  // e.g. English + French for Canada
    // TODO: Add time limits
}

export function languagePrereq(
    testId: LanguageTestId,
    scores: LanguageTestScores,
    testIdSecond?: LanguageTestId,
    scoresSecond?: LanguageTestScores
): LanguagePrereq {
    if (testIdSecond && scoresSecond) {
        return {
            prereqId: "language_test",
            result: {
                testId,
                scores,
            },
            resultSecond: {
                testId: testIdSecond,
                scores: scoresSecond,
            }
        }
    }
    else {
        return {
            prereqId: "language_test",
            result: {
                testId,
                scores,
            },
        }
    }
}

export default LanguagePrereq
