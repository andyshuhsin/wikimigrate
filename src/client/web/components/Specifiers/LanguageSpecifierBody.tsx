import * as React from 'react'
import {
    LanguageTestId,
    LanguageTestItem, languageTestItemValues,
    LanguageTestResult,
} from '../../../../definitions/auxiliary/LanguageTest'
import languageTestProfiles from '../../../../data/common/languageTestProfiles'
import { IconButton } from './IconButton'
import { specifierSharedStyles } from './specifierSharedStyles'
import { LanguageSpecifierCallbacks } from './SpecifierPanel'

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

interface LanguageSpecifierBodyProps extends LanguageSpecifierCallbacks {
    test: LanguageTestResult,
    index: number,
}

export const LanguageSpecifierBody = (props: LanguageSpecifierBodyProps) => {
    const profile = languageTestProfiles.find(test => test.id === props.test.testId)
    if (!profile) {
        console.warn("Unknown test id", props.test.testId)
        return null
    }
    return (
        <div style={specifierSharedStyles.containerStyles}>
            <IconButton
                icon='–'
                onClick={() => props.languageTestRemove(props.index)}
                additionalStyle={specifierSharedStyles.deleteButtonStyle}
            />

            <select
                value={profile.id}
                style={dropdownSelectStyle}
                onChange={event => {
                    props.languageTestSelect(props.index, event.target.value as LanguageTestId)
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
                                    props.languageScoreSelect(
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


