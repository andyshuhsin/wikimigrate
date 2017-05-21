import BasePrereq from './BasePrereq'
import { Combination } from '../auxiliary/Combination'
import { Prerequisite } from './index'

export interface SpousePrereq extends BasePrereq {
    prereqId: 'spouse'
    spousePrerequisites: Combination<Prerequisite>
}

export default SpousePrereq
