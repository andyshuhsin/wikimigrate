import { MultiLangStringSet } from './auxillary/MultiLang'
import { Condition } from './auxillary/Combination'
import Procedure from './auxillary/Procedure'
import Exception from './auxillary/Exception'
import URLDatum from './auxillary/URLDatum'

import {RegionId} from "./auxillary/Region"
import Status from "./Qualities/Status"
import Prerequisite from "./Prerequisites/index"

interface Transition {
    id: string
    name: MultiLangStringSet
    regionId: RegionId,
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
