<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card
                    flat
                    class="text-center"
                >
                    <v-card-text>
                        <h1>关于</h1>
                        <br>
                        <h3>
                            本网站由 {{ AUTHOR }}(
                            <v-icon
                                size="24"
                                color="#000"
                            >
                                iconfont icon-github2
                            </v-icon>
                            <a
                                target="_blank"
                                :href="'https://github.com/' + GITHUB_NAME"
                            >
                                github
                            </a>
                            <template v-if="AUTHOR_BILI_UID">
                                、
                                <v-icon
                                    size="24"
                                    color="#00a1d6"
                                >
                                    iconfont icon-bilibili2
                                </v-icon>
                                <a
                                    target="_blank"
                                    :href="'https://space.bilibili.com/' + AUTHOR_BILI_UID"
                                >
                                    bilibili
                                </a>
                                )
                            </template>
                            开发并提供技术支持
                        </h3>
                    </v-card-text>
                    <v-card-text>
                        <h2>使用技术</h2>
                        <br>
                        <div
                            v-for="item in useList"
                            :key="item.url"
                        >
                            <h3>
                                {{ item.msg }}，官网：
                                <a
                                    :href="item.url"
                                    target="_blank"
                                >{{ item.url }}</a>
                            </h3>
                        </div>
                    </v-card-text>
                    <v-card-text>
                        <h2>参考项目</h2>
                        <br>
                        <div
                            v-for="item in referList"
                            :key="item.url"
                        >
                            <h3>
                                {{ item.msg }}，地址：
                                <a
                                    :href="item.url"
                                    target="_blank"
                                >{{ item.url }}</a>
                            </h3>
                        </div>
                    </v-card-text>
                    <v-card-text>
                        <h2>友情链接</h2>
                        <br>
                        <div
                            v-for="item in friendshipLinks"
                            :key="item.url"
                        >
                            <h3>
                                {{ item.msg }}，地址：
                                <a
                                    :href="item.url"
                                    target="_blank"
                                >{{ item.url }}</a>
                            </h3>
                        </div>
                    </v-card-text>
                    <v-btn
                        color="primary"
                        @click="$router.push('/')"
                    >
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
import { friendshipLinks } from '@/config/links'
import { AUTHOR, AUTHOR_BILI_UID, GITHUB_NAME } from '@/config/env'
const dep = Object.assign({}, dependencies, devDependencies)
function verFormat(ver: string): string {
    const list = ver.split('.')
    for (let i = 0; i < list.length; i++) {
        list[i] = list[i].replace('^', '').replace('~', '')
    }
    return list.join('.')
}
Object.keys(dep).forEach((e) => {
    const d = dep[e]
    if (!d.includes('git+')) {
        dep[e] = verFormat(d)
    }
})

export default defineComponent({
    name: 'About',
    props: {},
    setup() {
        return {
            AUTHOR,
            AUTHOR_BILI_UID,
            GITHUB_NAME,
            useList: [
                {
                    msg: `框架：Vue (${dep['vue']})`,
                    url: 'https://cn.vuejs.org/',
                },
                {
                    msg: `脚手架：Vue Cli (${dep['@vue/cli-service']})`,
                    url: 'https://cli.vuejs.org/zh/',
                },
                {
                    msg: `UI：Vuetify (${dep['vuetify']})`,
                    url: 'https://vuetifyjs.com/zh-Hans/',
                },
                {
                    msg: `组合式API：@vue/composition-api (${dep['@vue/composition-api']})`,
                    url: 'https://github.com/vuejs/composition-api',
                },
                {
                    msg: `组合式API工具集：vue-composable (${dep['vue-composable']})`,
                    url: 'https://pikax.me/vue-composable/',
                },
                {
                    msg: `国际化：vue-i18n (${dep['vue-i18n']})`,
                    url: 'https://kazupon.github.io/vue-i18n/zh/',
                },
                {
                    msg: `语言：TypeScript (${dep['typescript']})`,
                    url: 'https://www.typescriptlang.org/',
                },
                {
                    msg: `工具库：Lodash (${dep['lodash']})`,
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
                {
                    msg: 'Rss服务：RSSHub',
                    url: 'https://docs.rsshub.app/',
                },
            ],
            referList: [
                {
                    msg: 'Peko按钮',
                    url: 'https://github.com/voosc/new-pekobutton',
                },
                {
                    msg: '狐按钮(^・ω・^§)ﾉ',
                    url: 'https://github.com/lonelyion/fubuki-button',
                },
            ],
            friendshipLinks,
        }
    },
})
</script>

<style lang="scss" scoped>
</style>
