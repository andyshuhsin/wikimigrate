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
import BusinessBox from './BusinessBox'
import {LangId} from "../../../../definitions/auxillary/MultiLang"

interface Props {
    prereq: Prerequisite,
    lang: LangId,
}

class PrerequisiteBox extends React.PureComponent<Props, {}> {
    render() {
        const {
            prereq,
            lang,
        } = this.props
        switch (prereq.prereqId) {
            case "language_test": {
                return <LanguageBenchmarkBox prereq={prereq}/>
            }
            case "work_experience": {
                return <WorkExperienceBox prereq={prereq} lang={lang} />
            }
            case "education": {
                return  <EducationBox prereq={prereq} lang={lang} />
            }
            case "fund": {
                return <FundBox prereq={prereq} lang={lang} />
            }
            case "right": {
                return <RightBox prereq={prereq} />
            }
            case "offer": {
                return <OfferBox prereq={prereq} lang={lang} />
            }
            case "certification": {
                return <CertificationBox prereq={prereq} lang={lang} />
            }
            case "age": {
                return <AgeBox prereq={prereq} lang={lang} />
            }
            case "business": {
                return <BusinessBox prereq={prereq} />
            }
            default: {
                console.warn("Unknown prereq:", JSON.stringify(prereq))
                return <noscript />
            }
        }
    }
}

export default PrerequisiteBox
