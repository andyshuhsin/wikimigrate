import * as React from 'react'

import {
    FundPrereq
} from '../../../../data/common'

function stringifyCondition(condition: any) {
    if (condition.familyMember) {
        return ` if you have ${condition.familyMember} family members`
    }
}

const FundBox = (props: {prereq: FundPrereq}) => {
    if (props.prereq.type === "possess") {
        return (
            <div>
                You must have
                {
                    props.prereq.schemes.map((scheme, index) => 
                        <div key={index}>
                            {scheme.fund.currencyId}
                            {" "}
                            {scheme.fund.value}
                            {
                                scheme.condition && stringifyCondition(scheme.condition)
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default FundBox