import * as React from 'react'

import data from '../../../../data'

import {
    FundPrereq
} from '../../../../definitions'

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
                            {data.common.currencies[scheme.fund.currencyId].code}
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
    } else {
        return <noscript />
    }
}

export default FundBox
