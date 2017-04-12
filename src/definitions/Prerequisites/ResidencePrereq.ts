import BasePrereq from './BasePrereq'
import Duration from '../auxillary/Duration'
import {RegionId} from "../auxillary/Region"

export interface ResidencePrereq extends BasePrereq {
    prereqId: "residence"
    regionId: RegionId | undefined

    duration: Duration,
    validPeriod?: Duration  // x months in recent y year et cetera
}

export default ResidencePrereq
