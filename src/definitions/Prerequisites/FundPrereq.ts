import BasePrereq from './BasePrereq'
import Money, {FundSourceGroup} from "../auxillary/Money"

export interface FundPrereqCondition {
    familyMember: number
    source: FundSourceGroup
}

export interface FundPrereq extends BasePrereq {
    prereqId: "fund"
    type: "possess" | "investor" | "investee" | "donate"
    schemes: [
        {
            fund: Money | null
            condition?: Partial<FundPrereqCondition>
        }
    ]
}

export default FundPrereq
