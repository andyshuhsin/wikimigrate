import * as React from 'react'
import { RightPrereq } from '../../../../../definitions/Prerequisites/RightPrereq'
import { data } from '../../../../../data'
import { text } from '../../../../utils/text'

const RightBox = (props: { prereq: RightPrereq }) => {
    const region = data.getRegionById(props.prereq.regionId)
    return (
        <div>
            You have the right of {props.prereq.rightId}
            {region &&
             ` in ${text(region.name)}`
            }
        </div>
    )
}

export default RightBox
