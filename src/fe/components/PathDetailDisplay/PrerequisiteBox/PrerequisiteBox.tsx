import * as React from 'react'

import {
    Transition,
    Prerequisite,
    Combination,
} from '../../../../data/common'

import LanguageBenchmarkBox from './LanguageBenchmarkBox'
import WorkExperienceBox from './WorkExperienceBox'
import EducationBox from './EducationBox'
import FundBox from './FundBox'
import RightBox from './RightBox'
import OfferBox from './OfferBox'

interface Props {
    prereq: Prerequisite
}

class PrerequisiteBox extends React.PureComponent<Props, {}> {
    render() {
        const prereq = this.props.prereq
        if (prereq.property === "language_test") {
            return <LanguageBenchmarkBox prereq={prereq}/>
        } else if (prereq.property === "work_experience") {
            return <WorkExperienceBox prereq={prereq} />
        } else if (prereq.property === "education") {
            return  <EducationBox prereq={prereq} />
        } else if (prereq.property === "fund") {
            return <FundBox prereq={prereq} />
        } else if (prereq.property === "right") {
            return <RightBox prereq={prereq} />
        } else if (prereq.property === "offer") {
            return <OfferBox prereq={prereq} />
        }
        else {
            console.warn("Unknown prereq:", JSON.stringify(prereq))
            return <div>{JSON.stringify(prereq)}</div>
        }
    }
}

export default PrerequisiteBox
