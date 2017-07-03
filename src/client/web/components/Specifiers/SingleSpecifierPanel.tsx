import * as React from 'react'
import text from '../../../utils/text'
import { Specifier, SpecifierId, SpecifierChoice } from '../../../data'
import { SpecifierOptionClickFn } from './SpecifierPanel'
import design from '../../design'
import sys from '../../sys'
import { SpecifierListOperator } from '../../../actions/SpecifierActions'
import { Person } from '../../../../definitions/Person'
import languageBenchmarkItemNames from '../../../../data/common/languageTestItemNames'
import { languageTestItemValues, LanguageTestResult } from '../../../../definitions/auxiliary/LanguageTest'

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
}

interface MultipleChoiceOptionProps {
    shouldHighlight: boolean
    option: SpecifierChoice
    onClick: () => any
}

const MultipleChoiceOption = (props: MultipleChoiceOptionProps) => {
    return <span
        style={ props.shouldHighlight
            ? Object.assign({}, styles.optionNormalStyle, styles.optionHighlightStyle)
            : styles.optionNormalStyle
        }
        onClick={props.onClick}
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

interface SpecifierContentProps {
    specifier: Specifier
    onClick: (
        specifierId: SpecifierId,
        value: string | number,
        index?: number,
        operator?: SpecifierListOperator
    ) => any
    person: Person
}

const LanguageBody = (props: {test: LanguageTestResult}) => (
    <div>
        {languageTestItemValues.map(item => (
            <span key={item}>
                {item}
            </span>
        ))}
    </div>
)

const SpecifierBody = (props: SpecifierContentProps) => {
    const {
        specifier,
        onClick,
        person,
    } = props

    let content

    switch (specifier.type) {
        case 'list': {
            let existingItems: JSX.Element[] = []
            switch(specifier.id) {
                case 'language': {
                    existingItems = person.languageTests.map((test, index) =>
                        <LanguageBody test={test} key={test.testId + index} />
                    )
                }
            }

            content = (
                <div>
                    {existingItems}
                    <IconButton
                        icon="+"
                        onClick={() => {
                            onClick(specifier.id, 0, 0, 'NEW')
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
                        onClick={() => onClick(specifier.id, option.id)}
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
                    onLeftClick={value => onClick(specifier.id, value)}
                    onRightClick={value => onClick(specifier.id, value)}
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
    person: Person
}

export class SingleSpecifierPanel extends React.Component<SingleSpecifierPanelProps, {}> {
    render() {
        const {
            specifier,
            specifierOptionClick,
        } = this.props

        return (
            <div>
                <SpecifierTitle title={text(specifier.title)}/>
                <SpecifierBody
                    specifier={specifier}
                    onClick={specifierOptionClick}
                    person={this.props.person}
                />
            </div>
        )
    }

}
