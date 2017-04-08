import data from '../../data'

import * as React from 'react'
import {connect} from 'react-redux'

import TopBar from './TopBar'
import Title from './Title'
import PathShowcase from './PathShowcase'
import FilterBar from './FilterBar'
import PathDetailDisplay from './PathDetailDisplay'
import FilterDetailedOptionPanel from './FilterDetailedOptionPanel'

import {
    Path,
} from '../utils/definitions'

import {VisaPlannerState} from "../reducers"
import {Condition} from "../../definitions/auxillary/Combination"
import {Person} from "../../definitions/Person"

const style = {
    display: "flex",
    flexFlow: "column",
    padding: "0.1em",
    height: "100vh",
    maxWidth: 400,
    margin: "0 auto",
    fontSize: 14,
    color: "#212121",
    fontFamily: "sans-serif",
} as React.CSSProperties

function flatten<T>(arrayOfArrays: Array<Array<T>>): Array<T> {
    return Array.prototype.concat.apply([], arrayOfArrays)
}

// FIXME: This function is full of hack
function findInCombination(predicate: (arg: any) => boolean, combo: Condition<any>) {

    let result: any = null

    if (predicate(combo)) {
        return combo
    } else if (combo.operands) {
        for (let operand of combo.operands) {
            if (predicate(operand)) {
                return operand
            } else if (operand["operator"]) {
                result = findInCombination(predicate, operand)
                if (result) {
                    return result
                }
            }
        }
    }

    return result
}

interface PropTypes {
    user: Person
    pathOnDisplay: Path | null
}

function filterSuitablePaths(user: Person): Path[] {
    // TODO: Describe $data and explicitly reference it & remove closure.

    // FIXME: Use real data
    return [
        {
            transitions: [
                data.regions[0].transitionList[0],
            ]
        },
        {
            transitions: [
                data.regions[0].transitionList[1],
            ]
        },
        {
            transitions: [
                data.regions[0].transitionList[2],
            ]
        },
        {
            transitions: [
                data.regions[0].transitionList[3],
            ]
        },
        {
            transitions: [
                data.regions[0].transitionList[4],
            ]
        },
    ]
}

class VisaPlanner extends React.Component<PropTypes, {}> {

    boxClick(path: Path): void {
        this.setState({
            pathOnDisplay: path
        })
    }

    render() {
        return (
            <div style={style}>
                <TopBar
                    brandName={data.app.brandName[data.app.lang]}
                    version={data.app.version}
                />
                <Title text={
                    "Popular mobility options"
                } />
                <div style={{
                    overflow: "scroll"
                }}>
                    <PathShowcase
                        paths={filterSuitablePaths(this.props.user)}
                        boxClick={this.boxClick.bind(this)}
                    />
                    <PathDetailDisplay
                        pathOnDisplay={this.props.pathOnDisplay}
                        onClose={
                            () => this.setState({
                                pathOnDisplay: null
                            })
                        }
                    />
                </div>
                <FilterBar />
                <FilterDetailedOptionPanel />
            </div>
        );
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<PropTypes> {
    return {
        user: state.user,
        pathOnDisplay: state.ui.pathOnDisplay,
    }
}

export default connect(mapStateToProps)(VisaPlanner)
