import * as React from 'react'
import text from "../../../utils/text"

import data from '../../../../data'
import {
    BenchmarkRequirementItemized,
    BenchmarkRequirementSimple,
    LanguagePrereq,
    LanguageTestItem
} from "../../../../definitions/Prerequisites/LanguagePrereq"

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
            {((prereq.requirements as BenchmarkRequirementSimple).score)
                ? <span>
                    <strong>
                        {(prereq.requirements as BenchmarkRequirementSimple).score}
                    </strong>
                  </span>
                : langRequirementKeyOrder.map(
                      (testItemKey: LanguageTestItem) => (
                          <span
                              key={testItemKey}
                              style={{marginRight: "0.8em"}}
                          >
                              {text(data.common.languageBenchmarkItemNames[testItemKey])}
                              :&nbsp;
                              <strong>
                                  {(prereq.requirements as BenchmarkRequirementItemized)[testItemKey]}
                              </strong>
                          </span>
                      )
                  )
            }
        </div>
    )
}

export default LanguageBenchmarkBox
