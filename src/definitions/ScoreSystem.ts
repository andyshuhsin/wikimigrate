import {Combination} from "./auxillary/Combination"
import {Prerequisite} from "./Prerequisites/index"
import {MultiLangStringSet} from "./auxillary/MultiLang"
import URLDatum from "./auxillary/URLDatum"
export type ScoreSystemId = "crs"

export interface ScoreCondition {
    score: number
    prerequisites: Combination<Prerequisite>
}

export interface ScoreSystem {
    scoreSystemId: ScoreSystemId
    name: MultiLangStringSet
    conditionGroups: {
        [key: string]: {
            maxScore: number
            conditions: ScoreCondition[]
        }
    }
    reference: URLDatum
}
