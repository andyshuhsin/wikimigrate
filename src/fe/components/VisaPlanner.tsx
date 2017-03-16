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
        return allPaths
    }

    boxClick(path: Path): void {
        console.log(path)
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
                <Title text={"Popular mobility options"} />
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
