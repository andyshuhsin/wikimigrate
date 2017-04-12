import {MultiLangStringSet} from "./MultiLang"

export type LanguageTestId = "clb" | "nclc" | "ielts" | "toefl" | "oet" | "pte-academic" | "cae"

export type LanguageTestProfile = {
    id: LanguageTestId
    title: MultiLangStringSet
}

export type LanguageTestScoreSingle = {
    overall: number | string
}

export type LanguageTestItem = "listening" | "speaking" | "reading" | "writing"
export const LanguageTestItemValues: LanguageTestItem[] = [
    "listening", "speaking", "reading", "writing"
]

export type LanguageTestScoreItemized = {
    [key in LanguageTestItem]: number
}

export type LanguageTestScores = LanguageTestScoreSingle | LanguageTestScoreItemized

export interface LanguageTestResult {
    testId: LanguageTestId
    scores: LanguageTestScores
}

export function isSingleScore(result: any): boolean {
    return !!(result.scores && result.scores["overall"])
}

export default LanguageTestResult
