import * as React from 'react'

import Prerequisite from "../../../../definitions/Prerequisites/index";

import LanguageBenchmarkBox from './LanguageBenchmarkBox'
import WorkExperienceBox from './WorkExperienceBox'
import EducationBox from './EducationBox'
import FundBox from './FundBox'
import RightBox from './RightBox'
import OfferBox from './OfferBox'
import CertificationBox from './CertificationBox'

interface Props {
    prereq: Prerequisite
}

class PrerequisiteBox extends React.PureComponent<Props, {}> {
    render() {
        const prereq = this.props.prereq
        if (prereq.prereqId === "language_test") {
            return <LanguageBenchmarkBox prereq={prereq}/>
        } else if (prereq.prereqId === "work_experience") {
            return <WorkExperienceBox prereq={prereq} />
        } else if (prereq.prereqId === "education") {
            return  <EducationBox prereq={prereq} />
        } else if (prereq.prereqId === "fund") {
            return <FundBox prereq={prereq} />
        } else if (prereq.prereqId === "right") {
            return <RightBox prereq={prereq} />
        } else if (prereq.prereqId === "offer") {
            return <OfferBox prereq={prereq} />
        } else if (prereq.prereqId === "certification") {
            return <CertificationBox prereq={prereq} />
        }
        else {
            console.warn("Unknown prereq:", JSON.stringify(prereq))
            return <div>{JSON.stringify(prereq)}</div>
        }
    }
}

export default PrerequisiteBox
