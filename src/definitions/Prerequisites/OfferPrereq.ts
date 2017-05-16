import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxiliary/MultiLang'
import {RegionId} from "../auxiliary/Region"
import {JobGroup} from "../auxiliary/JobClassification"
import {Combination} from "../auxiliary/Combination"

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
