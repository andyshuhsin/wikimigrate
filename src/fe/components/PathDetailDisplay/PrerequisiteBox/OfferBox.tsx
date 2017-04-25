import * as React from 'react'
import {OfferPrereq} from "../../../../definitions/Prerequisites/OfferPrereq"
import {getCurrentLang, text} from "../../../utils/text"
import {LangId} from "../../../../definitions/auxillary/MultiLang"

const OfferBox = (props: {prereq: OfferPrereq, lang: LangId}) => {
    if (props.lang === "zh_hans") {
        return (
            <div>
                您有来自
                {text(props.prereq.employer.region)}
                的offer
            </div>
        )
    }
    else {
        return (
            <div>
                You have an offer from
            </div>
        )
    }
}

export default OfferBox
