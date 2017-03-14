import data from '../../data'
import * as React from 'react'

import TopBar from './TopBar'
import Title from './Title'
import PathBox from './PathBox'

import {
    Path
} from '../utils/definitions'

const style = {
    fontSize: 14,
    color: "#212121",
    fontFamily: "sans-serif",
    padding: "0.1em"
} as React.CSSProperties

const pathShowcaseStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxHeight: "50vh",
    overflow: "scroll",
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
                <div style={pathShowcaseStyle}>
                    {
                        this.getFilteredPaths().map((path: Path) =>
                            <PathBox
                                path={path}
                                key={path.transitions.map(transition => transition.id).join('')}
                            />
                        )
                    }
                </div>
            </div>
        );
    }

}

export default VisaPlanner
