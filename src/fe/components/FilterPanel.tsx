import * as React from 'react'
import ConditionDropdown from './ConditionDropdown'
import Title from './Title'

const panelStyle = {
    width: "100%",
    padding: "1em",
    flex: 0,
} as React.CSSProperties

const line1Style = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "1em",
} as React.CSSProperties

// const line2Style = {
//     textAlign: "center",
//     fontSize: "0.8em",
// } as React.CSSProperties
//
// const linkStyle = {
//     textDecoration: "none",
//     color: "#212121"
// }

type Props = {
    filterStates: {
        offer: string
        education: string
        english: string
    }

    filterClick: (item: string, value: string) => void
}

class FilterPanel extends React.PureComponent<Props, {}> {

    render() {
        return (
            <div style={panelStyle}>
                <div style={line1Style}>
                    <ConditionDropdown 
                        item={"offer"}
                        placeholder={"Job offer"}
                        options={[
                            "yes",
                            "no"
                        ]}
                        chosenItem={this.props.filterStates.offer}
                        filterClick={this.props.filterClick}
                    />
                    <ConditionDropdown
                        item={"education"}
                        placeholder={"Education"}
                        options={[
                            "university",
                            "secondary",
                            "primary",
                        ]}
                        chosenItem={this.props.filterStates.education}
                        filterClick={this.props.filterClick}
                    />
                    <ConditionDropdown
                        item={"english"}
                        placeholder={"IELTS level"}
                        options={[
                            "7",
                            "6",
                            "5",
                        ]}
                        chosenItem={this.props.filterStates.english}
                        filterClick={this.props.filterClick}
                    />
                </div>
                {/*<div style={line2Style}>*/}
                    {/*© 2017 The Good Move・*/}
                    {/*<a href="./about.html" style={linkStyle}>About</a>*/}
                {/*</div>*/}
            </div>
        )
    }

}

export default FilterPanel
