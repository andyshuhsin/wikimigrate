import * as React from 'react'
import {
    LanguageTestItem, languageTestItemValues,
    LanguageTestResult,
} from '../../../../definitions/auxiliary/LanguageTest'
import languageTestProfiles from '../../../../data/common/languageTestProfiles'
import { IconButton } from './IconButton'

const dropdownSelectStyle: React.CSSProperties = {
    border: '1px solid black'
}

function getScoreOptions(format: [number, number, number]): string[] {
    const results = []
    for (let value = format[0]; value <= format[1]; value += format[2]) {
        if (format[2] < 1.0) {
            results.push(value.toFixed(1))
        }
        else {
            results.push(value.toString())
        }
    }
    return results
}


export const LanguageSpecifierBody = (props: {
    test: LanguageTestResult,
    index: number,
    onTestAdd(test: string): void
    onTestChange(index: number, newTest: string): void
    onScoreChange(index: number, item: LanguageTestItem, newScore: number): void
    onRemove(index: number): void
}) => {
    const profile = languageTestProfiles.find(test => test.id === props.test.testId)
    if (!profile) {
        console.warn("Unknown test id", props.test.testId)
        return null
    }
    return (
        <div style={{
            position: 'relative',
            padding: '0.5em',
            borderBottom: '1px black dashed',
            margin: '0.5em 0',
        }}>
            <IconButton
                icon='–'
                onClick={() => props.onRemove(props.index)}
                additionalStyle={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}
            />

            <select
                value={profile.id}
                style={dropdownSelectStyle}
                onChange={event => {
                    props.onTestChange(props.index, event.target.value)
                }}
            >
                {languageTestProfiles.map(profile =>
                    <option
                        key={profile.id}
                        value={profile.id}
                    >
                        {profile.abbreviation}
                    </option>
                )}
            </select>

            <table>
                <thead>
                <tr>
                    {languageTestItemValues.map(item => (
                        <th key={item}>
                            {item}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {languageTestItemValues.map(item => (
                        <td key={item}>
                            <select
                                value={props.test.scores[item].toString()}
                                style={dropdownSelectStyle}
                                onChange={event => {
                                    props.onScoreChange(
                                        props.index,
                                        item,
                                        Number(event.target.value)
                                    )
                                }}
                            >
                                {getScoreOptions(profile.itemScoreFormat).map(score => (
                                    <option key={score}>
                                        {score}
                                    </option>
                                ))}
                            </select>
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    )
}


