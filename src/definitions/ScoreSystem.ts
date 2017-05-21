import { Combination } from './auxiliary/Combination'
import { Prerequisite } from './Prerequisites/index'
import { MultiLangStringSet } from './auxiliary/MultiLang'
import URLDatum from './auxiliary/URLDatum'
export type ScoreSystemId = 'crs'

export interface ScoreHistoryEntry {
    lowestScore: number
    date: [number, number, number]
}

export type ScoreHistory = ScoreHistoryEntry[]

export interface ScoreCondition {
    score: number
    prerequisites: Combination<Prerequisite>
    // Only the highest score among applicable conditions
    // of the same batch would be added
    batch: string
}

export interface ScoreSystem {
    scoreSystemId: ScoreSystemId
    name: MultiLangStringSet
    initialScore: number
    conditionGroups: {
        [key: string]: {
            maxScore: number
            conditions: ScoreCondition[]
        }
    }
    history: ScoreHistory
    reference: URLDatum
}
