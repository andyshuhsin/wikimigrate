import BasePrereq from './BasePrereq'
import Money from '../auxillary/Money'
import { Duration } from '../auxillary/Duration'

export interface BusinessPrereq extends BasePrereq {
    prereqId: "business"
    schemes: [
        {
            condition: {
                turnover: Money
                duration: Duration
            }
        }
    ]
}

export default BusinessPrereq
