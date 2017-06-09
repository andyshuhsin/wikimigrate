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
    fontSize: '0.9em',
    padding: 0,
    fontWeight: 100,
}

const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
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
            <tbody style={{display: 'table'}}>
                {testItems.map(testItemKey =>
                    <LanguageTestItemRow
                        testItemKey={testItemKey}
                        score={prereq.result.scores[testItemKey][1]}
                        key={testItemKey}
                    />,
                )}
            </tbody>
            {test &&
                <tfoot><tr><td style={tableHeadStyle}>
                    ( <a href={test.reference.url} target="_blank">
                        {text(test.title)}
                    </a> )
                </td></tr></tfoot>
            }
        </table>
    )
}

export default LanguageBenchmarkBox
