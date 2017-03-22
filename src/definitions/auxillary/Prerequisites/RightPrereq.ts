import BasePrereq from './BasePrereq'

export interface RightPrereq extends BasePrereq {
    property: "right"
    regionId: string
    rightId: string
}

export default RightPrereq
