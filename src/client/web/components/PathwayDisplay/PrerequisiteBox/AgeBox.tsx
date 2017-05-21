import * as React from 'react'
import AgePrereq from '../../../../../definitions/Prerequisites/AgePrereq'
import { LangId } from '../../../../../definitions/auxiliary/MultiLang'
import { arithmeticComparisonOperatorProfiles } from '../../../../../definitions/auxiliary/Operator'
import { text } from '../../../../utils/text'
import { durationUnitProfiles } from '../../../../../definitions/auxiliary/Duration'

const AgeBox = (props: { prereq: AgePrereq, lang: LangId }) => {
    const operator = props.prereq.value[0]
    const age = props.prereq.value[1]
    const unit = text(durationUnitProfiles[age.unit].name.age)
    if (props.lang === 'zh_hans') {
        return <div>
            年龄{age.value}{unit}{text(arithmeticComparisonOperatorProfiles[operator].description.post)}
        </div>
    }
    else {
        return <div>
            Aged {' '}
            {age.value} {' '}
            {unit} {' '}
            {text(arithmeticComparisonOperatorProfiles[operator].description.post)}
        </div>
    }
}

export default AgeBox
