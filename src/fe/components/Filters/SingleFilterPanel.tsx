import * as React from 'react'
import text from '../../utils/text'
import {Filter, FilterId, FilterOption, FilterState} from "../../data"
import {FilterOptionClickFn} from "./FilterDetailedOptionPanel"
import design from "../../design"
import sys from "../../sys"

interface SingleFilterPanelProps {
    filter: Filter,
    filterState: FilterState
    filterOptionClick: FilterOptionClickFn
}

const styles= {
    titleStyle: {
        fontSize: "1em",
        margin: "0",
        background: design.colors.greyLight,
        padding: "0.2em 1em"
    } as React.CSSProperties,

    filterBodyContainerStyle: {
        whiteSpace: "nowrap",
        overflowX: "scroll",
        padding: sys.viewport.width < design.dimensions.narrowWidth
                 ? "0.6em 1.0em"
                 : "1em 2em",
        userSelect: "none",
    } as React.CSSProperties,

    optionNormalStyle: {
        display: "inline-block",
        marginRight: "1em",
        fontSize: "1em",
        fontWeight: "bolder",
        padding: "0.2em 0.4em",
        borderWidth: "3px",
        borderRadius: "3px",
        borderStyle: "solid",
        borderColor: design.colors.greyLight,
        cursor: "pointer",
    } as React.CSSProperties,

    optionHighlightStyle: {
        color: design.colors.brand,
        borderColor: design.colors.brand,
    } as React.CSSProperties,

    valueAdjustButtonStyle: {
        display: "inline-block",
        width: "1.2em",
        height: "1.2em",
        borderRadius: "3px",

        backgroundColor: design.colors.greyLight,
        lineHeight: "1.2em",
        fontSize: "1.5em",
        textAlign: "center",
        cursor: "pointer",
    } as React.CSSProperties,

    valueStyle: {
        fontSize: "1.5em",
        margin: "0 0.4em",
        color: design.colors.brand,
        fontWeight: "bolder",
        verticalAlign: "top",
    } as React.CSSProperties
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
    onLeftClick(): void
    onRightClick(): void
}

const ValueChooser = (props: ValueChooserProps) => (
    <div>
        <span
            style={styles.valueAdjustButtonStyle}
            onClick={props.onLeftClick}
        >
            &ndash;
        </span>
        <span style={styles.valueStyle}>
            {props.value}
        </span>
        <span
            style={styles.valueAdjustButtonStyle}
            onClick={props.onRightClick}
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
        case "multiple-choice": {
            content = (
                filter.options.map((option: FilterOption) =>
                    <MultipleChoiceOption
                        option={option}
                        shouldHighlight={filterState[filter.id] === option.id}
                        onClick={() => filterOptionClick(filter.id, option.id)}
                        key={option.id}
                    />
                )
            )
            break
        }
        case "real": {
            let value: number
            if (filterState[filter.id]) {
                value = Number(filterState[filter.id])
            }
            else {
                value = filter.defaultValue
            }
            content = (
                <ValueChooser
                    value= {value}
                    onLeftClick={() => filterOptionClick(filter.id, value - 1)}
                    onRightClick={() => filterOptionClick(filter.id, value + 1)}
                />
            )
            break
        }
        default: {
            console.warn("Unknown filter type:", (filter as Filter).filterType)
            content = <noscript />
        }
    }

    return (
        <div style={styles.filterBodyContainerStyle}>
            {content}
        </div>
    )

}

const FilterTitle = (props: {title: string}) => (
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
                <FilterTitle title={text(filter.title)} />
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
