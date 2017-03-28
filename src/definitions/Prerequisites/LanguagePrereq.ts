import BasePrereq from "./BasePrereq";
import {LanguageTestId, LanguageTestResult, LanguageTestScore} from "../auxillary/LanguageTest"


export interface LanguagePrereq extends BasePrereq {
    prereqId: "language_test"
    result: LanguageTestResult
    // TODO: Add time limits
}


export function languagePrereq(benchmark: LanguageTestId,
                                  score: LanguageTestScore
): LanguagePrereq {
    return {
        prereqId: "language_test",
        result: {
            benchmark,
            score
        }
    }
}

export default LanguagePrereq
