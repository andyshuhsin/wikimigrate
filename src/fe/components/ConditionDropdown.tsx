import * as React from 'react'

const style = {
    font: "bold 14px sans-serif",
    padding: "0.5em",
    border: "1px solid #c8c8c8"
}

interface ConditionDropdownProps {
    item: string
    placeholder: string
    options: Array<string>
    chosenItem: string
    filterClick: (item: string, value: string) => void
}

class ConditionDropdown extends React.PureComponent<ConditionDropdownProps, {}> {
    render() {
        return (
            <select
                style={style}
                value={this.props.chosenItem}
                onChange={(event: any) => this.props.filterClick(this.props.item, event.target.value)}
            >
                <option>{this.props.placeholder}</option>
                {
                    this.props.options.map(
                        option =>
                            <option key={option} value={option}>
                                {option}
                            </option>
                    )
                }
            </select>
        )
    }
}

export default ConditionDropdown
