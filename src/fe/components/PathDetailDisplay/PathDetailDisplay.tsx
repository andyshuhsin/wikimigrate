import * as React from 'react'
import TransitionDisplay from './TransitionDisplay'
import sys from '../../sys'

import {
    Path
} from '../../utils/definitions'

const style = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    padding: "0.5em",
    overflow: "scroll",

    background: "#ebebeb",
    zIndex: 1,
}

const sideLength = "1em"
const closeButtonStyle = (() => {
    return {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: "20px",
        margin: "auto",

        height: sideLength,
        width: sideLength,
        lineHeight: sideLength,
        borderRadius: "50%",

        background: "rgba(0, 0, 0, 0.2)",
        color: "white",

        fontSize: "3em",
        textAlign: "center",

        cursor: "pointer",
    }
})()

const crossStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    width: `calc(${sideLength} / 2)`
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
                        <img
                            style={crossStyle}
                            src={require("../../assets/cross.svg")}
                        />
                    </div>

                </div>
            )
        } else {
            return null
        }
    }

}

export default PathDetailDisplay
