import BasePrereq from './BasePrereq'

export interface OfferPrereq extends BasePrereq {
    property: "offer"
    employer: {
        regionId: string | undefined
        status?: "approved"
    }
}

export default OfferPrereq
