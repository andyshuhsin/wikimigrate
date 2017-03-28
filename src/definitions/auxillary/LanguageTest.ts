import {MultiLangStringSet} from "./MultiLang"

export type LanguageTestId = "clb" | "nclc" | "ielts" | "toefl" | "oet" | "pte-academic" | "cae"

export type LanguageTestProfile = {
    id: LanguageTestId
    title: MultiLangStringSet
}

export type LanguageTestScoreSingle = {
    score: number | string
}

export type LanguageTestItem = "listening" | "speaking" | "reading" | "writing"

export type LanguageTestScoreItemized = {
    [key in LanguageTestItem]?: number
}

export type LanguageTestScore =
    LanguageTestScoreSingle | LanguageTestScoreItemized

export interface LanguageTestResult {
    benchmark: LanguageTestId
    score: LanguageTestScore
}

export default LanguageTestResult
