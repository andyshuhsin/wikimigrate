import * as React from 'react'
import text from "../utils/text"

import {
    Path
} from '../utils/definitions'

interface PathShowcaseProps {
    path: Path
    boxClick: (event: React.MouseEvent<any>) => void
}

const boxStyle = {
    boxSizing: "border-box",
    margin: "0 0.5em 0.5em 0",
    display: "inline-block",

    width: "calc(50% - 2em)", //TODO: Need work
    height: "calc(50vw - 2em)",
    maxHeight: "200px",

    borderRadius: "5px",
    padding: "1em",

    fontSize: "0.75em",
    background: "#ffccbc",
    wordWrap: "break-work",
    overflow: "hidden",
} as React.CSSProperties

class PathBox extends React.PureComponent<PathShowcaseProps, {}> {
    render() {
        const transitions = this.props.path.transitions
        return (
            <div style={boxStyle} onClick={this.props.boxClick}>
                <div>
                    <h2>
                        {transitions[0].regionId}
                    </h2>
                    <h1 style={{fontSize: 14}}>
                        {text(transitions[0].name)}
                    </h1>
                </div>
            </div>
        )
    }
}

export default PathBox
