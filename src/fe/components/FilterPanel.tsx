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
                <Title text={"Filter by"} />
                <div style={line1Style}>
                    <ConditionDropdown placeholder={"Job offer"} />
                    <ConditionDropdown placeholder={"Education"} />
                    <ConditionDropdown placeholder={"English level"} />
                </div>
                <div style={line2Style}>
                    © 2017 The Good Move・
                    <a href="#" style={linkStyle}>Who We Are</a>・
                    <a href="#" style={linkStyle}>Legal</a>
                </div>
            </div>
        )
    }

}

export default FilterPanel
