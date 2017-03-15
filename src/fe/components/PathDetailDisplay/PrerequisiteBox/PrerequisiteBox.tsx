import * as React from 'react'

import {
    Transition,
    Prerequisite,
    Combination,
} from '../../../../data/common'

import LanguageBenchmarkBox from './LanguageBenchmarkBox'

interface Props {
    prereq: Prerequisite
}

class PrerequisiteBox extends React.PureComponent<Props, {}> {
    render() {
        const prereq = this.props.prereq
        if (prereq.property === "language_test") {
            return <LanguageBenchmarkBox prereq={prereq}/>
        } else {
            console.warn("Unknown prereq:", JSON.stringify(prereq))
            return <div>{JSON.stringify(prereq)}</div>
        }
    }
}

export default PrerequisiteBox
