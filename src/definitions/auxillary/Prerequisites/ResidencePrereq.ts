import BasePrereq from './BasePrereq'
import Duration from '../Duration'
import { CountryId } from '../../Country'

export interface ResidencePrereq extends BasePrereq {
    property: "residence"
    regionId: CountryId | undefined

    duration: Duration,
    validPeriod?: Duration  // x months in recent y year et cetera
}

export default ResidencePrereq
