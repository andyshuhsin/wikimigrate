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

const testNameStyle = {
    fontSize: "1em",
    margin: 0,
} as React.CSSProperties

const LanguageBenchmarkBox = (props: {prereq: LanguagePrereq}) => {
    const prereq = props.prereq
    const test = data.common.languageTestProfiles
                    .filter(test => test.id === prereq.result.testId)[0]
    return (
        <div>
            <h5 style={testNameStyle}>
                {text(test.title)} {" "}
            </h5>
            {((prereq.result.scores as LanguageTestScoreSingle).overall)
                ? <div>
                    Overall score: {(prereq.result.scores as LanguageTestScoreSingle).overall}
                  </div>
                : langRequirementKeyOrder.map(
                      (testItemKey: LanguageTestItem) => (
                          <span
                              key={testItemKey}
                              style={{marginRight: "0.8em"}}
                          >
                              {text(data.common.languageBenchmarkItemNames[testItemKey])}
                              :&nbsp;
                              <strong>
                                  {(prereq.result.scores as LanguageTestScoreItemized)[testItemKey]}
                              </strong>
                          </span>
                      )
                  )
            }
        </div>
    )
}

export default LanguageBenchmarkBox
