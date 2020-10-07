interface VoiceInfo {
    /**
     * 标题翻译
     */
    messages: {
        zh: string
        en?: string
    }
    /**
     * 音声路径。相对于 public/voices 的路径
     */
    path: string
    /**
     * 分类标签，i18n 路径
     */
    tag: string
}
const voices: VoiceInfo[] = [
    {
        messages: {
            zh: '阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
            en: 'aba aba aba aba aba aba aba aba aba',
        },
        path: '阿巴阿巴阿巴.mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '我爱你(日语)',
            en: 'I love you (Japanese)',
        },
        path: '阿姨洗铁路.mp3',
        tag: 'Peach',
    },
    {
        messages: {
            zh: '我爱你(英文)',
            en: 'I love you(English)',
        },
        path: 'I love you.mp3',
        tag: 'Peach',
    },
    {
        messages: {
            zh: '我爱你(中文)',
            en: 'I love you (Chinese)',
        },
        path: '我爱你.mp3',
        tag: 'Peach',
    },
    {
        messages: {
            zh: '芜湖，起飞',
            en: 'Wuhu, take off',
        },
        path: '芜湖，起飞.mp3',
        tag: 'Other',
    },
]
export default voices