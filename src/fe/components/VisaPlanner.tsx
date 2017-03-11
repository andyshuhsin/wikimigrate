import countries from './countries'
import * as React from 'react'

class VisaPlanner extends React.Component<{}, {}> {

    render() {
        return <div> {JSON.stringify(countries)} </div>;
    }

}

export default VisaPlanner
