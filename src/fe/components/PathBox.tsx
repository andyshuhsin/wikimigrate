import * as React from 'react'

import {
    Path
} from '../utils/definitions'

interface PathShowcaseProps {
    path: Path
}

const boxStyle = {
    boxSizing: "border-box",
    marginBottom: "1em",

    width: "10em",
    height: "10em",

    borderRadius: "5px",
    padding: "1em",

    background: "#ffccbc",
    wordWrap: "break-work",
    overflow: "hidden",
}

class PathBox extends React.PureComponent<PathShowcaseProps, {}> {
    render() {
        return (
            <div style={boxStyle}>
                {this.props.path.transitions.map(transition => 
                    <div>
                        <h2 style={{fontSize: 10}}>
                            {transition}
                        </h2>
                        <h1 style={{fontSize: 14}}>
                            {transition.name["en"]}
                        </h1>

                    </div>
                  )
                }
            </div>
        )
    }
}

export default PathBox