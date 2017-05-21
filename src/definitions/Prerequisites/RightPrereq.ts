import BasePrereq from './BasePrereq'

export interface RightPrereq extends BasePrereq {
    prereqId: 'right'
    regionId: string
    rightId: string
}

export default RightPrereq
