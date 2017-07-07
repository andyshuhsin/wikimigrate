import * as React from 'react'
import {
    LanguageTestId,
    LanguageTestResult,
    languageTestItemValues,
} from '../../../../definitions/auxiliary/LanguageTest'
import { LanguageSpecifierCallbacks } from './SpecifierPanel'
import languageTestProfiles from '../../../../data/common/languageTestProfiles'
import { specifierSharedStyles } from './specifierSharedStyles'
import IconButton from './IconButton'
import range from '../../../utils/range'
import DropdownGroup from './DropdownGroup'

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

            <DropdownGroup
                title=''
                value={profile.id}
                onChange={event => {
                    props.languageTestSelect(props.index, event.target.value as LanguageTestId)
                }}
                standAlone={true}
            >
                {languageTestProfiles.map(profile =>
                    <option
                        key={profile.id}
                        value={profile.id}
                    >
                        {profile.abbreviation}
                    </option>
                )}
            </DropdownGroup>

            {languageTestItemValues.map(item =>
                <DropdownGroup
                    key={item}
                    title={item}
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
                >
                    {getScoreOptions(profile.itemScoreFormat).map(score => (
                        <option key={score}>
                            {score}
                        </option>
                    ))}
                </DropdownGroup>
            )}
        </div>
    )
}

export default LanguageSpecifierSegment
