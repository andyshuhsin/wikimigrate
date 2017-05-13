import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {clone} from "../../fe/utils/clone"
import {Person} from "../../definitions/Person"
import {
    EducationQuality,
    EducationStage,
    educationStageProfiles,
} from "../../definitions/Qualities/EducationExperience"
import {text} from "../../fe/utils/text"
import {data} from "../../data/index"
import {RegionId} from "../../definitions/auxillary/Region"
import {WechatChatbotUser} from "../middlewares/wechat"
import {Path} from "../../fe/utils/definitions"
import {calcSuitability, calcSuitablePaths} from "../../fe/utils/calcSuitablePaths"

interface Exchange {
    text: MultiLangStringSet
    getNewPersonDescription(person: Person, answer: string): Person
}

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

function getTransitionName(path: Path): string {
    return path.transitions.map(transition => {
        const region = data.getRegionById(transition.regionId)
        return text(region && region.name) + text(transition.name)
    })
        .join('\n')
}

export type TopicId =
    "initial"
    | "education-level"
    | "education-duration"
    | "finish"


export const wechatReduce: Reducer<WechatChatbotUser> = function(user, input) {
    const newUser = WechatChatbotUser.loadData(user)
    if (shouldReset(input)) {
        newUser.initialize()
        return newUser
    }
    switch (user.topic) {
        case "initial": {
            newUser.topic = "education-level"
            return newUser
        }
        case "education-level": {
            newUser.person.education = [{
                qualityId: "education",
                stage: reverseEducationStageNameTable[input]
            } as EducationQuality]
            newUser.topic = "education-duration"
            return newUser
        }
        case "education-duration": {
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
            newUser.topic = "finish"
            return newUser
        }
        case "finish": {
            return newUser
        }
    }
}

export const wechatText: Template<WechatChatbotUser> = function(user) {
    switch (user.topic) {
        case "initial": {
            return "你好，我是维基迁徙机器人。请回复「开始」开始聊天，我会帮你想想怎么样出去比较好。"
        }

        case "education-level": {
            return "您最高学历是什么？（本科？硕士？）"
        }

        case "education-duration": {
            return "在哪个国家或地区读的？"
        }

        case "finish": {
            const allTransitions = data.allTransitions
            const suitablePaths = calcSuitablePaths(user.person, allTransitions)
            const descriptions = suitablePaths.map(getTransitionName).join('\n')
            return `你可以申请以下签证哟：\n${descriptions}`
        }

        default: {
            console.error("Unimplemented exchange", user.topic)
            return ""
        }
    }
}

export const wechatDialog: Dialogue<WechatChatbotUser> = {
    reduce: wechatReduce,
    text: wechatText,
}

