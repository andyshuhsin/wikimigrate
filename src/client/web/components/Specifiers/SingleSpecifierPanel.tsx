import * as React from 'react'
import text from '../../../utils/text'
import { Specifier, SpecifierId, SpecifierChoice } from '../../../data'
import { SpecifierCallbacks, SpecifierOptionClickFn } from './SpecifierPanel'
import design from '../../design'
import sys from '../../sys'
import { Person } from '../../../../definitions/Person'
import { IconButton } from './IconButton'
import { LanguageSpecifierBody } from './LanguageSpecifierBody'

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

interface SingleSpecifierPanelProps extends SpecifierCallbacks {
    specifier: Specifier,
    specifierOptionClick: SpecifierOptionClickFn
    person: Person
}


export class SingleSpecifierPanel extends React.Component<SingleSpecifierPanelProps, {}> {
    render() {
        const {
            specifier,
            specifierOptionClick: onAction,
            languageTestSelect,
            languageTestRemove,
            languageScoreSelect,
            languageTestAdd,
            person,
        } = this.props

        if (!person.languageTests) {
            return null
        }

        let specifierBody: JSX.Element | JSX.Element[]

        switch (specifier.type) {
            case 'list': {
                let existingItems: JSX.Element[] = []
                let addButton: JSX.Element | null = null
                switch(specifier.id) {
                    case 'language': {
                        existingItems = person.languageTests.map((test, index) =>
                            <LanguageSpecifierBody
                                key={test.testId + index}
                                test={test}
                                onTestAdd={languageTestAdd}
                                onTestChange={languageTestSelect}
                                onScoreChange={languageScoreSelect}
                                onRemove={languageTestRemove}
                                index={index}
                            />
                        )

                        addButton = (
                            <IconButton
                                icon="+"
                                onClick={languageTestAdd}
                            />
                        )
                    }
                }

                specifierBody = (
                    <div>
                        {existingItems}
                        {addButton}
                    </div>
                )
                break
            }
            case 'multiple-choice': {
                specifierBody = (
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
                specifierBody = (
                    <ValueChooser
                        value={value}
                        onLeftClick={value => onAction(specifier.id, value.toString())}
                        onRightClick={value => onAction(specifier.id, value.toString())}
                        min={specifier.min}
                        max={specifier.max}
                    />
                )
                break
            }
            default: {
                console.warn('Unknown specifier type:', (specifier as Specifier).type)
                specifierBody = <noscript />
            }
        }

        return (
            <div>
                <h1 style={styles.titleStyle}>
                    {text(specifier.title)}
                </h1>

                <section style={styles.specifierBodyContainerStyle}>
                    {specifierBody}
                </section>
            </div>
        )
    }

}
