import * as React from 'react'
import {connect} from 'react-redux'
import FilterMenu from "./FilterMenu"
import {filterSets, Filter, FilterState, FilterId} from "../data"
import {VisaPlannerState} from "../reducers/index"
import {Action, menuClick, filterSelect} from "../actions"


const panelStyle = {
    width: "100%",
    padding: "0.2em",
    flex: 0,
} as React.CSSProperties

const line1Style = {
    display: "flex",
    justifyContent: "space-around",
} as React.CSSProperties

// const line2Style = {
//     textAlign: "center",
//     fontSize: "0.8em",
// } as React.CSSProperties
//
// const linkStyle = {
//     textDecoration: "none",
//     color: "#212121"
// }

type Props = {
    enabledFilters: FilterState
    expandedFilterId: FilterId | null

    onFilterClick: (item: string, value: string) => void
    onMenuClick: (filterId: FilterId) => void
}

type State = {
    expandedMenuTitle: string | null
}

class FilterPanel extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            expandedMenuTitle: null
        }
    }

    render() {

        return (
            <div style={panelStyle}>
                <div style={line1Style}>
                    {filterSets.map((filter: Filter) => (
                          <FilterMenu
                              id={filter.id}
                              key={filter.id}
                              title={filter.title}
                              options={filter.options}
                              chosenItem={this.props.enabledFilters[filter.id]}
                              onFilterClick={this.props.onFilterClick}
                              expandedFilterId={this.props.expandedFilterId}
                              onMenuClick={this.props.onMenuClick}
                            />
                    ))}
                </div>
                {/*<div style={line2Style}>*/}
                    {/*© 2017 The Good Move・*/}
                    {/*<a href="./about.html" style={linkStyle}>About</a>*/}
                {/*</div>*/}
            </div>
        )
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<Props> {
    return {
        enabledFilters: state.ui.enabledFilters,
        expandedFilterId: state.ui.expandedFilterId,
    }
}

function mapDispatchToProps(dispatch: (action: Action) => void): Partial<Props> {
    return {
        onFilterClick(id: FilterId, value: string) {
            dispatch(filterSelect(id, value))
        },
        onMenuClick(filterId: FilterId) {
            dispatch(menuClick(filterId))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)
