import BasePrereq from './BasePrereq'
import { Combination } from '../auxiliary/Combination'
import { Prerequisite } from './index'

interface SiblingPrereq extends BasePrereq {
    prereqId: 'sibling',
    siblingPrerequisites: Combination<Prerequisite>
}

export default SiblingPrereq
