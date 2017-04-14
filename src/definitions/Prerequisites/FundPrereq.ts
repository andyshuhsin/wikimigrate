import BasePrereq from './BasePrereq'
import Money, {FundSourceGroup} from "../auxillary/Money"

export interface FundPrereq extends BasePrereq {
    prereqId: "fund"
    type: "possess" | "investor" | "investee" | "donate"
    schemes: [
        {
            fund: Money
            condition?: {
                familyMember?: number
                source?: FundSourceGroup
            }
        }
    ]
}

export default FundPrereq
