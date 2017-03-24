import * as React from 'react'

import {
    CertificationPrereq
} from '../../../../definitions'

const CertificationBox = (props: {prereq: CertificationPrereq}) => {
    return (
        <div>
            You have certification: <br />
            {props.prereq.description['en']}
        </div>
    )
}

export default CertificationBox