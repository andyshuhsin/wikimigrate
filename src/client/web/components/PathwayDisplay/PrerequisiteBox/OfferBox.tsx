import * as React from 'react'
import { OfferPrereq } from '../../../../../definitions/Prerequisites/OfferPrereq'
import { text } from '../../../../utils/text'
import { LangId } from '../../../../../definitions/auxiliary/MultiLang'
import { data } from '../../../../../data'
import { Region } from '../../../../../definitions/auxiliary/Region'

const OfferBox = (props: { prereq: OfferPrereq, lang: LangId }) => {
    let region: Region | null
    const regionId = props.prereq.employer.region
    if (regionId) {
        region = data.getRegionById(regionId)
        if (!region) {
            console.warn('Cannot find region', regionId)
            return <noscript />
        }
    }
    else {
        return <noscript />
    }

    if (props.lang === 'zh_hans') {
        return (
            <div>
                您有来自
                {text(region.name)}
                的工作邀约（offer）
            </div>
        )
    }
    else {
        return (
            <div>
                You have an offer from {text(region.name)}
            </div>
        )
    }
}

export default OfferBox
