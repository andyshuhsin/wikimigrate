import * as React from 'react'
import {connect, Dispatch} from "react-redux"
import {VisaPlannerState} from "../../reducers/index"
import {Filter, FilterId, filterSets, FilterState, OptionId} from "../../data"
import {filterOptionClickAction} from "../../actions"
import SingleFilterPanel from "./SingleFilterPanel"

export type FilterOptionClickFn = (filterId: FilterId, optionId: OptionId) => void

interface OptionDisplayProps {
    shouldExpand: boolean
    filterState: FilterState
    filterOptionClick: FilterOptionClickFn
}

class FilterDetailedOptionPanel extends React.PureComponent<OptionDisplayProps, {}> {

    render() {
        const style = {
            position: "absolute",
            left: 0,
            top: 0,
            paddingBottom: "1em",
            width: "100%",
            transition: "transform 1s",
            background: "white",
        }

        const styleExpanded = {
        }

        return (
            <div style={
                this.props.shouldExpand
                    ? Object.assign(style, styleExpanded)
                    : style
            }>
                {filterSets.map((filter: Filter) =>
                    <SingleFilterPanel
                        key={filter.id}
                        filter={filter}
                        filterState={this.props.filterState}
                        filterOptionClick={this.props.filterOptionClick}
                    />
                )}
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
