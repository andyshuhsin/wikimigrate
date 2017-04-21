import { Duration } from '../auxillary/Duration'
import BasePrereq from './BasePrereq'
import {ArithmeticComparisonOperator, Interval} from "../auxillary/Operator"

interface AgePrereq extends BasePrereq {
    prereqId: "age"
    value: Interval<Duration>
}

export default AgePrereq
