import * as React from 'react'
import {MultiLangStringSet} from "../../definitions"
import text from '../utils/text'
import {FilterId} from "../data"

const style = {
    position: "relative",
    font: "bold 14px sans-serif",
    padding: "1em",
}

interface FilterMenuProps {
    id: FilterId
    title: MultiLangStringSet
    options: Array<MultiLangStringSet>
    chosenItem: string
    expandedFilterId: FilterId | null
    onFilterClick: (id: string, value: string) => void
    onMenuClick: (filterId: FilterId) => void
}

interface OptionDisplayProps {
    options: Array<MultiLangStringSet>
    shouldExpand: boolean
}

const OptionDisplay = (props: OptionDisplayProps) => {
    return (
        <div style={{display: props.shouldExpand ? "block" : "none"}}>
            {props.options.map((option: MultiLangStringSet) => {
                const optionText = text(option)
                return (
                    <span key={optionText}>
                        {optionText}
                    </span>
            )})}
        </div>
    )
}


class FilterMenu extends React.PureComponent<FilterMenuProps, {}> {

    render() {
        return (
            <div
                style={style}
                value={this.props.chosenItem}
                onClick={() => this.props.onMenuClick(this.props.id)}
            >
                {text(this.props.title)}
                <OptionDisplay
                    options={this.props.options}
                    shouldExpand={this.props.expandedFilterId === this.props.id}
                />
            </div>
        )
    }
}


export default FilterMenu
