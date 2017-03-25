import BasePrereq from './BasePrereq'
import Duration from '../Duration'
import { RegionId } from '../../Region'

export interface ResidencePrereq extends BasePrereq {
    property: "residence"
    regionId: RegionId | undefined

    duration: Duration,
    validPeriod?: Duration  // x months in recent y year et cetera
}

export default ResidencePrereq
