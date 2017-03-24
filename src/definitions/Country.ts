import Status from './Status'
import Transition from './Transition'
import URLDatum from './auxillary/URLDatum'

export type CountryId =
    "canada"
    | "australia"
    | "canada-pacific-provinces"

export interface Country {
    id: CountryId
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
}

export default Country
