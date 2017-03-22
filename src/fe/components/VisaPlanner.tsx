import data from '../../data'
import * as React from 'react'

import TopBar from './TopBar'
import Title from './Title'
import PathShowcase from './PathShowcase'
import FilterPanel from './FilterPanel'
import PathDetailDisplay from './PathDetailDisplay'

import {
    Path
} from '../utils/definitions'

import {
    Combination
} from '../../definitions'

const style = {
    padding: "0.1em",
    height: "100vh",
    maxWidth: 400,
    fontSize: 14,
    color: "#212121",
    fontFamily: "sans-serif",
} as React.CSSProperties

function flatten<T>(arrayOfArrays: Array<Array<T>>): Array<T> {
    return Array.prototype.concat.apply([], arrayOfArrays)
}

// FIXME: This function is full of hack
function findInCombination(predicate: (arg: any) => boolean, combo: Combination<any>) {

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

interface StateTypes {
    pathOnDisplay: Path | null
    filterStates: {
        offer: ''
        education: ''
        english: ''
    }
}

class VisaPlanner extends React.Component<{}, StateTypes> {

    constructor() {
        super()
        this.state = {
            pathOnDisplay: null,
            filterStates: {
                offer: '',
                education: '',
                english: '',
            }
        }
    }

    getFilteredPaths(): Path[] {
        const allTransitions = flatten(data.countries.map(country => country.transitionList))
        const allPaths = allTransitions.map(transition => ({
            transitions: [transition]
        }))
        
        // FIXME: This whole thing is hacked together.
        if (this.state.filterStates.english) {
            for (let i = 0; i < allPaths.length; i += 1) {
                const transition = allPaths[i].transitions[0]
                const englishPrereq = findInCombination(
                    (x) => x.property && x.property === 'language_test',
                    transition.prerequisiteList
                )

                if (englishPrereq) {
                    const currentScore = Number(this.state.filterStates.english)
                    const requirementScore = englishPrereq.requirements[0].value
                    if (currentScore < requirementScore) {
                        allPaths.splice(i, 1)
                        continue
                    }
                }
            }
        }

        if (this.state.filterStates.offer) {
            for (let i = 0; i < allPaths.length; i += 1) {
                const transition = allPaths[i].transitions[0]
                const prereq = findInCombination(
                    (x) => x.property && x.property === 'offer',
                    transition.prerequisiteList
                )

                if (prereq && this.state.filterStates.offer === 'no') {
                    allPaths.splice(i, 1)
                }
            }
        }
        // FIXME: Hack end.

        if (this.state.filterStates.education) {
            for (let i = 0; i < allPaths.length; i += 1) {
                const transition = allPaths[i].transitions[0]
                const prereq = findInCombination(
                    (x) => x.property && x.property === 'offer',
                    transition.prerequisiteList
                )

                if (prereq && prereq.stage !== this.state.filterStates.education) {
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

    filterClick(item: string, value: string) {
        console.info(item, value)
        this.setState({
            filterStates: Object.assign({}, this.state.filterStates, {
                [item]: value
            })
        } as any)
    }

    render() {
        return (
            <div style={style}>
                <TopBar
                    brandName={data.app.brandName[data.app.lang]}
                    version={data.app.version}
                />
                <Title text={
                    (this.state.filterStates.education +
                     this.state.filterStates.english +
                     this.state.filterStates.offer)
                    ? "Mobility options for you"
                    : "Popular mobility options"
                } />
                <PathShowcase
                        paths={this.getFilteredPaths()}
                        boxClick={this.boxClick.bind(this)}
                />
                <FilterPanel
                    filterStates={this.state.filterStates}
                    filterClick={this.filterClick.bind(this)}
                />
                <PathDetailDisplay
                        pathOnDisplay={this.state.pathOnDisplay}
                        onClose={
                            () => this.setState({
                                pathOnDisplay: null
                            })
                        }
                />
            </div>
        );
    }

}

export default VisaPlanner
