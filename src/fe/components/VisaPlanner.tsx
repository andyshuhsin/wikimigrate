import data from '../../data'
import * as React from 'react'

class VisaPlanner extends React.Component<{}, {}> {

    render() {
        return <div> {JSON.stringify(data)} </div>;
    }

}

export default VisaPlanner
