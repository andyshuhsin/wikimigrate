import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxillary/MultiLang'
import {RegionId} from "../auxillary/Region"
import {JobGroup} from "../auxillary/JobClassification"
import {Combination} from "../auxillary/Combination"

export interface OfferPrereq extends BasePrereq {
    prereqId: "offer"
    employer: {
        region?: RegionId
        status?: "approved"
    }
    jobGroup?: JobGroup
    fulltime?: boolean
    seasonal?: boolean
    description?: MultiLangStringSet
}

export default OfferPrereq
