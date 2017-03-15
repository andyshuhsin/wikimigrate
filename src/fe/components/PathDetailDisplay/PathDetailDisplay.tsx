import * as React from 'react'

import {
    Path
} from '../../utils/definitions'

interface Props {
    pathOnDisplay: Path | null
    onClose: (event: any) => void
}

const style = {
    position: "absolute",
    left: "2em",
    right: "2em",
    top: "2em",
    bottom: "2em",
    background: "#ebebeb",
}

const closeButtonStyle = {
    position: "absolute",
    right: "0.3em",
    top: "0.2em",
    fontSize: "3em"
}

class PathDetailDisplay extends React.PureComponent<Props, {}> {

    render() {
        if (this.props.pathOnDisplay) {
            return (
                <div style={style}>

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
