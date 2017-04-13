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

const LanguageTestItemBox = (props: {testItemKey: LanguageTestItem, score: number}) => (
    <div
        style={{
            display: "inline-block",
            marginRight: "0.8em",
        }}
    >
        <span style={{
            marginRight: "0.1em",
        }}>
            {text(data.common.languageBenchmarkItemNames[props.testItemKey])}
        </span>
        <span style={{
            fontWeight: "bolder",
        }}>
            {props.score}
        </span>
    </div>
)

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
                      (testItemKey: LanguageTestItem) =>
                      <LanguageTestItemBox
                          testItemKey={testItemKey}
                          score={(prereq.result.scores as LanguageTestScoreItemized)[testItemKey]}
                          key={testItemKey}
                      />
                  )
            }
        </div>
    )
}

export default LanguageBenchmarkBox
