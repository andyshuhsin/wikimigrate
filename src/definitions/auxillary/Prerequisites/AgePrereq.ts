import { Duration } from '../Duration'
import BasePrereq from './BasePrereq'

interface AgePrereq extends BasePrereq {
    property: "age"
    value: Duration
    operator: "<" | "<=" | ">" | ">="
}

export default AgePrereq