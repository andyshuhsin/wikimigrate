import { MultiLangStringSet } from './auxillary/MultiLang'
import Status from './Status'
import { Condition } from './auxillary/Combination'
import Procedure from './auxillary/Procedure'
import Exception from './auxillary/Exception'
import URLDatum from './auxillary/URLDatum'

import { Prerequisite } from './auxillary/Prerequisites'

interface Transition {
    id: string
    name: MultiLangStringSet
    regionId: string,
    acquireBy: "application" | "invitation" | "automatic"
    from: Status | Status[] | null
    to: Status
    stage?: {
        description: MultiLangStringSet
        date?: Date
    }
    prerequisiteList: Condition<Prerequisite>
    procedureList: Procedure[]
    exceptionList?: Array<Exception>
    referenceList?:  URLDatum[]
}

export default Transition
