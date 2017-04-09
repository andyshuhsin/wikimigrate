import BasePrereq from './BasePrereq'
import Money from '../auxillary/Money'

export interface FundPrereq extends BasePrereq {
    prereqId: "fund"
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