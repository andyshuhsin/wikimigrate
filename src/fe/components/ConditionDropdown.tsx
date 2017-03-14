import * as React from 'react'

const style = {
    font: "bold 14px sans-serif",
    padding: "0.5em",
    border: "1px solid #c8c8c8"
}

interface ConditionDropdownProps {
    placeholder: string
}

class ConditionDropdown extends React.PureComponent<ConditionDropdownProps, {}> {
    render() {
        return (
            <select style={style}>
                <option>{this.props.placeholder}</option>
            </select>
        )
    }
}

export default ConditionDropdown
