import BasePrereq from './BasePrereq'
import Duration from '../auxiliary/Duration'
import {RegionId} from "../auxiliary/Region"

export interface ResidencePrereq extends BasePrereq {
    prereqId: "residence"
    regionId: RegionId | undefined

    duration: Duration,
    validPeriod?: Duration  // x months in recent y year et cetera
}

export default ResidencePrereq
