import * as React from 'react'
import text from '../../utils/text'
import {Filter, FilterOption, FilterState} from "../../data"
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

    optionContainerStyle: {
        padding: sys.viewport.width < design.dimensions.narrowWidth
                 ? "0.6em 1.0em"
                 : "1em 2em",
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
    } as React.CSSProperties,

    optionHighlightStyle: {
        color: design.colors.brand,
        borderColor: design.colors.brand,
    } as React.CSSProperties
}

class SingleFilterPanel extends React.Component<SingleFilterPanelProps, {}> {
    render() {
        const {
            filter,
            filterState,
            filterOptionClick,
        } = this.props

        return (
            <div>
                <h1 style={styles.titleStyle}>
                    {text(filter.title)}
                </h1>
                <div style={styles.optionContainerStyle}>
                    {filter.options.map((option: FilterOption) => {
                        const shouldHighlight = filterState[filter.id] === option.id
                        return (
                            <span
                                style={
                                    shouldHighlight
                                    ? Object.assign({}, styles.optionNormalStyle, styles.optionHighlightStyle)
                                    : styles.optionNormalStyle
                                }
                                onClick={() => filterOptionClick(filter.id, option.id)}
                                key={option.id}
                            >
                                {text(option.label)}
                            </span>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }

}

export default SingleFilterPanel
