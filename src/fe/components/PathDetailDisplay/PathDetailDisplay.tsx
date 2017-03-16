import * as React from 'react'
import TransitionDisplay from './TransitionDisplay'

import {
    Path
} from '../../utils/definitions'

const style = {
    position: "absolute",
    left: "2em",
    right: "2em",
    top: "2em",
    bottom: "2em",

    overflow: "scroll",
    maxWidth: "90vh",

    background: "#ebebeb",
}

const closeButtonStyle = {
    position: "absolute",
    right: "0.3em",
    top: "0.2em",
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
