import * as React from 'react'

import {
    JobClassification
} from '../../../../definitions'

const JobTypeBox = (props: {jobGroup: JobClassification}) => {
    return (
        <span>
            {props.jobGroup.description["en"]}
        </span>
    )
}

export default JobTypeBox
