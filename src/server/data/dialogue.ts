import {LangId, MultiLangStringSet} from "../../definitions/auxiliary/MultiLang"
import {clone} from "../../client/utils/clone"
import {Person} from "../../definitions/Person"
import {
    EducationQuality,
    EducationStage,
    educationStageProfiles,
} from "../../definitions/Qualities/EducationExperience"
import {stripIndents} from "common-tags"
import {text} from "../../client/utils/text"
import {data} from "../../data/index"
import {RegionId} from "../../definitions/auxiliary/Region"
import {WechatChatbotUser} from "../middlewares/wechat"
import {Pathway} from "../../client/utils/definitions"
import {calcSuitability, calcSuitablePaths} from "../../client/utils/calcSuitablePaths"
import Transition from "../../definitions/Transition"
import {Prerequisite} from "../../definitions/Prerequisites/index"
import {PrereqId} from "../../definitions/Prerequisites/BasePrereq"
import {EducationPrereq} from "../../definitions/Prerequisites/EducationPrereq"
import AgePrereq from "../../definitions/Prerequisites/AgePrereq"
import {PATHWAY_KW_SIMPLE} from "../../data/constants"

type Response = string

interface Reducer<T> {
    (state: T, input: string): T
}

interface Template<T> {
    (state: T): string
}

interface Dialogue<T> {
    reduce: Reducer<T>
    text: Template<T>
}

const restartKeywords = ["重来", "reset"]

export function shouldReset(answer: string): boolean {
    return restartKeywords.includes(answer.toLowerCase())
}

const wrap = (markStart: string, markEnd: string) => (content: string) => markStart + content + markEnd

interface ReverseEducationNameTextTable {
    [text: string]: EducationStage
}

export function buildReverseStageTable(
    lang: LangId,
    profiles = educationStageProfiles
): ReverseEducationNameTextTable {
    const result: ReverseEducationNameTextTable = {}
    for (const entry of Object.entries(profiles)) {
        const displayText = text(entry[1].name, lang)
        const stage = entry[0] as EducationStage
        result[displayText] = stage
    }
    return result
}

const reverseEducationStageNameTable = buildReverseStageTable("zh_hans")

function getTransitionName(path: Pathway): string {
    return path.transitions.map(transition => {
        const region = data.getRegionById(transition.regionId)
        return text(region && region.name) + text(transition.name)
    })
        .join('\n')
}

function getTransitionLink(transitionId: string): string {
    const env = process.env["WKM_ENVIRONMENT"]
    if (env === "dev") {
        return `http://localhost:8888/${PATHWAY_KW_SIMPLE}/${transitionId}`
    }
    else if (env === "stage") {
        return `https://zh.stage.wikimigrate.org/${PATHWAY_KW_SIMPLE}/${transitionId}`
    }
    else if (env === "prod") {
        return `https://zh.wikimigrate.org/${PATHWAY_KW_SIMPLE}/${transitionId}`
    }
    return `https://zh.wikimigrate.org/${PATHWAY_KW_SIMPLE}/${transitionId}`
}

function getTransitionDescription(transition: Transition): string {
    return stripIndents`
        ${text(transition.name)}
        ${getTransitionLink(transition.id)}
    `
}

function getPathTextDescription(path: Pathway): string {
    return path.transitions.map(getTransitionDescription).join("\n")
}

export type TopicId =
    "initial"
    | "education_level"
    | "education_location"
    | "path_list"
    | "single_path_view"


export const wechatReduce: Reducer<WechatChatbotUser> = function(user, input) {
    const newUser = WechatChatbotUser.loadData(clone(user))
    newUser.history.push({
        timestamp: Date.now(),
        speaker: user.id,
        content: input
    })

    if (shouldReset(input)) {
        newUser.initialize()
        return newUser
    }
    switch (user.ui.topic) {
        case "initial": {
            newUser.ui.topic = "education_level"
            return newUser
        }
        case "education_level": {
            if (reverseEducationStageNameTable[input]) {
                newUser.person.education = [{
                    qualityId: "education",
                    stage: reverseEducationStageNameTable[input]
                } as EducationQuality]
                newUser.ui.invalidInput = false
                newUser.ui.topic = "education_location"
                return newUser
            }
            else {
                newUser.ui.invalidInput = true
                return newUser
            }
        }
        case "education_location": {
            const region = data.regions.find(
                (region => text(region.name, "zh_hans") === input)
            )
            const regionId = region ? region.id : "world"

            if (newUser.person.education) {
                newUser.person.education[0].regionId = regionId
            }
            else {
                console.warn("Unexpected answer: ", input)
            }
            newUser.ui.topic = "path_list"
            newUser.ui.suitablePaths = calcSuitablePaths(user.person, data.allTransitions)
            return newUser
        }
        case "path_list":
        case "single_path_view": {
            newUser.ui.suitablePaths = calcSuitablePaths(user.person, data.allTransitions)

            const inputNumber = Number(input)
            if (Number.isNaN(inputNumber) || inputNumber >= newUser.ui.suitablePaths.length) {
                newUser.ui.invalidInput = true
            }
            else {
                newUser.ui.invalidInput = false
                newUser.ui.interestedPath = inputNumber - 1
                newUser.ui.topic = "single_path_view"
            }
            return newUser
        }
    }
}

export const wechatText: Template<WechatChatbotUser> = function(user) {
    let response: string = ""

    if (user.ui.invalidInput) {
        response += `不好意思，没听懂「${user.history[user.history.length - 1].content}」的意思，请再试一次：`
    }

    switch (user.ui.topic) {
        case "initial": {
            response += stripIndents`你好，我是维基迁徙机器人。请回复「开始」开始聊天，我会帮你想想怎么样出去比较好。
                         我们聊天的过程中，您可以随时回复${restartKeywords.join("或")}重新开始。`
            break
        }

        case "education_level": {
            response += "你的最高学历是什么？（本科？硕士？）"
            break
        }

        case "education_location": {
            response += "你的最高学历是在哪个国家或地区读的？"
            break
        }

        case "path_list": {
            const descriptions = user.ui.suitablePaths
                                    .map(getTransitionName)
                                    .map((value, index) => `${index + 1}. ${value}`)
                                    .join("\n")
            response += `你可以申请以下签证哟：\n${descriptions}\n
                         回复序号可以查看详情`
            break
        }

        case "single_path_view": {
            response += stripIndents`
                ${getPathTextDescription(user.ui.suitablePaths[user.ui.interestedPath])}
                回复其他签证序号可以查看详情，也可以回复${restartKeywords.join("或")}重新开始
            `
            break
        }

        default: {
            console.error("Unimplemented exchange", user.ui.topic)
            return ""
        }
    }

    return response
}

export const wechatDialog: Dialogue<WechatChatbotUser> = {
    reduce: wechatReduce,
    text: wechatText,
}

