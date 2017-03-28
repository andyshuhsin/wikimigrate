import * as React from 'react'
import {EducationPrereq} from "../../../../definitions/Prerequisites/EducationPrereq"

const EducationBox = (props: {prereq: EducationPrereq}) => {
    const prereq = props.prereq
    return (
        <span>
            {
                prereq.education.regionId
                ? `You were educated in ${prereq.education.regionId} on ${prereq.education.stage} level.`
                : `You were educated anywhere on ${prereq.education.stage} level.`
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
