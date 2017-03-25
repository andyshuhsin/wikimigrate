import Status from './Status'
import Transition from './Transition'
import URLDatum from './auxillary/URLDatum'
import {MultiLangStringSet} from "./auxillary/MultiLang"

export type RegionId =
    "canada"
    | "australia"
    | "canada-pacific-provinces"

export interface Region {
    id: RegionId
    name: MultiLangStringSet
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
}

export default Region
