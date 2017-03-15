import * as React from 'react'

import {
    LanguageBenchamrkPrereq,
    languageBenchmarkProfiles,
} from '../../../../data/common'

const LanguageBenchmarkBox = (props: {prereq: LanguageBenchamrkPrereq}) => {
    const prereq = props.prereq
    const test = languageBenchmarkProfiles.filter(test => test.id === prereq.benchmark)[0]
    return (
        <div>
            {test.title["en"]}
            {
                prereq.requirements.map(
                    (requirement) => {
                        if (requirement.value) {
                            return (
                                <strong style={{marginRight: "0.5em"}}>
                                    {requirement.value}
                                </strong>
                            )
                        } else {
                            const item = Object.keys(requirement)[0]
                            return (
                                <div key={item}>
                                    <strong key={item}>
                                        {item}: {requirement[item]}
                                    </strong>
                                </div>

                            )
                        }
                    }
                )
            }
        </div>
    )
}

export default LanguageBenchmarkBox