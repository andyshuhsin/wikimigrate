import * as React from "react"


import data from "../../data"

const barStyle = {
    display: "flex",
    alignItems: "center",
} as React.CSSProperties

const logoStyle = {
    maxWidth: 42,
} as React.CSSProperties

const nameStyle = {
    color: "#212121",
    fontWeight: "bolder",
    marginLeft: "0.2em"
} as React.CSSProperties

class TopBar extends React.Component<{}, {}> {
    render() {
       return (
           <div style={barStyle}>
               <img style={logoStyle}
                    src={require("../assets/logo.svg")} />
                <span style={nameStyle} >
                    {data.app.brandName[data.app.lang]}
                </span>
           </div>
       ) 
    }
}

export default TopBar