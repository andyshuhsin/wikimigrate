import * as React from "react"

const barStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5em",
} as React.CSSProperties

const logoStyle = {
    maxWidth: 42,
} as React.CSSProperties

const nameStyle = {
    fontWeight: "bolder",
    marginLeft: "0.2em"
} as React.CSSProperties

interface TopBarProps {
    brandName: string
}

class TopBar extends React.PureComponent<TopBarProps, {}> {
    render() {
       return (
           <div style={barStyle}>
               <img style={logoStyle}
                    src={require("../assets/logo.svg")} />
                <span style={nameStyle} >
                    {this.props.brandName}
                </span>
           </div>
       ) 
    }
}

export default TopBar