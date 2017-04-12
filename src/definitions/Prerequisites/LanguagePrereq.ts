import BasePrereq from "./BasePrereq";
import {LanguageTestId, LanguageTestResult, LanguageTestScores} from "../auxillary/LanguageTest"

export interface LanguagePrereq extends BasePrereq {
    prereqId: "language_test"
    result: LanguageTestResult
    // TODO: Add time limits
}

export function languagePrereq(testId: LanguageTestId,
                               scores: LanguageTestScores
): LanguagePrereq {
    return {
        prereqId: "language_test",
        result: {
            testId,
            scores,
        }
    }
}

export default LanguagePrereq
