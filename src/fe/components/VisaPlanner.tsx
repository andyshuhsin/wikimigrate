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
}

class VisaPlanner extends React.Component<{}, StateTypes> {

    constructor() {
        super()
        this.state = {
            pathOnDisplay: null
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

    render() {
        return (
            <div style={style}>
                <TopBar brandName={data.app.brandName[data.app.lang]}/>
                <Title text={"近期最火的移民项目"} />
                <PathShowcase
                        paths={this.getFilteredPaths()}
                        boxClick={this.boxClick.bind(this)}
                />
                <FilterPanel />
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
