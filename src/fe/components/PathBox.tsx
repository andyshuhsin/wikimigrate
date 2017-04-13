import * as React from 'react'
import text from "../utils/text"

import {
    Path
} from '../utils/definitions'

import data from '../../data'
import design from "../design"

interface PathShowcaseProps {
    path: Path
    onClick: (event: React.MouseEvent<any>) => void
}

const boxStyle = {
    marginBottom: "0.625em",

    maxHeight: "200px",
    padding: "1.7em 1em",

    fontSize: "1.2em",
    textAlign: "center",
    background: design.colors.brandLighter,
    wordWrap: "break-work",
    overflow: "hidden",
    cursor: "pointer",
} as React.CSSProperties

const countryNameStyle = {
    font: "normal 1.2em sans-serif",
    margin: 0,
    marginBottom: "0.3em",
} as React.CSSProperties

const pathNameStyle = {
    font: "normal 1.2em sans-serif",
    margin: 0
} as React.CSSProperties

class PathBox extends React.PureComponent<PathShowcaseProps, {}> {
    render() {
        const transitions = this.props.path.transitions
        const targetRegion = data.getRegionById(transitions[0].regionId)
        return (
            <div style={boxStyle} onClick={this.props.onClick}>
                <div>
                    <h2 style={countryNameStyle}>
                        {targetRegion && text(targetRegion.name)}
                    </h2>
                    <h1 style={pathNameStyle}>
                        {text(transitions[0].name)}
                    </h1>
                </div>
            </div>
        )
    }
}

export default PathBox
