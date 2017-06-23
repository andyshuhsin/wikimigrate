import BasePrereq from './BasePrereq'
import { RegionId } from '../auxiliary/Region'

export type RightId = 'alien' | 'citizen' | 'permanent' | 'work'

export interface RightPrereq extends BasePrereq {
    prereqId: 'right'
    regionId: RegionId
    rightId: RightId
}

export default RightPrereq
