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
import Vue from 'vue'
import Vuetify from 'vuetify'
import { defineComponent } from '@vue/composition-api'
import _ from 'lodash'
import VueI18n from 'vue-i18n'
import { VERSION as VueComposableVersion } from 'vue-composable'

export default defineComponent({
    name: 'About',
    props: {},
    setup(props, ctx){
        return {
            useList: [
                {
                    msg: `框架：Vue (${Vue.version})`,
                    url: 'https://cn.vuejs.org/',
                },
                {
                    msg: '脚手架：Vue Cli',
                    url: 'https://cli.vuejs.org/zh/',
                },
                {
                    msg: `UI：Vuetify (${Vuetify.version})`,
                    url: 'https://vuetifyjs.com/zh-Hans/',
                },
                {
                    msg: `组合式API：vue-composable (${VueComposableVersion})`,
                    url: 'https://pikax.me/vue-composable/',
                },
                {
                    msg: `国际化：vue-i18n (${VueI18n.version})`,
                    url: 'https://kazupon.github.io/vue-i18n/zh/',
                },
                {
                    msg: '语言：TypeScript',
                    url: 'https://www.typescriptlang.org/',
                },
                {
                    msg: `工具库：Lodash (${_.VERSION})`,
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