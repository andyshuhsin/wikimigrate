import * as React from 'react'
import {connect, Dispatch} from "react-redux"
import {VisaPlannerState} from "../../reducers/index"
import {Filter, FilterId, filterSets, FilterState, OptionId} from "../../data"
import {filterOptionClickAction, filterPanelRenderAction} from "../../actions"
import SingleFilterPanel from "./SingleFilterPanel"
import design from "../../design"

export type FilterOptionClickFn = (filterId: FilterId, optionId: OptionId) => void
export type FilterPanelRenderFn = (height: number) => void

interface OptionDisplayProps {
    shouldExpand: boolean
    myHeight: number | null,
    filterState: FilterState
    filterOptionClick: FilterOptionClickFn
    filterPanelRender: FilterPanelRenderFn
}

let firstRender = true

class FilterDetailedOptionPanel extends React.PureComponent<OptionDisplayProps, {}> {

    render() {
        const style = {
            position: "absolute",
            width: "100%",
            bottom: "0",
            background: "white",
            transform: firstRender
                       ? `translateY(100vh)`
                       : `translateY(${this.props.myHeight}px)`,
            transition: `transform ${design.durations.slide}s`,
        }

        const styleExpanded = {
            transform: `translateY(0)`,
        }

        return (
            <div
                style={
                    this.props.shouldExpand
                        ? Object.assign(style, styleExpanded)
                        : style
                }
                ref={(element: HTMLElement) => {
                    if (firstRender && element) {
                        this.props.filterPanelRender(element.offsetHeight)
                        firstRender = false
                    }
                }}
            >
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
        shouldExpand: state.ui.shouldDetailedFilterPanelExpand,
        myHeight: state.ui.filterPanelHeight,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<OptionDisplayProps> {
    return {
        filterOptionClick(filterId: FilterId, optionId: OptionId): void {
            dispatch(
                filterOptionClickAction(filterId, optionId)
            )
        },
        filterPanelRender(height: number): void {
            dispatch(filterPanelRenderAction(height))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDetailedOptionPanel)
