import * as React from 'react'
import text from '../../../utils/text'
import { Specifier, SpecifierId, SpecifierChoice } from '../../../data'
import { SpecifierOptionClickFn } from './SpecifierPanel'
import design from '../../design'
import sys from '../../sys'
import { languageTestChangeAction, SpecifierListOperator } from '../../../actions/SpecifierActions'
import { Person } from '../../../../definitions/Person'
import languageBenchmarkItemNames from '../../../../data/common/languageTestItemNames'
import {
    LanguageTestId, LanguageTestItem, languageTestItemValues,
    LanguageTestResult,
} from '../../../../definitions/auxiliary/LanguageTest'
import languageTestProfiles from '../../../../data/common/languageTestProfiles'

const styles = {
    titleStyle: {
        fontSize: '1em',
        margin: '0',
        background: design.colors.greyLight,
        padding: '0.2em 1em',
    } as React.CSSProperties,

    specifierBodyContainerStyle: {
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        padding: sys.viewport.width < design.dimensions.narrowWidth
            ? '0.6em 1.0em'
            : '1em 2em',
        userSelect: 'none',
    } as React.CSSProperties,

    optionNormalStyle: {
        display: 'inline-block',
        marginRight: '1em',
        fontSize: '1em',
        fontWeight: 'bolder',
        padding: '0.2em 0.4em',
        borderWidth: '3px',
        borderRadius: '3px',
        borderStyle: 'solid',
        borderColor: design.colors.greyLight,
        cursor: 'pointer',
    } as React.CSSProperties,

    optionHighlightStyle: {
        color: design.colors.brand,
        borderColor: design.colors.brand,
    } as React.CSSProperties,

    buttonStyle: {
        display: 'inline-block',
        width: '1.2em',
        height: '1.2em',
        borderRadius: '3px',

        backgroundColor: design.colors.greyLight,
        lineHeight: '1.2em',
        fontSize: '1.5em',
        textAlign: 'center',
        cursor: 'pointer',
    } as React.CSSProperties,

    valueStyle: {
        display: 'inline-block',
        margin: '0 0.6em',
        minWidth: '1.2em',

        fontSize: '1.5em',
        color: design.colors.brand,
        fontWeight: 'bolder',
        textAlign: 'center',
        verticalAlign: 'bottom',
    } as React.CSSProperties,

    dropdownSelect: {
        border: '1px solid black'
    } as React.CSSProperties
}

interface MultipleChoiceOptionProps {
    shouldHighlight: boolean
    option: SpecifierChoice
    onAction: () => any
}

const MultipleChoiceOption = (props: MultipleChoiceOptionProps) => {
    return <span
        style={ props.shouldHighlight
            ? Object.assign({}, styles.optionNormalStyle, styles.optionHighlightStyle)
            : styles.optionNormalStyle
        }
        onClick={props.onAction}
    >
                {text(props.option.label)}
            </span>
}

interface ValueChooserProps {
    value: number
    onLeftClick(value: number): void
    onRightClick(value: number): void
    min?: number
    max?: number
}

const IconButton = (props: {
    icon: string,
    onClick: () => void
}) => (
    <span
        style={styles.buttonStyle}
        onClick={props.onClick}
    >
        {props.icon}
    </span>
)


const ValueChooser = (props: ValueChooserProps) => (
    <div>
        <IconButton
            icon='–'
            onClick={() => {
                if (typeof props.min === 'undefined' || props.value - 1 >= props.min) {
                    props.onLeftClick(props.value - 1)
                }
            }}
        />
        <span style={styles.valueStyle}>
            {props.value}
        </span>
        <IconButton
            icon="+"
            onClick={() => {
                if (typeof props.max === 'undefined' || props.value - 1 >= props.max) {
                    props.onRightClick(props.value + 1)
                }
            }}
        />
    </div>
)

const SpecifierTitle = (props: { title: string }) => (
    <h1 style={styles.titleStyle}>
        {props.title}
    </h1>
)

function getScoreOptions(format: [number, number, number]): number[] {
    const results = []
    for (let value = format[0]; value <= format[1]; value += format[2]) {
        results.push(value)
    }
    return results
}

const LanguageSpecifierBody = (props: {
    test: LanguageTestResult,
    index: number,
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
            <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
            }}>
                <IconButton
                    icon='–'
                    onClick={() => props.onRemove(props.index)}
                />
            </div>

            <select
                value={profile.id}
                style={styles.dropdownSelect}
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
                                    style={styles.dropdownSelect}
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

interface SpecifierContentProps {
    specifier: Specifier
    onAction: (
        specifierId: SpecifierId,
        value: string | number,
        index?: number,
        operator?: SpecifierListOperator
    ) => any
    languageTestSelect(index: number, test: LanguageTestId): void
    languageScoreSelect(index: number, item: LanguageTestItem, score: number): void
    person: Person
}

const SpecifierBody = (props: SpecifierContentProps) => {
    const {
        specifier,
        onAction,
        person,
        languageTestSelect,
        languageScoreSelect,
    } = props

    let content

    switch (specifier.type) {
        case 'list': {
            let existingItems: JSX.Element[] = []
            switch(specifier.id) {
                case 'language': {
                    existingItems = person.languageTests.map((test, index) =>
                        <LanguageSpecifierBody
                            key={test.testId + index}
                            test={test}
                            onTestChange={languageTestSelect}
                            onScoreChange={languageScoreSelect}
                            onRemove={index => {
                                onAction(specifier.id, 0, index, 'REMOVE')
                            }}
                            index={index}
                        />
                    )
                }
            }

            content = (
                <div>
                    {existingItems}
                    <IconButton
                        icon="+"
                        onClick={() => {
                            onAction(specifier.id, 0, 0, 'NEW')
                        }}
                    />
                </div>
            )
            break
        }
        case 'multiple-choice': {
            content = (
                specifier.options.map((option: SpecifierChoice) =>
                    <MultipleChoiceOption
                        option={option}
                        shouldHighlight={true}
                        onAction={() => onAction(specifier.id, option.id)}
                        key={option.id}
                    />,
                )
            )
            break
        }
        case 'integer': {
            let value: number
            value = specifier.defaultValue
            content = (
                <ValueChooser
                    value={value}
                    onLeftClick={value => onAction(specifier.id, value)}
                    onRightClick={value => onAction(specifier.id, value)}
                    min={specifier.min}
                    max={specifier.max}
                />
            )
            break
        }
        default: {
            console.warn('Unknown specifier type:', (specifier as Specifier).type)
            content = <noscript />
        }
    }

    return (
        <div style={styles.specifierBodyContainerStyle}>
            {content}
        </div>
    )

}

interface SingleSpecifierPanelProps {
    specifier: Specifier,
    specifierOptionClick: SpecifierOptionClickFn
    languageTestSelect(index: number, test: LanguageTestId): void
    languageScoreSelect(index: number, item: LanguageTestItem, score: number): void
    person: Person
}

export class SingleSpecifierPanel extends React.Component<SingleSpecifierPanelProps, {}> {
    render() {
        const {
            specifier,
            specifierOptionClick,
            languageTestSelect,
            languageScoreSelect,
        } = this.props

        return (
            <div>
                <SpecifierTitle title={text(specifier.title)}/>
                <SpecifierBody
                    specifier={specifier}
                    person={this.props.person}
                    onAction={specifierOptionClick}
                    languageTestSelect={languageTestSelect}
                    languageScoreSelect={languageScoreSelect}
                />
            </div>
        )
    }

}
