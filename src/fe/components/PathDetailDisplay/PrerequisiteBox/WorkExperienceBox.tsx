import * as React from 'react'

import CombinationBox from '../CombinationBox'
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq"
import inflect from "../../../utils/inflect"

const WorkExperienceBox = (props: {prereq: WorkExperiencePrereq}) => {
    const prereq = props.prereq
    // TODO: Fix type cast at prereq.jobTypes as any
    return (
        <div>
            Work experience:
            <div style={{marginBottom: "0.5em"}}>
            {
                prereq.withinLast
                ? `Within the last ${prereq.withinLast.value} ${inflect(prereq.withinLast.unit, {number: prereq.withinLast.value})}, `
                : ""
            }
            {
                prereq.duration
                ? `you have worked ${prereq.duration[1].value} ${inflect(prereq.duration[1].unit, {number: prereq.duration[1].value})} in:`
                : ""
            }
            </div>
            <CombinationBox combo={prereq.jobNature as any} level={1} />
        </div>
    )
}

export default WorkExperienceBox
