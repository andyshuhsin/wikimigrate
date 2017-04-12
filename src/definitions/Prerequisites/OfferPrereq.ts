import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxillary/MultiLang'

export interface OfferPrereq extends BasePrereq {
    prereqId: "offer"
    employer: {
        regionId: string | undefined
        status?: "approved"
    }
    fulltime?: boolean
    seasonal?: boolean
    description?: MultiLangStringSet
}

export default OfferPrereq
