import * as React from 'react'
import text from '../../../../utils/text'
import {JobClassification, JobGroup} from "../../../../../definitions/auxillary/JobClassification"
import data from "../../../../../data"

function getParentClass(jobGroup: JobGroup): JobClassification | null {
    for (const region of data.regions) {
        if (region.jobClassification) {
            const jobClass= region.jobClassification
            if (jobGroup.parentClassificationSystemId === jobClass.classificationSystemId) {
                return jobClass
            }
        }
    }
    return null
}

const jobClassStyle = {
    textDecoration: "none",
    fontWeight: "bolder",
} as React.CSSProperties

const JobGroupBox = (props: {jobGroup: JobGroup}) => {
    const jobGroup = props.jobGroup
    const parentClass = getParentClass(jobGroup)
    return (
        <div>
            <a style={jobClassStyle} href={jobGroup.reference && jobGroup.reference.url}>
                {parentClass && text(parentClass.titleShort)}
                {"-"}
                {jobGroup.specification}
            </a>
            {" "}
            {text(props.jobGroup.description)}
        </div>
    )
}

export default JobGroupBox
