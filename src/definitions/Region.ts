import Status from './Status'
import Transition from './Transition'
import URLDatum from './auxillary/URLDatum'

export type RegionId =
    "canada"
    | "australia"
    | "canada-pacific-provinces"

export interface Region {
    id: RegionId
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
}

export default Region
