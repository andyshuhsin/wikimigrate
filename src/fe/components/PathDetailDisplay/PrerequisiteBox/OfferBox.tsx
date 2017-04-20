import * as React from 'react'
import {OfferPrereq} from "../../../../definitions/Prerequisites/OfferPrereq"

const OfferBox = (props: {prereq: OfferPrereq}) => {
    return (
        <div>
            You have an offer from {props.prereq.employer.region}
        </div>
    )
}

export default OfferBox
