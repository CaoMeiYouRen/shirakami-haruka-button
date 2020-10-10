interface VoiceInfo {
    /**
     * 标题翻译
     */
    messages: {
        zh: string
        en?: string
        ja?: string
    }
    /**
     * 音声路径。相对于 public/voices 的路径
     */
    path: string
    /**
     * 分类标签，i18n 路径。
     * 会根据这个 tag 进行分类。
     * tag 的翻译在 locales 文件夹下 zh/en/ja 文件中的 tags 字段中设置
     */
    tag: string
}
const voices: VoiceInfo[] = [
    {
        messages: {
            zh: '阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
            en: 'aba aba aba aba aba aba aba aba',
            ja: 'アルバアバアバアバアバアバアバア',
        },
        path: '阿巴阿巴阿巴阿巴阿巴阿巴阿巴.mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴(超长)',
            en: 'aba aba aba aba aba aba aba aba aba aba aba (long)',
            ja: 'アルバアバアバアバアバアバアバアアルバアバアバア(超長)',
        },
        path: '阿巴阿巴阿巴阿巴阿巴阿巴(超长).mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '防空警豹',
            en: '',
        },
        path: '防空警豹.mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '豹叫',
            en: '',
        },
        path: '豹叫.mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '豹式呼吸',
            en: '',
        },
        path: '豹式呼吸.mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '我是个锤子gamer',
            en: '',
        },
        path: '我是个锤子gamer.mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '我一个巴掌呼死你',
            en: '',
        },
        path: '我一个巴掌呼死你.mp3',
        tag: 'Tone',
    },
    {
        messages: {
            zh: '八嘎 hentai 无路赛',
            en: '',
            ja: 'バカ 変態 うるさい',
        },
        path: '八嘎hentai无路赛.mp3',
        tag: 'ShakeM',
    },
    {
        messages: {
            zh: '八嘎 hentai 无路赛2',
            en: '',
            ja: 'バカ 変態 うるさい2',
        },
        path: '八嘎hentai无路赛2.mp3',
        tag: 'ShakeM',
    },
    {
        messages: {
            zh: '变恋！一群变恋！',
            en: '',
            ja: '',
        },
        path: '变恋！一群变恋！.mp3',
        tag: 'ShakeM',
    },
    {
        messages: {
            zh: '我爱你(日语)',
            en: 'I love you (Japanese)',
            ja: '爱してる(日本語)',
        },
        path: '阿姨洗铁路.mp3',
        tag: 'Peach',
    },
    {
        messages: {
            zh: '我爱你(英文)',
            en: 'I love you(English)',
            ja: '爱してる(英語)',
        },
        path: 'I love you.mp3',
        tag: 'Peach',
    },
    {
        messages: {
            zh: '我爱你(中文)',
            en: 'I love you (Chinese)',
            ja: '爱してる(中国語)',
        },
        path: '我爱你.mp3',
        tag: 'Peach',
    },
    {
        messages: {
            zh: '不可以摸肚皮',
            en: '',
        },
        path: '不可以摸肚皮.mp3',
        tag: 'Belly',
    },
    {
        messages: {
            zh: '只准摸一下哦！',
            en: '',
        },
        path: '只准摸一下哦！.mp3',
        tag: 'Belly',
    },
    {
        messages: {
            zh: '这个板子就跟晓音姐的胸一样，还是滑的！',
            en: '',
        },
        path: '这个板子就跟晓音姐的胸一样，还是滑的.mp3',
        tag: 'Death',
    },
    {
        messages: {
            zh: '我就是喜欢看你这副嫉护我的表情',
            en: '',
        },
        path: '我就是喜欢看你这副嫉护我的表情.mp3',
        tag: 'Death',
    },
    {
        messages: {
            zh: '芜湖，起飞',
            en: 'Wuhu, take off',
        },
        path: '芜湖，起飞.mp3',
        tag: 'Tone',
    },

]
export default voices