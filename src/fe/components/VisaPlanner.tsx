import data from '../../data'
import * as React from 'react'

import TopBar from './TopBar'

const style = {
    fontSize: 14,
    fontFamily: "sans-serif",
    padding: "0.1em"
}

class VisaPlanner extends React.Component<{}, {}> {

    render() {
        return (
            <div style={style}>
                <TopBar />
            </div>
        );
    }

}

export default VisaPlanner
