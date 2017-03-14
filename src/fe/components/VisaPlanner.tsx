import data from '../../data'
import * as React from 'react'

const style = {
    fontSize: 14,
    fontFamily: "sans-serif",
    padding: "0.1em"
}

class VisaPlanner extends React.Component<{}, {}> {

    render() {
        return (
            <div style={style}>
                {JSON.stringify(data)}
            </div>
        );
    }

}

export default VisaPlanner
