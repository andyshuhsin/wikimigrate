import canada from '../data/canada'
import * as React from 'react'
import * as ReactDom from 'react-dom'

class VisaPlanner extends React.Component<{}, {}> {

    render() {
        return <div> {JSON.stringify(canada)} </div>;
    }

}

ReactDom.render(<VisaPlanner />, document.getElementById('react-entry'));