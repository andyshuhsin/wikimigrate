import * as React from 'react'
import text from '../../../utils/text'
import { Filter, FilterId, FilterOption, FilterState } from '../../../data'
import { FilterOptionClickFn } from './FilterDetailedOptionPanel'
import design from '../../design'
import sys from '../../sys'

interface SingleFilterPanelProps {
    filter: Filter,
    filterState: FilterState
    filterOptionClick: FilterOptionClickFn
}

const styles = {
    titleStyle: {
        fontSize: '1em',
        margin: '0',
        background: design.colors.greyLight,
        padding: '0.2em 1em',
    } as React.CSSProperties,

    filterBodyContainerStyle: {
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

    valueAdjustButtonStyle: {
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
    option: FilterOption
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

const ValueChooser = (props: ValueChooserProps) => (
    <div>
        <span
            style={styles.valueAdjustButtonStyle}
            onClick={() => {
                if (typeof props.min === "undefined" || props.value - 1 >= props.min) {
                    props.onLeftClick(props.value - 1)
                }
            }}
        >
            &ndash;
        </span>
        <span style={styles.valueStyle}>
            {props.value}
        </span>
        <span
            style={styles.valueAdjustButtonStyle}
            onClick={() => {
                if (typeof props.max === "undefined" || props.value - 1 >= props.max) {
                    props.onRightClick(props.value + 1)
                }
            }}
        >
            &#43;
        </span>
    </div>
)

interface FilterContentProps {
    filter: Filter
    filterState: FilterState
    filterOptionClick: (filterId: FilterId, value: string | number) => any
}

const FilterBody = (props: FilterContentProps) => {
    const {
        filter,
        filterState,
        filterOptionClick,
    } = props

    let content

    switch (filter.filterType) {
        case 'multiple-choice': {
            content = (
                filter.options.map((option: FilterOption) =>
                    <MultipleChoiceOption
                        option={option}
                        shouldHighlight={filterState[filter.id] === option.id}
                        onClick={() => filterOptionClick(filter.id, option.id)}
                        key={option.id}
                    />,
                )
            )
            break
        }
        case 'real': {
            let value: number
            const valueInState = filterState[filter.id]
            if (valueInState === null) {
                value = filter.defaultValue
            }
            else {
                value = Number(valueInState)
            }
            content = (
                <ValueChooser
                    value={value}
                    onLeftClick={value => filterOptionClick(filter.id, value)}
                    onRightClick={value => filterOptionClick(filter.id, value)}
                    min={filter.min}
                    max={filter.max}
                />
            )
            break
        }
        default: {
            console.warn('Unknown filter type:', (filter as Filter).filterType)
            content = <noscript />
        }
    }

    return (
        <div style={styles.filterBodyContainerStyle}>
            {content}
        </div>
    )

}

const FilterTitle = (props: { title: string }) => (
    <h1 style={styles.titleStyle}>
        {props.title}
    </h1>
)

class SingleFilterPanel extends React.Component<SingleFilterPanelProps, {}> {
    render() {
        const {
            filter,
            filterState,
            filterOptionClick,
        } = this.props

        return (
            <div>
                <FilterTitle title={text(filter.title)}/>
                <FilterBody
                    filter={filter}
                    filterState={filterState}
                    filterOptionClick={filterOptionClick}
                />
            </div>
        )
    }

}

export default SingleFilterPanel
