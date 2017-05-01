import * as React from 'react'
import {EducationPrereq} from "../../../../definitions/Prerequisites/EducationPrereq"
import {LangId} from "../../../../definitions/auxillary/MultiLang"

const EducationBox = (props: {prereq: EducationPrereq, lang: LangId}) => {
    const prereq = props.prereq
    if (props.lang === "zh_hans") {
        return (
            <span>
            {
                prereq.region
                    ? `您在${prereq.region}接受${prereq.stage && prereq.stage[1]}教育`
                    : `您在任何地区接受${prereq.stage && prereq.stage[1]}教育`
            }
            {
                prereq.certification
                    ? `并拥有${prereq.certification}认证`
                    : ``
            }
            </span>
        )

    }
    else {
        return (
            <span>
            {
                prereq.region
                    ? `You were educated in ${prereq.region} on ${prereq.stage && prereq.stage[1]} level.`
                    : `You were educated anywhere on ${prereq.stage && prereq.stage[1]} level.`
            }
            {
                prereq.certification
                    ? ` And you have ${prereq.certification} certification.`
                    : ``
            }
            </span>
        )
    }
}

export default EducationBox
