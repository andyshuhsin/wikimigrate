import data from '../../data'
import * as React from 'react'

import TopBar from './TopBar'
import Title from './Title'
import PathShowcase from './PathShowcase'
import FilterPanel from './FilterPanel'

import {
    Path
} from '../utils/definitions'

const style = {
    fontSize: 14,
    color: "#212121",
    fontFamily: "sans-serif",
    padding: "0.1em"
} as React.CSSProperties

function flatten<T>(arrayOfArrays: Array<Array<T>>): Array<T> {
    return Array.prototype.concat.apply([], arrayOfArrays)
}

class VisaPlanner extends React.Component<{}, {}> {

    getFilteredPaths(): Path[] {
        const allTransitions = flatten(data.countries.map(country => country.transitionList))
        const allPaths = allTransitions.map(transition => ({
            transitions: [transition]
        }))
        return allPaths
    }

    render() {
        return (
            <div style={style}>
                <TopBar brandName={data.app.brandName[data.app.lang]}/>
                <Title text={"近期最火的移民项目"} />
                <PathShowcase paths={this.getFilteredPaths()} />
                <Title text={"筛选项目"} />
                <FilterPanel />
            </div>
        );
    }

}

export default VisaPlanner
