import { LangId, MultiLangStringSet } from './MultiLang'
import URLDatum from './URLDatum'

export type LanguageTestItem = 'listening' | 'speaking' | 'reading' | 'writing'
export const languageTestItemValues: LanguageTestItem[] = [
    'listening', 'speaking', 'reading', 'writing',
]

export type LanguageTestId =
    'clb'
    | 'celpip'
    | 'tef'
    | 'ielts'
    | 'toefl'
    | 'oet'
    | 'pte-academic'
    | 'cae'

type SourceScore = number
type TargetScore = number

export type EquivalencyTable = {
    [item in LanguageTestItem]: [SourceScore, TargetScore][]
}

export type LanguageTestProfile = {
    id: LanguageTestId
    title: MultiLangStringSet
    languages: LangId[]
    equivalency?: {
        [source in LanguageTestId]?: EquivalencyTable
    }
    reference: URLDatum
}

export const zeroLanguageScores: LanguageTestScoreSet = {
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0,
}

export type LanguageTestScoreSet = {
    [key in LanguageTestItem]: number
}

export interface LanguageTestResult {
    testId: LanguageTestId
    scores: LanguageTestScoreSet
    language?: LangId
}

export default LanguageTestResult
