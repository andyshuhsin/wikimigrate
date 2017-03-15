import * as React from 'react'

import {
    Transition,
    Prerequisite,
    Combination,
} from '../../../data/common'

import CombinationBox from './CombinationBox'

interface Props {
    transition: Transition
}

const h1Style = {

}

const h2Style = {

}

class TransitionDisplay extends React.PureComponent<Props, {}> {
    render() {
        const transition = this.props.transition
        return (
            <div>
                <h1 style={h1Style}>
                    {transition.id}
                </h1>
                <h2 style={h2Style}>
                    To {transition.to.name["en"]},
                    for rights of {transition.to.rights}
                </h2>

                <div>
                    Prerequisites:
                    {
                        <CombinationBox combo={transition.prerequisiteList} />
                    }
                </div>
            </div>
        )
    }
}

export default TransitionDisplay

