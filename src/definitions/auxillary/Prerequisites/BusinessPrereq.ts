import BasePrereq from './BasePrereq'
import Money from '../Money'
import { Duration } from '../Duration'

export interface BusinessPrereq extends BasePrereq {
    property: "business"
    schemes: [
        {
            condition: {
                turnover?: Money
                duration: Duration
            }
        }
    ]
}

export default BusinessPrereq
