import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../MultiLang'

export interface OfferPrereq extends BasePrereq {
    property: "offer"
    employer: {
        regionId: string | undefined
        status?: "approved"
    }
    fulltime?: boolean
    seasonal?: boolean
    description?: MultiLangStringSet
}

export default OfferPrereq
