import { Duration } from '../auxillary/Duration'
import BasePrereq from './BasePrereq'
import {ArithmeticComparisonOperator} from "../auxillary/Operator"

interface AgePrereq extends BasePrereq {
    prereqId: "age"
    value: Duration
    operator: ArithmeticComparisonOperator
}

export default AgePrereq
