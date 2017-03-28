import * as React from 'react'
import text from '../../../utils/text'
import {JobGroup} from "../../../../definitions/auxillary/JobClassification"

const JobTypeBox = (props: {jobGroup: JobGroup}) => {
    return (
        <span>
            {text(props.jobGroup.description)}
        </span>
    )
}

export default JobTypeBox
