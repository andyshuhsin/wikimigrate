import * as React from 'react'

import {
    WorkExperiencePrereq
} from '../../../../definitions'

import CombinationBox from '../CombinationBox'

const WorkExperieneceBox = (props: {prereq: WorkExperiencePrereq}) => {
    const prereq = props.prereq
    // TODO: Fix type cast at prereq.jobTypes as any
    return (
        <div>
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
            <CombinationBox combo={prereq.jobNature as any} />
        </div>
    )
}

export default WorkExperieneceBox
