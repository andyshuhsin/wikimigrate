import * as React from 'react'
import text from "../../../utils/text"

import {
    LanguagePrereq,
} from '../../../../definitions'

import data from '../../../../data'

const langRequirementScoreKey: string = "score"

const langRequirementKeyOrder: string[] = [
        "listening",
        "speaking",
        "reading",
        "writing",
]

const LanguageBenchmarkBox = (props: {prereq: LanguagePrereq}) => {
    const prereq = props.prereq
    const test = data.common.languageBenchmarkProfiles
                    .filter(test => test.id === prereq.benchmark)[0]
    return (
        <div>
            {text(test.title)} {" "}
            {(prereq.requirements[langRequirementScoreKey])
                ? <span>
                    <strong>
                        {prereq.requirements[langRequirementScoreKey]}
                    </strong>
                  </span>
                : langRequirementKeyOrder.map(
                      (testItemKey: string) => (
                          <span
                              key={testItemKey}
                              style={{marginRight: "0.8em"}}
                          >
                              {text(data.common.languageBenchmarkItemNames[testItemKey])}
                              :&nbsp;
                              <strong>
                                  {prereq.requirements[testItemKey]}
                              </strong>
                          </span>
                      )
                  )
            }
        </div>
    )
}

export default LanguageBenchmarkBox
