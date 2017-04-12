import * as React from 'react'
import text from "../../utils/text"

import CombinationBox from './CombinationBox'
import ProcedureBox from './ProcedureBox'
import Transition from "../../../definitions/Transition";

interface Props {
    transition: Transition
}

const transitionNameStyle = {
    margin: 0,
}

const subheadStyle = {
    margin: "0.5em",
    marginLeft: 0,

    fontWeight: "lighter",
    fontSize: "1.4em",
} as React.CSSProperties

class TransitionDisplay extends React.PureComponent<Props, {}> {
    render() {
        const transition = this.props.transition
        return (
            <div>
                <h1 style={transitionNameStyle}>
                    {text(transition.name)}
                </h1>
                {/*<h2 style={h2Style}>
                    To {transition.to.name["en"]},
                    for rights of {transition.to.rights}
                </h2>*/}

                <div>
                    <h5 style={subheadStyle}>Prerequisites</h5>
                    {
                        <CombinationBox
                            combo={transition.prerequisiteList}
                            level={0}
                        />
                    }
                </div>

                <div>
                    <h5 style={subheadStyle}>Application</h5>
                    {
                        <ProcedureBox procedureList={transition.procedureList} />
                    }
                </div>
            </div>
        )
    }
}

export default TransitionDisplay

