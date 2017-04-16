import BasePrereq from './BasePrereq'

export type UnionType = "marriage" | "common-law-partnership"

export interface UnionPrereq extends BasePrereq {
    prereqId: "union"
    unionTypes: UnionType[]
    inUnion: boolean
}

export default UnionPrereq
