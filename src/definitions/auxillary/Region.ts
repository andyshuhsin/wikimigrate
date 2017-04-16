import Status from "../Qualities/Status"
import Transition from '../Transition'
import URLDatum from '../auxillary/URLDatum'
import {MultiLangStringSet} from "./MultiLang"
import {JobClassification} from "./JobClassification"
import {FundSourceGroup} from "./Money"
import {ScoreSystem} from "../ScoreSystem"

export type RegionId =
    "world"
    | "canada"
    | "australia"
    | "canada_pacific_provinces"

export interface Region {
    id: RegionId
    name: MultiLangStringSet
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
    jobClassification?: JobClassification
    fundSourceGroupList?: FundSourceGroup[]
    scoreSystems?: ScoreSystem[]
}

export default Region
