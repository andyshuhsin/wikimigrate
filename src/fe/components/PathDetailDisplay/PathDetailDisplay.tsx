import * as React from 'react'
import TransitionDisplay from './TransitionDisplay'

import {
    Path
} from '../../utils/definitions'

const style = {
    position: "absolute",
    left: "0",
    right: 0,
    top: 0,
    bottom: 0,

    overflow: "scroll",

    background: "#ebebeb",
    zIndex: 1,
}

const closeButtonStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    margin: "auto",
    bottom: "1em",
    fontSize: "3em",
    height: "1em",
    width: "1em",
    textAlign: "center",
}

interface Props {
    pathOnDisplay: Path | null
    onClose: (event: any) => void
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

                    <div style={closeButtonStyle}
                         onClick={this.props.onClose}>
                        &times;
                    </div>

                </div>
            )
        } else {
            return null
        }
    }

}

export default PathDetailDisplay
