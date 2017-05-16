import * as React from 'react'

import CombinationBox from '../CombinationBox'
import {WorkExperiencePrereq} from "../../../../../definitions/Prerequisites/WorkExperiencePrereq"
import inflect from "../../../../utils/inflect"
import {text} from "../../../../utils/text"
import {units} from "../../../../../data/common/units"
import {LangId} from "../../../../../definitions/auxillary/MultiLang"

const WorkExperienceBox = (props: {prereq: WorkExperiencePrereq, lang: LangId}) => {
    const prereq = props.prereq
    const texts = {
        workExperiences: text({
            en: "Work experience:",
            zh_hans: "工作经验：",
        }),
        withinLast: text({
            en: "With in the last",
            zh_hans: "过去",
        })
    }
    // TODO: Fix type cast at prereq.jobTypes as any
    return (
        <div>
            {texts.workExperiences}
            <div style={{marginBottom: "0.5em"}}>
            {
                prereq.withinLast &&
                `${texts.withinLast}
                 ${prereq.withinLast.value}
                 ${inflect(text(units[prereq.withinLast.unit].name), {number: prereq.withinLast.value})}, `
            }
            {
                prereq.duration
                ? `you have worked ${prereq.duration[1].value} ${inflect(text(prereq.duration[1].unit), {number: prereq.duration[1].value})} in:`
                : ""
            }
            </div>
            <CombinationBox combo={prereq.jobNature as any} level={1} lang={props.lang} />
        </div>
    )
}

export default WorkExperienceBox
