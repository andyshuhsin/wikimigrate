import BasePrereq from './BasePrereq'
import {RegionId} from "../auxiliary/Region"

export interface NominationPrereq extends BasePrereq {
    prereqId: "nomination"
    type: "provincial"
    region: RegionId
}

export default NominationPrereq
