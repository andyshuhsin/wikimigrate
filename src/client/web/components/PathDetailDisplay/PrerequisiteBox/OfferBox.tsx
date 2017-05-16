import * as React from 'react'
import {OfferPrereq} from "../../../../../definitions/Prerequisites/OfferPrereq"
import {text} from "../../../../utils/text"
import {LangId} from "../../../../../definitions/auxillary/MultiLang"
import {data} from "../../../../../data"

const OfferBox = (props: {prereq: OfferPrereq, lang: LangId}) => {
    if (props.lang === "zh_hans") {
        const regionId = props.prereq.employer.region
        if (regionId) {
            const region = data.getRegionById(regionId)
            if (!region) {
                console.warn("Cannot find region", regionId)
                return <noscript />
            }
            return (
                <div>
                    您有来自
                    {text(region.name)}
                    的工作邀约（offer）
                </div>
            )
        }
        else {
            return <noscript />
        }
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
