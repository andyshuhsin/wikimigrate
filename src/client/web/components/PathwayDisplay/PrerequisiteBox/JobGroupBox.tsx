import * as React from 'react'
import text from '../../../../utils/text'
import { JobClassification, JobGroup } from '../../../../../definitions/auxiliary/JobClassification'
import data from '../../../../../data'

function getParentClass(jobGroup: JobGroup): JobClassification | null {
    for (const region of data.regions) {
        if (region.jobClassification) {
            const jobClass = region.jobClassification
            if (jobGroup.parentClassificationSystemId === jobClass.classificationSystemId) {
                return jobClass
            }
        }
    }
    return null
}

const JobGroupBox = (props: { jobGroup: JobGroup }) => {
    const jobGroup = props.jobGroup
    const parentClass = getParentClass(jobGroup)
    return (
        <a
            href={jobGroup.reference && jobGroup.reference.url}
            target="_blank"
            style={{fontWeight: 'bolder'}}
        >
            {parentClass && text(parentClass.titleShort)}
            {'-'}
            {jobGroup.specification}
            {' '}
            <span style={{fontWeight: 'lighter'}}>
                {text(props.jobGroup.description)}
            </span>
        </a>
    )
}

export default JobGroupBox
