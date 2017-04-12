import * as React from 'react'

import CombinationBox from '../CombinationBox'
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq"

const WorkExperienceBox = (props: {prereq: WorkExperiencePrereq}) => {
    const prereq = props.prereq
    // TODO: Fix type cast at prereq.jobTypes as any
    return (
        <div>
            <div style={{marginBottom: "0.5em"}}>
            {
                prereq.withinLast
                ? `Within the last ${prereq.withinLast.value} ${prereq.withinLast.unit}, `
                : ""
            }
            {
                prereq.length
                ? `you have worked ${prereq.length.value} ${prereq.length.unit} in`
                : ""
            }
            :
            </div>
            <CombinationBox combo={prereq.jobNature as any} level={1} />
        </div>
    )
}

export default WorkExperienceBox
