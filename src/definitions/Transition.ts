import { MultiLangStringSet } from './auxillary/MultiLang'
import { Combination } from './auxillary/Combination'
import Procedure from './auxillary/Procedure'
import Exception from './auxillary/Exception'
import URLDatum from './auxillary/URLDatum'

import {RegionId} from "./auxillary/Region"
import Status from "./Qualities/Status"
import Prerequisite from "./Prerequisites/index"
import {ScoreSystem} from "./ScoreSystem"

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
    prerequisiteList: Combination<Prerequisite>
    procedureList: Procedure[]
    scoreSystem?: ScoreSystem
    exceptionList?: Array<Exception>
    referenceList?:  URLDatum[]
}

export default Transition
