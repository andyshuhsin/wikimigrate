import * as React from 'react'
import TransitionDisplay from './TransitionDisplay'

import {
    Path
} from '../../utils/definitions'

const style = {
    position: "absolute",
    left: "1em",
    right: 0,
    top: 0,
    bottom: 0,

    overflow: "scroll",

    background: "#ebebeb",
    zIndex: 1,
}

const closeButtonStyle = {
    position: "absolute",
    webkitAppearance: "none",
    appearance: "none",
    left: 0,
    right: 0,
    top: 0,
    bottom: "1em",
    fontSize: "3em",
}

interface Props {
    pathOnDisplay: Path | null
    onClose: (event: any) => void
}

const test = {
    aaa: 1,
    toString() {
        return "FUCK YEAH"
    }
}

class PathDetailDisplay extends React.PureComponent<Props, {}> {

    render() {
        if (this.props.pathOnDisplay) {
            return (
                <div style={style}>

                    {
                        this.props.pathOnDisplay.transitions.map(
                            transition => 
                                <TransitionDisplay
                                    transition={transition}
                                    key={transition.id}
                                />
                        )
                    }

                    <button style={closeButtonStyle}
                            onClick={this.props.onClose}>
                        &times;
                    </button>

                </div>
            )
        } else {
            return null
        }
    }

}

export default PathDetailDisplay
