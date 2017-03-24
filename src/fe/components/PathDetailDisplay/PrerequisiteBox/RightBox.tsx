import * as React from 'react'

import {
    RightPrereq
} from '../../../../definitions'

const RightBox = (props: {prereq: RightPrereq}) => {
    return (
        <div>
            You have the right of {props.prereq.rightId} in {props.prereq.rightId}
        </div>
    )
}

export default RightBox