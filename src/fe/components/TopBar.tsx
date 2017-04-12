import * as React from "react"

const barStyle = {
    display: "flex",
    flex: 0,
    alignItems: "center",
    padding: "2em 0.2em",
    marginBottom: "0.2em",
} as React.CSSProperties

const logoStyle = {
    maxWidth: "3em",
} as React.CSSProperties

const nameStyle = {
    fontSize: "1.2em",
    marginLeft: "0.3em"
} as React.CSSProperties

interface TopBarProps {
    brandName: string
    version: string
}

class TopBar extends React.PureComponent<TopBarProps, {}> {
    render() {
       return (
           <div style={barStyle}>
               <img style={logoStyle}
                    src={require("../assets/logo.svg")} />
                <span style={nameStyle} >
                    {this.props.brandName + " " + this.props.version}
                </span>
           </div>
       ) 
    }
}

export default TopBar
