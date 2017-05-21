import * as React from 'react'
import Procedure from '../../../../../definitions/auxiliary/Procedure'
import { text } from '../../../../utils/text'

interface Props {
    procedureList: Procedure[]
}

class ProcedureBox extends React.PureComponent<Props, {}> {
    render() {
        return (
            <div>
                {this.props.procedureList.map(
                    (procedure: Procedure, index: number) => (
                        <div
                            key={text(procedure.name)}
                            style={{
                                marginBottom: '0.5em',
                            }}
                        >
                            {index + 1}
                            {'. '}
                            {text(procedure.name)}
                            {procedure.description &&
                             <div style={{
                                 marginLeft: '2em',
                             }}>
                                 {text(procedure.description)}
                             </div>
                            }
                        </div>
                    ),
                )}
            </div>
        )
    }
}

export default ProcedureBox
