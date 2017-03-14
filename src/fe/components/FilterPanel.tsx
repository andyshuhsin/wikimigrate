import * as React from 'react'
import ConditionDropdown from './ConditionDropdown'

const style = {

    display: "flex",
    justifyContent: "space-around"

} as React.CSSProperties

class FilterPanel extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div style={style}>
                <ConditionDropdown placeholder={"工作经历"} />
                <ConditionDropdown placeholder={"教育经历"} />
                <ConditionDropdown placeholder={"年龄"} />
            </div>
        )
    }

}

export default FilterPanel
