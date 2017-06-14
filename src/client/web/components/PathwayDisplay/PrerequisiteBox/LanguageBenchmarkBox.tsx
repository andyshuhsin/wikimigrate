import * as React from 'react'
import text from '../../../../utils/text'

import data from '../../../../../data'

import { LanguagePrereq } from '../../../../../definitions/Prerequisites/LanguagePrereq'

import { LanguageTestItem } from '../../../../../definitions/auxiliary/LanguageTest'

const testItems: LanguageTestItem[] = [
    'listening',
    'speaking',
    'reading',
    'writing',
]

const tableHeadStyle: React.CSSProperties = {
    padding: 0,
    fontWeight: 100,
}

const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
    margin: '0.5em 0',
}

const cellStyle: React.CSSProperties = {
    padding: '0.2em',
    paddingLeft: 0,
}

const LanguageTestItemRow = (props: { testItemKey: LanguageTestItem, score: number }) => (
    <tr
        style={{
            marginRight: '0.8em',
            marginBottom: '2em',
        }}
    >
        <td style={{
            ...cellStyle,
        }}>
            {text(data.common.languageBenchmarkItemNames[props.testItemKey])}
        </td>
        <td style={{
            ...cellStyle,
            textAlign: 'center',
        }}>
            {props.score}
        </td>
    </tr>
)

function LanguageBenchmarkBox(props: { prereq: LanguagePrereq }) {
    const prereq = props.prereq
    const test = data.common.languageTestProfiles
                     .find(test => test.id === prereq.result.testId)
    return (
        <table style={tableStyle}>
            {test &&
                 <thead><tr><th style={tableHeadStyle}>
                     <a href={test.reference.url} target="_blank">
                         {text(test.title)}
                     </a>
                 </th></tr></thead>
            }
            <tbody style={{display: 'table'}}>
                {testItems.map(testItemKey =>
                    <LanguageTestItemRow
                        testItemKey={testItemKey}
                        score={prereq.result.scores[testItemKey][1]}
                        key={testItemKey}
                    />,
                )}
            </tbody>
        </table>
    )
}

export default LanguageBenchmarkBox
