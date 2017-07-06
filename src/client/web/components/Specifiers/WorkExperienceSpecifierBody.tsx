import * as React from 'react'
import { specifierSharedStyles } from './specifierSharedStyles'
import { WorkExperienceQuality } from '../../../../definitions/Qualities/WorkExperience'
import { IconButton } from './IconButton'

const WorkExperienceSpecifierBody = (props: {
    work: WorkExperienceQuality
    index: number
    workRemove(index: number): void
}) => (
    <div style={specifierSharedStyles.containerStyles}>
        <IconButton
            icon='–'
            onClick={() => props.workRemove(props.index)}
            additionalStyle={specifierSharedStyles.deleteButtonStyle}
        />
        <select
            style={specifierSharedStyles.dropdownSelectStyle}
        >
        </select>
    </div>
)

export default WorkExperienceSpecifierBody
