import * as React from 'react'

import {
    EducationPrereq
} from '../../../../data/common'

const EducationBox = (props: {prereq: EducationPrereq}) => {
    const prereq = props.prereq
    return (
        <span>
            {
                prereq.regionId
                ? `You were educated in ${prereq.regionId} on ${prereq.stage} level.`
                : `You were educated anywhere on ${prereq.stage} level.`
            }
            {
                prereq.certification
                ? ` And you have ${prereq.certification} certification.`
                : ''
            }
        </span>
    )
}

export default EducationBox