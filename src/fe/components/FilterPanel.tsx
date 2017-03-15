import * as React from 'react'
import ConditionDropdown from './ConditionDropdown'
import Title from './Title'

const panelStyle = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxWidth: 400,
    padding: "1em",
} as React.CSSProperties

const line1Style = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "1em",
} as React.CSSProperties

const line2Style = {
    textAlign: "center",
    fontSize: "0.8em",
} as React.CSSProperties

const linkStyle = {
    textDecoration: "none",
    color: "#212121"
}

class FilterPanel extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div style={panelStyle}>
                <Title text={"筛选项目"} />
                <div style={line1Style}>
                    <ConditionDropdown placeholder={"工作经历"} />
                    <ConditionDropdown placeholder={"教育经历"} />
                    <ConditionDropdown placeholder={"年龄"} />
                </div>
                <div style={line2Style}>
                    © 2017 跑得快・
                    <a href="#" style={linkStyle}>我们是谁</a>・
                    <a href="#" style={linkStyle}>法律声明</a>
                </div>
            </div>
        )
    }

}

export default FilterPanel
