import BasePrereq from './BasePrereq'
import Money, { FundSourceGroup } from '../auxiliary/Money'

export interface FundPrereqCondition {
    familyMember: number
    source: FundSourceGroup
}

export interface FundPrereqWithMoney extends BasePrereq {
    prereqId: 'fund'
    type: 'possess' | 'investor' | 'investee' | 'donate'
    schemes: [
        {
            fund: Money | null
            condition?: Partial<FundPrereqCondition>
        }
    ]
}

export interface FundPrereqAdmission extends BasePrereq {
    prereqId: 'fund'
    type: 'admission'
    schemes: [
        {
            fund: null
            condition: {
                source: FundSourceGroup
            }
        }
    ]

}

export type FundPrereq = FundPrereqWithMoney | FundPrereqAdmission

export default FundPrereq
