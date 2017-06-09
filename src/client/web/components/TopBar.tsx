import * as React from 'react'

const barStyle = {
    display: 'flex',
    flex: 0,
    alignItems: 'center',
    padding: '2em 0.2em',
    marginBottom: '0.2em',
} as React.CSSProperties

const logoStyle = {
    maxWidth: '3em',
    verticalAlign: "middle",
} as React.CSSProperties

const nameStyle = {
    fontSize: '1.2em',
    marginLeft: '0.1em',
} as React.CSSProperties

interface TopBarProps {
    brandName: string
    version: string
}

class TopBar extends React.PureComponent<TopBarProps, {}> {
    render() {
        return (
            <header style={barStyle}>
                <img style={logoStyle}
                     src={require('../../assets/logo.svg')}/>
                <a
                    style={nameStyle}
                    href="/"
                >
                    {this.props.brandName + ' ' + this.props.version}
                </a>
            </header>
        )
    }
}

export default TopBar
