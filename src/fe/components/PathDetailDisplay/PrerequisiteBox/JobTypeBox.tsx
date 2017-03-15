import * as React from 'react'

import {
    JobType
} from '../../../../data/common'

const JobTypeBox = (props: {jobType: JobType}) => {
    return (
        <span>
            {props.jobType.description["en"]}
        </span>
    )
}

export default JobTypeBox