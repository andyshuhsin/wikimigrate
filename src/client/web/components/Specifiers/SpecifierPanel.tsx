import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { Person } from '../../../../definitions/Person'
import { VisaPlannerState } from '../../../reducers'
import {
    LanguageTestId,
    LanguageTestItem,
} from '../../../../definitions/auxiliary/LanguageTest'
import { EducationStage } from '../../../../definitions/Qualities/EducationExperience'
import { RegionId } from '../../../../definitions/auxiliary/Region'
import { Duration } from '../../../../definitions/auxiliary/Duration'

import IconButton from './IconButton'
import WorkSpecifierSegment from './WorkSpecifierSegment'
import LanguageSpecifierSegment from './LanguageSpecifierSegment'
import EducationSpecifierSegment from './EducationSpecifierSegment'
import BirthYearSpecifierBody from './BirthYearSpecifierBody'
import SpouseSpecifierBody from './SpouseSpecifierBody'

import {
    birthYearChangeAction,
    educationAddAction,
    educationDurationChangeAction,
    educationGraduationDateChangeAction,
    educationRegionChangeAction,
    educationRemoveAction,
    educationStageChangeAction,
    languageTestAddAction,
    languageTestChangeAction,
    languageTestRemoveAction,
    languageTestScoreChangeAction,
    spouseExistenceChange,
    workAdd,
    workDurationChangeAction,
    workRegionChangeAction,
    workRemove,
} from '../../../actions/SpecifierActions'
import { filterBarClickAction } from '../../../actions'

import { text } from '../../../utils/text'
import design from '../../design'
import sys from '../../sys'

const TitleBar = (props: {onClick(): void}) => (
    <a
        style={{
            display: 'block',
            fontSize: '1.3em',
            padding: '0.5em 0.7em',
            width: '100%',
            transition: `transform ${design.durations.slide}s`,
            background: 'white',
            cursor: 'pointer',
        } as React.CSSProperties}
        onClick={props.onClick}
        role='button'
    >
        {
            text({
                en: 'Specify conditions',
                zh_hans: '设置个人条件',
            })
        }
        <img
            style={{
                width: '1.3em',
                verticalAlign: 'middle',
            }}
            src={require('../../../assets/angle-down.svg')}
        />
    </a>
)

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

export interface BirthSpecifiersCallbacks {
    birthYearChangeAction(year: number): void
}

export interface WorkSpecifiersCallbacks {
    workRemove(index: number): void
    workDurationChange(index: number, duration: Duration): void
    workRegionChange(index: number, region: RegionId): void
}

export interface SpouseSpecifiersCallbacks {
    spouseExistenceChange(hasSpouse: boolean): void
}

// Not to pass to other components
interface TopLevelSpecifierCallbacks {
    onFilterBarClick(): void
    educationAdd(): void
    languageTestAdd(): void
    workAdd(): void
}

interface CallbackProps extends TopLevelSpecifierCallbacks,
                                LanguageSpecifierCallbacks,
                                EducationSpecifierCallbacks,
                                BirthSpecifiersCallbacks,
                                WorkSpecifiersCallbacks,
                                SpouseSpecifiersCallbacks
{ }

interface ValueProps {
    shouldExpand: boolean
    user: Person
}

interface OptionDisplayProps extends CallbackProps, ValueProps
{ }

const SpecifierPanel = (props: OptionDisplayProps) => {
    const style: React.CSSProperties = {
        position: 'absolute',
        width: '100%',
        bottom: '0',
        background: 'white',
        transform: props.shouldExpand ? `translateY(0)` : `translateY(100%)`,
        transition: `transform ${design.durations.slide}s`,
        overflowY: 'scroll',
        height: '80vh',
        maxHeight: '800px',
    }

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

        workAdd,
        workRemove,
        workDurationChange,
        workRegionChange,

        spouseExistenceChange,
    } = props

    const languageTests = props.user.languageTests || []
    const education = props.user.education || []
    const works = props.user.workExperiences || []

    const LanguageSpecifiers = () => (
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
                        <LanguageSpecifierSegment
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
    )

    const EducationSpecifiers = () => (
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
                        <EducationSpecifierSegment
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
    )

    const BirthSpecifiers = () => (
        <section>
            <h1 style={styles.titleStyle}>
                {text({
                    en: 'Year of birth',
                    zh_hans: '出生年份',
                })}
            </h1>
            <div style={styles.specifierBodyContainerStyle}>
                <BirthYearSpecifierBody
                    year={props.user.birth.date.year}
                    onChange={props.birthYearChangeAction}
                />
            </div>
        </section>
    )

    const WorkSpecifiers = () => (
        <section>
            <h1 style={styles.titleStyle}>
                {text({
                    en: 'Work experience',
                    zh_hans: '工作经验',
                })}
            </h1>
            <div style={styles.specifierBodyContainerStyle}>
                {works.map((work, index) => (
                    <WorkSpecifierSegment
                        key={JSON.stringify(work) + String(index)}
                        index={index}
                        work={work}
                        workRemove={workRemove}
                        workDurationChange={workDurationChange}
                        workRegionChange={workRegionChange}
                    />
                ))}
                <IconButton
                    icon="+"
                    onClick={workAdd}
                />
            </div>
        </section>
    )

    const SpouseSpecifiers = () => (
        <section>
            <h1 style={styles.titleStyle}>
                {text({
                    en: 'Spouse',
                    zh_hans: '婚姻',
                })}
            </h1>
            <div style={styles.specifierBodyContainerStyle}>
                <SpouseSpecifierBody
                    spouseExistenceChange={spouseExistenceChange}
                    hasSpouseNow={props.user.spouse !== null}
                />
            </div>
        </section>
    )



    return (
        <aside style={style}>
            <TitleBar onClick={props.onFilterBarClick}/>
            <EducationSpecifiers />
            <WorkSpecifiers />
            <LanguageSpecifiers />
            <BirthSpecifiers />
            <SpouseSpecifiers />
        </aside>
    )
}


function mapStateToProps(state: VisaPlannerState): ValueProps {
    return {
        shouldExpand: state.ui.shouldSpecifierPanelExpand,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): CallbackProps {
    return {
        languageTestSelect: (index, test) =>
            dispatch(languageTestChangeAction(index, test)),
        languageTestAdd: () =>
            dispatch(languageTestAddAction()),
        languageTestRemove: index =>
            dispatch(languageTestRemoveAction(index)),
        languageScoreSelect: (index, item, score) =>
            dispatch(languageTestScoreChangeAction(index, item, score)),

        educationAdd: () =>
            dispatch(educationAddAction()),
        educationRemove: index =>
            dispatch(educationRemoveAction(index)),
        educationStageChange: (index, newStage) =>
            dispatch(educationStageChangeAction(index, newStage)),
        educationRegionChange: (index, newRegion) =>
            dispatch(educationRegionChangeAction(index, newRegion)),
        educationDurationChange: (index, newDuration) =>
            dispatch(educationDurationChangeAction(index, newDuration)),
        educationGraduationDateChange: (index, year) =>
            dispatch(educationGraduationDateChangeAction(index, year)),

        birthYearChangeAction: (year) =>
            dispatch(birthYearChangeAction(year)),

        workAdd: () =>
            dispatch(workAdd()),
        workRemove: index =>
            dispatch(workRemove(index)),
        workDurationChange: (index, duration) =>
            dispatch(workDurationChangeAction(index, duration)),
        workRegionChange: (index, region) =>
            dispatch(workRegionChangeAction(index, region)),

        spouseExistenceChange: hasSpouse =>
            dispatch(spouseExistenceChange(hasSpouse)),

        onFilterBarClick:
            () => dispatch(filterBarClickAction())
    }
}

const ConnectedSpecifierPanel = connect(mapStateToProps, mapDispatchToProps)(SpecifierPanel)

export default ConnectedSpecifierPanel
