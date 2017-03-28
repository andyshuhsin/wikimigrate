import * as React from 'react'
import text from "../../../utils/text"

import data from '../../../../data'

import {LanguagePrereq} from "../../../../definitions/Prerequisites/LanguagePrereq"

import {
    LanguageTestItem,
    LanguageTestScoreItemized,
    LanguageTestScoreSingle
} from "../../../../definitions/auxillary/LanguageTest"

const langRequirementKeyOrder: string[] = [
        "listening",
        "speaking",
        "reading",
        "writing",
]

const LanguageBenchmarkBox = (props: {prereq: LanguagePrereq}) => {
    const prereq = props.prereq
    const test = data.common.languageTestProfiles
                    .filter(test => test.id === prereq.result.benchmark)[0]
    return (
        <div>
            {text(test.title)} {" "}
            {((prereq.result.score as LanguageTestScoreSingle).score)
                ? <span>
                    <strong>
                        {(prereq.result.score as LanguageTestScoreSingle).score}
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
                                  {(prereq.result.score as LanguageTestScoreItemized)[testItemKey]}
                              </strong>
                          </span>
                      )
                  )
            }
        </div>
    )
}

export default LanguageBenchmarkBox
