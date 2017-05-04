import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

interface Exchange {
    question: MultiLangStringSet
}

interface Dialogue {
    exchanges: Exchange[]
}

const wechatDialogue: Dialogue = {
    exchanges: [
        {
            question: {
                zh_hans: "年龄多大了？"
            }
        }
    ]
}
