import * as React from 'react'

import CombinationBox from '../CombinationBox'
import { WorkExperiencePrereq } from '../../../../../definitions/Prerequisites/WorkExperiencePrereq'
import inflect from '../../../../utils/inflect'
import { text } from '../../../../utils/text'
import { units } from '../../../../../data/common/units'
import { LangId } from '../../../../../definitions/auxiliary/MultiLang'

const WorkExperienceBox = (props: { prereq: WorkExperiencePrereq, lang: LangId }) => {
    const prereq = props.prereq
    const texts = {
        withinLast: text({
            en: 'With in the last',
            zh_hans: '过去',
        }),
    }
    return (
        <div>
            <div style={{marginBottom: '0.5em'}}>
                {
                    prereq.withinLast &&
                    `${texts.withinLast}
                     ${prereq.withinLast.value}
                     ${inflect(text(units[prereq.withinLast.unit].name), {number: prereq.withinLast.value})}, `
                }
                {
                    prereq.duration
                        ? `You have worked ${prereq.duration[1].value} ${inflect(
                            text(prereq.duration[1].unit),
                            {number: prereq.duration[1].value})} in:`
                        : text({
                            en: 'You have worked in',
                            zh_hans: '你在以下职业有工作经验'
                        })
                }
            </div>
            <CombinationBox combo={prereq.jobNature as any} level={1} lang={props.lang}/>
        </div>
    )
}

export default WorkExperienceBox
