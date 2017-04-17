import BasePrereq from './BasePrereq'
import {RegionId} from "../auxillary/Region"

export interface NominationPrereq extends BasePrereq {
    prereqId: "nomination"
    type: "provincial"
    region: RegionId
}

export default NominationPrereq
