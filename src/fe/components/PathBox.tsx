import * as React from 'react'

import {
    Path
} from '../utils/definitions'

interface PathShowcaseProps {
    path: Path
}

const boxStyle = {
    boxSizing: "border-box",
    margin: "0 0.5em 0.5em 0",
    display: "inline-block",

    width: "calc(50% - 2em)", //TODO: Need work
    height: "calc(50vw - 2em)",
    maxHeight: "200",

    borderRadius: "5px",
    padding: "1em",

    background: "#ffccbc",
    wordWrap: "break-work",
    overflow: "hidden",
} as React.CSSProperties

class PathBox extends React.PureComponent<PathShowcaseProps, {}> {
    render() {
        const transitions = this.props.path.transitions
        return (
            <div style={boxStyle}>
                <div>
                    <h1 style={{fontSize: 14}}>
                        {transitions[0].name["en"]}
                    </h1>
                </div>
            </div>
        )
    }
}

export default PathBox
