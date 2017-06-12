import BasePrereq from './BasePrereq'
import { RegionId } from '../auxiliary/Region'

export interface RightPrereq extends BasePrereq {
    prereqId: 'right'
    regionId: RegionId
    rightId: string
}

export default RightPrereq
