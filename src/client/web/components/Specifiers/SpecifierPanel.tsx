import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { VisaPlannerState } from '../../../reducers'
import { Specifier, SpecifierId, specifiers, OptionId } from '../../../data'
import { specifierPanelRenderAction } from '../../../actions'
import {
    languageTestAddAction,
    languageTestChangeAction, languageTestRemoveAction, languageTestScoreChangeAction, specifierClickAction,
    SpecifierListOperator,
} from '../../../actions/SpecifierActions'
import { SingleSpecifierPanel } from './SingleSpecifierPanel'
import design from '../../design'
import { Person } from '../../../../definitions/Person'
import { LanguageTestId, LanguageTestItem } from '../../../../definitions/auxiliary/LanguageTest'


export type SpecifierOptionClickFn =
    (specifierId: SpecifierId,
     optionId: OptionId,
     index?: number,
     operator?: SpecifierListOperator
    ) => void

export type SpecifierPanelRenderFn = (height: number) => void

export interface SpecifierCallbacks {
    languageTestSelect(index: number, test: LanguageTestId): void
    languageScoreSelect(index: number, item: LanguageTestItem, score: number): void
    languageTestRemove(index: number): void
    languageTestAdd(): void
}

interface OptionDisplayProps extends SpecifierCallbacks {
    shouldExpand: boolean
    myHeight: number | null,
    specifierOptionClick: SpecifierOptionClickFn
    specifierPanelRender: SpecifierPanelRenderFn
    user: Person
}

let firstRender = true

class SpecifierPanel extends React.PureComponent<OptionDisplayProps, {}> {

    render() {
        const style = {
            position: 'absolute',
            width: '100%',
            bottom: '0',
            background: 'white',
            transform: firstRender
                ? `translateY(100vh)`
                : `translateY(${this.props.myHeight}px)`,
            transition: `transform ${design.durations.slide}s`,
            overflowY: 'scroll',
            maxHeight: '80vh',
            height: firstRender ? 'initial' : '0',
        } as React.CSSProperties

        const styleExpanded = {
            transform: `translateY(0)`,
            height: 'initial',
        }

        return (
            <div
                style={
                    this.props.shouldExpand
                        ? Object.assign(style, styleExpanded)
                        : style
                }
                ref={(element: HTMLElement) => {
                    if (firstRender && element) {
                        this.props.specifierPanelRender(element.offsetHeight)
                        firstRender = false
                    }
                }}
            >
                {specifiers.map((specifier: Specifier) =>
                    <SingleSpecifierPanel
                        key={specifier.id}
                        specifier={specifier}
                        specifierOptionClick={this.props.specifierOptionClick}
                        person={this.props.user}
                        languageTestAdd={this.props.languageTestAdd}
                        languageTestSelect={this.props.languageTestSelect}
                        languageScoreSelect={this.props.languageScoreSelect}
                        languageTestRemove={this.props.languageTestRemove}
                    />
                )}
            </div>
        )
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<OptionDisplayProps> {
    return {
        shouldExpand: state.ui.shouldSpecifierPanelExpand,
        myHeight: state.ui.specifierPanelHeight,
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
        specifierPanelRender(height: number): void {
            dispatch(specifierPanelRenderAction(height))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecifierPanel)
