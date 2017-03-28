import { Duration } from '../auxillary/Duration'
import BasePrereq from './BasePrereq'

interface AgePrereq extends BasePrereq {
    prereqId: "age"
    value: Duration
    operator: "<" | "<=" | ">" | ">="
}

export default AgePrereq
