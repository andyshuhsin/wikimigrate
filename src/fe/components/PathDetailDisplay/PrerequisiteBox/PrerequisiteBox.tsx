import * as React from 'react'

import Prerequisite from "../../../../definitions/Prerequisites/index";

import LanguageBenchmarkBox from './LanguageBenchmarkBox'
import WorkExperienceBox from './WorkExperienceBox'
import EducationBox from './EducationBox'
import FundBox from './FundBox'
import RightBox from './RightBox'
import OfferBox from './OfferBox'
import CertificationBox from './CertificationBox'
import AgeBox from './AgeBox'

interface Props {
    prereq: Prerequisite
}

class PrerequisiteBox extends React.PureComponent<Props, {}> {
    render() {
        const prereq = this.props.prereq
        switch (prereq.prereqId) {
            case "language_test": {
                return <LanguageBenchmarkBox prereq={prereq}/>
            }
            case "work_experience": {
                return <WorkExperienceBox prereq={prereq} />
            }
            case "education": {
                return  <EducationBox prereq={prereq} />
            }
            case "fund": {
                return <FundBox prereq={prereq} />
            }
            case "right": {
                return <RightBox prereq={prereq} />
            }
            case "offer": {
                return <OfferBox prereq={prereq} />
            }
            case "certification": {
                return <CertificationBox prereq={prereq} />
            }
            case "age": {
                return <AgeBox prereq={prereq} />
            }
            default: {
                console.warn("Unknown prereq:", JSON.stringify(prereq))
                return <noscript />
            }
        }
    }
}

export default PrerequisiteBox
