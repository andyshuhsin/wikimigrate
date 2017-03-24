import Status from './Status'
import Transition from './Transition'
import URLDatum from './auxillary/URLDatum'

interface Country {
    id: string
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
}

export default Country