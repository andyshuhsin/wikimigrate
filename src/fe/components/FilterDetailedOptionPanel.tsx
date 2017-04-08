import * as React from 'react'
import text from '../utils/text'
import {connect, Dispatch} from "react-redux"
import {VisaPlannerState} from "../reducers/index"
import {Filter, FilterId, FilterOption, filterSets, FilterState, OptionId} from "../data"
import {filterOptionClickAction} from "../actions"

type FilterOptionClickFn = (filterId: FilterId, optionId: OptionId) => void

interface OptionDisplayProps {
    shouldExpand: boolean
    filterState: FilterState
    filterOptionClick: FilterOptionClickFn
}

interface SingleFilterPanelProps {
    filter: Filter,
    filterState: FilterState,
    filterOptionClick: FilterOptionClickFn
}

const SingleFilterPanel = (props: SingleFilterPanelProps) => (
    <div style={{
        paddingLeft: "1em"
    }}>
        <h1 style={{fontSize: "1em"}}>
            {text(props.filter.title)}
        </h1>
        {
            props.filter.options.map(
                (option: FilterOption) => (
                    <span
                        style={{
                            marginRight: "0.5em",
                            fontSize: "1em",
                        }}
                        onClick={() => props.filterOptionClick(props.filter.id, option.id)}
                        key={option.id}
                    >
                        {text(option.label)}
                    </span>
                )
            )
        }
    </div>
)

class FilterDetailedOptionPanel extends React.PureComponent<OptionDisplayProps, {}> {

    render() {
        const style = {
            position: "absolute",
            left: 0,
            top: 0,
            padding: "1em 0",
            width: "100%",
            transition: "transform 1s",
            background: "#eee",
        }

        const styleExpanded = {
        }

        return (
            <div style={
                this.props.shouldExpand
                    ? Object.assign(style, styleExpanded)
                    : style
            }>
                {
                    filterSets.map((filter: Filter) =>
                        <SingleFilterPanel
                            key={filter.id}
                            filter={filter}
                            filterState={this.props.filterState}
                            filterOptionClick={this.props.filterOptionClick}
                        />
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<OptionDisplayProps> {
    return {
        filterState: state.ui.filterState,
        shouldExpand: state.ui.shouldDetailedFilterPanelExpand
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<OptionDisplayProps> {
    return {
        filterOptionClick(filterId: FilterId, optionId: OptionId): void {
            dispatch(
                filterOptionClickAction(filterId, optionId)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDetailedOptionPanel)
