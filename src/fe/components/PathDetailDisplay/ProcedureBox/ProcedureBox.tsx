import * as React from 'react'
import Procedure from "../../../../definitions/auxillary/Procedure"

interface Props {
    procedureList: Procedure[]
}

class ProcedureBox extends React.PureComponent<Props, {}> {
    render() {
        return (
            <div>
                {this.props.procedureList.map(
                    (procedure: Procedure, index: number) => (
                        <div key={procedure.name['en']}>
                            {index + 1}
                            {'. '}
                            {procedure.name['en']}
                        </div>
                    )
                )}
            </div>
        )
    }
}

export default ProcedureBox
