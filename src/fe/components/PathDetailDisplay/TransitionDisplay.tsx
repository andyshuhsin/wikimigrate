import * as React from 'react'
import text from "../../utils/text"

import CombinationBox from './CombinationBox'
import ProcedureBox from './ProcedureBox'
import Transition from "../../../definitions/Transition";

interface Props {
    transition: Transition
}

const h1Style = {
    marginTop: "2em"
}

class TransitionDisplay extends React.PureComponent<Props, {}> {
    render() {
        const transition = this.props.transition
        return (
            <div>
                <h1 style={h1Style}>
                    {text(transition.name)}
                </h1>
                {/*<h2 style={h2Style}>
                    To {transition.to.name["en"]},
                    for rights of {transition.to.rights}
                </h2>*/}

                <div>
                    <h5>Prerequisites:</h5>
                    {
                        <CombinationBox combo={transition.prerequisiteList} />
                    }
                </div>

                <div>
                    <h5>Procedures:</h5>
                    {
                        <ProcedureBox procedureList={transition.procedureList} />
                    }
                </div>
            </div>
        )
    }
}

export default TransitionDisplay

