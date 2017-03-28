import data from '../../data'

import * as React from 'react'
import {connect} from 'react-redux'

import TopBar from './TopBar'
import Title from './Title'
import PathShowcase from './PathShowcase'
import FilterPanel from './FilterPanel'
import PathDetailDisplay from './PathDetailDisplay'

import {
    Path,
} from '../utils/definitions'

import {
    Condition,
    Region,
} from '../../definitions'

import {VisaPlannerState} from "../reducers"
import {FilterId, FilterState} from "../data"

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
    enabledFilters: FilterState
    pathOnDisplay: Path | null
}

class VisaPlanner extends React.Component<PropTypes, {}> {

    getFilteredPaths(enabledFilters: FilterState): Path[] {
        const allTransitions = flatten(data.regions.map((region: Region) => region.transitionList))
        const allPaths = allTransitions.map(transition => ({
            transitions: [transition]
        }))

        // FIXME: This whole thing is hacked together.
        if (enabledFilters.english) {
            for (let i = 0; i < allPaths.length; i += 1) {
                const transition = allPaths[i].transitions[0]
                const englishPrereq = findInCombination(
                    (x) => x.property && x.property === 'language_test',
                    transition.prerequisiteList
                )

                if (englishPrereq) {
                    const currentScore = Number(enabledFilters.english)
                    const requirementScore = englishPrereq.requirements[0].value
                    if (currentScore < requirementScore) {
                        allPaths.splice(i, 1)
                    }
                }
            }
        }

        if (enabledFilters.offer) {
            for (let i = 0; i < allPaths.length; i += 1) {
                const transition = allPaths[i].transitions[0]
                const prereq = findInCombination(
                    (x) => x.property && x.property === 'offer',
                    transition.prerequisiteList
                )

                if (prereq && enabledFilters.offer === 'no') {
                    allPaths.splice(i, 1)
                }
            }
        }
        // FIXME: Hack end.

        if (enabledFilters.education) {
            for (let i = 0; i < allPaths.length; i += 1) {
                const transition = allPaths[i].transitions[0]
                const prereq = findInCombination(
                    (x) => x.property && x.property === 'offer',
                    transition.prerequisiteList
                )

                if (prereq && prereq.stage !== enabledFilters.education) {
                    allPaths.splice(i, 1)
                }
            }
        }

        return allPaths
    }

    boxClick(path: Path): void {
        this.setState({
            pathOnDisplay: path
        })
    }

    render() {
        const enabledFilters = this.props.enabledFilters
        return (
            <div style={style}>
                <TopBar
                    brandName={data.app.brandName[data.app.lang]}
                    version={data.app.version}
                />
                <Title text={
                    (Number(enabledFilters.education) +
                     Number(enabledFilters.english) +
                     Number(enabledFilters.offer))
                    ? "Mobility options for you"
                    : "Popular mobility options"
                } />
                <div style={{
                    overflow: "scroll"
                }}>
                    <PathShowcase
                        paths={this.getFilteredPaths(enabledFilters)}
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
                <FilterPanel />
            </div>
        );
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<PropTypes> {
    return {
        enabledFilters: state.ui.enabledFilters,
        pathOnDisplay: state.ui.pathOnDisplay,
    }
}

export default connect(mapStateToProps)(VisaPlanner)
