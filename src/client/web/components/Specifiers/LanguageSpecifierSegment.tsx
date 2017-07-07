import * as React from 'react'
import {
    LanguageTestId,
    languageTestItemValues,
    LanguageTestResult,
} from '../../../../definitions/auxiliary/LanguageTest'
import languageTestProfiles from '../../../../data/common/languageTestProfiles'
import { IconButton } from './IconButton'
import { specifierSharedStyles } from './specifierSharedStyles'
import { LanguageSpecifierCallbacks } from './SpecifierPanel'
import range from '../../../utils/range'

function appendDecimal(value: number, shouldAppend: boolean): string {
    return shouldAppend ? value.toFixed(1) : value.toString()
}

function getScoreOptions(format: [number, number, number]): string[] {
    return range(format[0], format[1], format[2])
        .map(value => appendDecimal(value, format[2] < 1.0))
}

interface LanguageSpecifierBodyProps extends LanguageSpecifierCallbacks {
    test: LanguageTestResult,
    index: number,
}

const LanguageSpecifierSegment = (props: LanguageSpecifierBodyProps) => {
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
                style={specifierSharedStyles.dropdownSelectStyle}
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
                                value={appendDecimal(
                                    props.test.scores[item],
                                    profile.itemScoreFormat[2] < 1.0
                                )}
                                onChange={event => {
                                    props.languageScoreSelect(
                                        props.index,
                                        item,
                                        Number(event.target.value)
                                    )
                                }}
                                style={specifierSharedStyles.dropdownSelectStyle}
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

export default LanguageSpecifierSegment
