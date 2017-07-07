import * as React from 'react'

const DropdownGroup: React.StatelessComponent<{
    title: string,
    value: any,
    standAlone?: boolean
    onChange(event: React.ChangeEvent<any>): void
}> = props => {
    return (
        <label style={{
            display: props.standAlone ? 'block' : 'inline-block',
            width: '40%',
            margin: '0.2em',
        }}>
            {props.title &&
                <span style={{
                    lineHeight: '1.5',
                    fontWeight: 'lighter',
                }}>
                    {props.title}
                    <br />
                </span>
            }
            <select
                value={props.value}
                onChange={props.onChange}
                style={{
                    display: 'block',
                    border: '1px solid black',
                    width: '100%'
                }}
            >
                {props.children}
            </select>
        </label>
    )
}

export default DropdownGroup
