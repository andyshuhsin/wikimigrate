import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { VisaPlannerState } from '../../../reducers'
import { Specifier, SpecifierId, specifiers, OptionId } from '../../../data'
import {
    educationAddAction, educationDurationChangeAction, educationGraduationDateChangeAction,
    educationRegionChangeAction,
    educationRemoveAction,
    educationStageChangeAction,
    languageTestAddAction,
    languageTestChangeAction,
    languageTestRemoveAction,
    languageTestScoreChangeAction,
    specifierClickAction,
    SpecifierListOperator,
} from '../../../actions/SpecifierActions'
import design from '../../design'
import { Person } from '../../../../definitions/Person'
import { LanguageTestId, LanguageTestItem } from '../../../../definitions/auxiliary/LanguageTest'
import { text } from '../../../utils/text'
import sys from '../../sys'
import { LanguageSpecifierBody } from './LanguageSpecifierBody'
import { IconButton } from './IconButton'
import { EducationSpecifierBody } from './EducationSpecifierBody'
import { EducationStage } from '../../../../definitions/Qualities/EducationExperience'
import { RegionId } from '../../../../definitions/auxiliary/Region'
import { Duration } from '../../../../definitions/auxiliary/Duration'
import SpecifierBar from './SpecifierBar'

const styles = {
    titleStyle: {
        fontSize: '1em',
        margin: '0',
        background: design.colors.greyLight,
        padding: '0.2em 1em',
    } as React.CSSProperties,

    specifierBodyContainerStyle: {
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        padding: sys.viewport.width < design.dimensions.narrowWidth
            ? '0.6em 1.0em'
            : '1em 2em',
        userSelect: 'none',
    } as React.CSSProperties,

    optionNormalStyle: {
        display: 'inline-block',
        marginRight: '1em',
        fontSize: '1em',
        fontWeight: 'bolder',
        padding: '0.2em 0.4em',
        borderWidth: '3px',
        borderRadius: '3px',
        borderStyle: 'solid',
        borderColor: design.colors.greyLight,
        cursor: 'pointer',
    } as React.CSSProperties,

    optionHighlightStyle: {
        color: design.colors.brand,
        borderColor: design.colors.brand,
    } as React.CSSProperties,

    valueStyle: {
        display: 'inline-block',
        margin: '0 0.6em',
        minWidth: '1.2em',

        fontSize: '1.5em',
        color: design.colors.brand,
        fontWeight: 'bolder',
        textAlign: 'center',
        verticalAlign: 'bottom',
    } as React.CSSProperties,

}

export type SpecifierOptionClickFn =
    (specifierId: SpecifierId,
     optionId: OptionId,
     index?: number,
     operator?: SpecifierListOperator
    ) => void

export interface LanguageSpecifierCallbacks {
    languageTestSelect(index: number, test: LanguageTestId): void
    languageScoreSelect(index: number, item: LanguageTestItem, score: number): void
    languageTestRemove(index: number): void
}

export interface EducationSpecifierCallbacks {
    educationRemove(index: number): void
    educationStageChange(index: number, newStage: EducationStage): void
    educationRegionChange(index: number, newRegion: RegionId): void
    educationDurationChange(index: number, duration: Duration): void
    educationGraduationDateChange(index: number, year: number): void
}

interface OptionDisplayProps extends LanguageSpecifierCallbacks,
                                     EducationSpecifierCallbacks
{
    shouldExpand: boolean
    specifierOptionClick: SpecifierOptionClickFn
    user: Person

    educationAdd(): void
    languageTestAdd(): void
}

class SpecifierPanel extends React.PureComponent<OptionDisplayProps, {}> {

    render() {
        const style = {
            position: 'absolute',
            width: '100%',
            bottom: '0',
            background: 'white',
            transform: this.props.shouldExpand ? `translateY(0)` : `translateY(100%)`,
            transition: `transform ${design.durations.slide}s`,
            overflowY: 'scroll',
            height: '80vh',
        } as React.CSSProperties

        const {
            languageTestAdd,
            languageTestSelect,
            languageScoreSelect,
            languageTestRemove,

            educationAdd,
            educationRemove,
            educationStageChange,
            educationRegionChange,
            educationDurationChange,
            educationGraduationDateChange,
        } = this.props

        const languageTests = this.props.user.languageTests || []
        const education =this.props.user.education || []

        return (
            <aside style={style}>
                <section>
                </section>
                <SpecifierBar onClick={() => {}}/>
                <section>
                    <h1 style={styles.titleStyle}>
                        {text({
                            en: 'Language',
                            zh_hans: '语言',
                        })}
                    </h1>

                    <div style={styles.specifierBodyContainerStyle}>
                        {
                            languageTests.map((test, index) =>
                                <LanguageSpecifierBody
                                    key={test.testId + index}
                                    test={test}
                                    languageTestSelect={languageTestSelect}
                                    languageScoreSelect={languageScoreSelect}
                                    languageTestRemove={languageTestRemove}
                                    index={index}
                                />
                            )
                        }
                        <IconButton
                            icon="+"
                            onClick={languageTestAdd}
                        />
                    </div>
                </section>

                <section>
                    <h1 style={styles.titleStyle}>
                        {text({
                            en: 'Education',
                            zh_hans: '学历',
                        })}
                    </h1>
                    <div style={styles.specifierBodyContainerStyle}>
                        {
                            education.map((edu, index) =>
                                <EducationSpecifierBody
                                    key={String(edu.stage) + String(edu.region) + String(index)}
                                    edu={edu}
                                    index={index}
                                    educationRemove={educationRemove}
                                    educationStageChange={educationStageChange}
                                    educationRegionChange={educationRegionChange}
                                    educationDurationChange={educationDurationChange}
                                    educationGraduationDateChange={educationGraduationDateChange}
                                />
                            )
                        }
                        <IconButton
                            icon="+"
                            onClick={educationAdd}
                        />
                    </div>
                </section>

            </aside>
        )
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<OptionDisplayProps> {
    return {
        shouldExpand: state.ui.shouldSpecifierPanelExpand,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<OptionDisplayProps> {
    return {
        specifierOptionClick(
            specifierId: SpecifierId,
            optionId: OptionId,
            index?: number,
            operator?: SpecifierListOperator,
        ): void {
            dispatch(
                specifierClickAction(specifierId, optionId, index, operator),
            )
        },
        languageTestSelect(index: number, test: LanguageTestId): void {
            dispatch(languageTestChangeAction(index, test))
        },
        languageTestAdd(): void {
            dispatch(languageTestAddAction())
        },
        languageTestRemove(index: number): void {
            dispatch(languageTestRemoveAction(index))
        },
        languageScoreSelect(index: number, item: LanguageTestItem, score: number): void {
            dispatch(languageTestScoreChangeAction(index, item, score))
        },
        educationAdd(): void {
            dispatch(educationAddAction())
        },
        educationRemove(index: number): void {
            dispatch(educationRemoveAction(index))
        },
        educationStageChange(index: number, newStage: EducationStage): void {
            dispatch(educationStageChangeAction(index, newStage))
        },
        educationRegionChange(index: number, newRegion: RegionId): void {
            dispatch(educationRegionChangeAction(index, newRegion))
        },
        educationDurationChange(index: number, newDuration: Duration): void {
            dispatch(educationDurationChangeAction(index, newDuration))
        },
        educationGraduationDateChange(index: number, year: number): void {
            dispatch(educationGraduationDateChangeAction(index, year))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecifierPanel)
