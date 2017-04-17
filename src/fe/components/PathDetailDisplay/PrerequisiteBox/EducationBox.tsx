import * as React from 'react'
import {EducationPrereq} from "../../../../definitions/Prerequisites/EducationPrereq"

const EducationBox = (props: {prereq: EducationPrereq}) => {
    const prereq = props.prereq
    return (
        <span>
            {
                prereq.region
                ? `You were educated in ${prereq.region} on ${prereq.stage && prereq.stage[1]} level.`
                : `You were educated anywhere on ${prereq.stage && prereq.stage[1]} level.`
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
