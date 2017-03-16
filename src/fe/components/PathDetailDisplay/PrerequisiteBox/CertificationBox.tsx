import * as React from 'react'

import {
    CertificationPrereq
} from '../../../../data/common'

const CertificationBox = (props: {prereq: CertificationPrereq}) => {
    return (
        <div>
            You have certification: <br />
            {props.prereq.description['en']}
        </div>
    )
}

export default CertificationBox