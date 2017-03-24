import BasePrereq from './BasePrereq'
import Money from '../Money'

export interface FundPrereq extends BasePrereq {
    property: "fund"
    type: "possess" | "invest" | "donate" | "venture"
    schemes: [
        {
            condition?: {
                familyMember?: number
            }
            fund: Money
        }
    ]
}

export default FundPrereq
