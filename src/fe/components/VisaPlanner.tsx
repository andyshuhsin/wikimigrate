import data from '../../data'
import * as React from 'react'

import TopBar from './TopBar'
import Title from './Title'

const style = {
    fontSize: 14,
    color: "#212121",
    fontFamily: "sans-serif",
    padding: "0.1em"
}

class VisaPlanner extends React.Component<{}, {}> {

    render() {
        return (
            <div style={style}>
                <TopBar brandName={data.app.brandName[data.app.lang]}/>
                <Title text={"近期最火的移民项目"} />
            </div>
        );
    }

}

export default VisaPlanner
