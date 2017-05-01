import * as React from 'react'
import {EducationPrereq} from "../../../../definitions/Prerequisites/EducationPrereq"
import {LangId} from "../../../../definitions/auxillary/MultiLang"
import data, {certifications} from "../../../../data/index"
import {text} from "../../../utils/text"
import {educationStageProfiles} from "../../../../definitions/Qualities/EducationExperience"
import {arithmeticComparisonOperatorProfiles} from "../../../../definitions/auxillary/Operator"

const EducationBox = (props: {prereq: EducationPrereq, lang: LangId}) => {
    const prereq = props.prereq
    const stage = prereq.stage
    const region = data.getRegionById(prereq.region)
    if (props.lang === "zh_hans") {
        let regionName: string
        if (region) {
            regionName = text(region.name)
        }
        else {
            regionName = "任何地区"
        }

        let educationStage: string
        let educationStageModifier: string
        if (stage) {
            educationStage = text(educationStageProfiles[stage[1]].name)
            educationStageModifier = text(arithmeticComparisonOperatorProfiles[stage[0]].description.post)
        }
        else {
            educationStage = "任何水平的教育"
            educationStageModifier = ""
        }

        let certificationModifier: JSX.Element | null
        if (prereq.certification) {
            const cert = certifications[prereq.certification]
            certificationModifier = <span>
                并拥有
                <a href={cert.reference && cert.reference.url} target="_blank">
                    {text(cert.title)}
                </a>
                认证
            </span>
        }
        else {
            certificationModifier = null
        }

        return (
            <span>
                您在{regionName}接受{educationStage}{educationStageModifier}教育
                {certificationModifier}
            </span>
        )

    }
    else {
        let regionName: string
        if (region) {
            regionName = text(region.name)
        }
        else {
            regionName = "any region"
        }

        let educationStage: string
        let educationStageModifier: string
        if (stage) {
            educationStage = text(educationStageProfiles[stage[1]].name)
            educationStageModifier = text(arithmeticComparisonOperatorProfiles[stage[0]].description.post)
        }
        else {
            educationStage = "any level"
            educationStageModifier = ""
        }

        let certificationModifier: JSX.Element | null
        if (prereq.certification) {
            const cert = certifications[prereq.certification]
            certificationModifier = <span>
                , and has
                {" "}
                <a href={cert.reference && cert.reference.url} target="_blank">
                    {text(cert.title)}
                </a>
                {" "}
                certification
            </span>
        }
        else {
            certificationModifier = null
        }

        return (
            <span>
                You were educated in {regionName} on {educationStage}{" "}{educationStageModifier} level
                {certificationModifier}
            </span>
        )
    }
}

export default EducationBox
