import Status from "../Qualities/Status"
import Transition from '../Transition'
import URLDatum from '../auxillary/URLDatum'
import {MultiLangStringSet} from "./MultiLang"

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
}

export default Region
