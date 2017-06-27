import { LangId, MultiLangStringSet } from './MultiLang'
import URLDatum from './URLDatum'

export type LanguageTestId = 'clb' | 'ielts' | 'toefl' | 'oet' | 'pte-academic' | 'cae'

export type LanguageTestProfile = {
    id: LanguageTestId
    title: MultiLangStringSet
    languages: LangId[]
    reference: URLDatum
}

export const zeroLanguageScores: LanguageTestScoreSet = {
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0,
}

export type LanguageTestItem = 'listening' | 'speaking' | 'reading' | 'writing'
export const languageTestItemValues: LanguageTestItem[] = [
    'listening', 'speaking', 'reading', 'writing',
]

export type LanguageTestScoreSet = {
    [key in LanguageTestItem]: number
}

export interface LanguageTestResult {
    testId: LanguageTestId
    scores: LanguageTestScoreSet
    language?: LangId
}

export default LanguageTestResult
