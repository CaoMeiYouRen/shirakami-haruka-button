<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card flat class="text-center">
                    <v-card-text>
                        <h2>关于</h2>
                        <br>
                        <h3>
                            本网站由 草梅友仁(
                            <v-icon size="24">
                                iconfont icon-github
                            </v-icon>
                            <a target="_blank" href="https://github.com/CaoMeiYouRen">
                                github
                            </a>、
                            <v-icon size="24" color="#00a1d6">
                                iconfont icon-bilibili2
                            </v-icon>
                            <a target="_blank" href="https://space.bilibili.com/10822025">
                                bilibili
                            </a>
                            ) 开发并提供技术支持
                        </h3>
                    </v-card-text>
                    <v-card-text>
                        <h2>更新日志</h2>
                        <br>
                        <h3>
                            见 <v-icon size="24">
                                iconfont icon-github
                            </v-icon>
                            <a target="_blank" href="https://github.com/CaoMeiYouRen/shirakami-haruka-button/blob/master/CHANGELOG.md">Github CHANGELOG</a>
                        </h3>
                    </v-card-text>
                    <v-card-text>
                        <h2>使用技术</h2>
                        <br>
                        <div v-for="item in useList" :key="item.url">
                            <h3>
                                {{ item.msg }}，官网：
                                <a :href="item.url" target="_blank">{{ item.url }}</a>
                            </h3>
                        </div>
                    </v-card-text>
                    <v-card-text>
                        <h2>参考项目</h2>
                        <br>
                        <div v-for="item in referList" :key="item.url">
                            <h3>
                                {{ item.msg }}，地址：
                                <a :href="item.url" target="_blank">{{ item.url }}</a>
                            </h3>
                        </div>
                    </v-card-text>
                    <v-card-text>
                        <h2>友情链接</h2>
                        <br>
                        <div v-for="item in friendshipLinks" :key="item.url">
                            <h3>
                                {{ item.msg }}，地址：
                                <a :href="item.url" target="_blank">{{ item.url }}</a>
                            </h3>
                        </div>
                    </v-card-text>
                    <v-btn color="primary" @click="$router.push('/')">
                        返回首页
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { dependencies, devDependencies } from '../../package.json'
import { defineComponent } from '@vue/composition-api'
function verFormat(ver: string) {
    const list = ver.split('.')
    for (let i = 0; i < list.length; i++) {
        list[i] = list[i].replace('^', '').replace('~', '')
    }
    return list.join('.')
}
Object.keys(dependencies).forEach(e => {
    const d = dependencies[e]
    if (!d.includes('git+')) {
        dependencies[e] = verFormat(d)
    }
})

Object.keys(devDependencies).forEach(e => {
    const d = devDependencies[e]
    if (!d.includes('git+')) {
        devDependencies[e] = verFormat(d)
    }
})
export default defineComponent({
    name: 'About',
    props: {},
    setup(props, ctx){
        return {
            useList: [
                {
                    msg: `框架：Vue (${dependencies['vue']})`,
                    url: 'https://cn.vuejs.org/',
                },
                {
                    msg: `脚手架：Vue Cli (${devDependencies['@vue/cli-service']})`,
                    url: 'https://cli.vuejs.org/zh/',
                },
                {
                    msg: `UI：Vuetify (${dependencies['vuetify']})`,
                    url: 'https://vuetifyjs.com/zh-Hans/',
                },
                {
                    msg: `组合式API：vue-composable (${dependencies['vue-composable']})`,
                    url: 'https://pikax.me/vue-composable/',
                },
                {
                    msg: `国际化：vue-i18n (${dependencies['vue-i18n']})`,
                    url: 'https://kazupon.github.io/vue-i18n/zh/',
                },
                {
                    msg: `语言：TypeScript (${devDependencies['typescript']})`,
                    url: 'https://www.typescriptlang.org/',
                },
                {
                    msg: `工具库：Lodash (${dependencies['lodash']})`,
                    url: 'https://www.lodashjs.com/',
                },
                {
                    msg: '图标：阿里巴巴矢量图标库',
                    url: 'https://www.iconfont.cn/',
                },
                {
                    msg: 'CDN服务：jsdelivr',
                    url: 'https://www.jsdelivr.com/',
                },
            ],
            referList: [
                {
                    msg: 'Peko按钮',
                    url: 'https://peko.top/',
                },
                {
                    msg: '狐按钮(^・ω・^§)ﾉ',
                    url: 'https://fubuki.moe/',
                },
            ],
            friendshipLinks: [
                {
                    msg: 'VTuberの音声ボタンコレクション',
                    url: 'https://vtbbtn.org/',
                },
            ],
        }
    },
})
</script>

<style lang="scss" scoped>
</style>