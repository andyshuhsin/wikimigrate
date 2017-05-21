import BasePrereq from './BasePrereq'
import Money from '../auxiliary/Money'
import { Duration } from '../auxiliary/Duration'

export interface BusinessPrereq extends BasePrereq {
    prereqId: 'business'
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
