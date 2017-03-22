import * as React from 'react'

import {
    JobGroup
} from '../../../../definitions'

const JobTypeBox = (props: {jobGroup: JobGroup}) => {
    return (
        <span>
            {props.jobGroup.description["en"]}
        </span>
    )
}

export default JobTypeBox
