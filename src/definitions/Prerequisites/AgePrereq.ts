import { Duration } from '../auxiliary/Duration'
import BasePrereq from './BasePrereq'
import {ArithmeticComparisonOperator, Interval} from "../auxiliary/Operator"

interface AgePrereq extends BasePrereq {
    prereqId: "age"
    value: Interval<Duration>
}

export default AgePrereq
