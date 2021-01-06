<template>
    <div class="Home">
        <!-- 侧边栏 -->
        <v-navigation-drawer
            v-model="drawer"
            fixed
            app
            disable-resize-watcher
            must-sort
        >
            <v-list dense>
                <div v-for="(item,index) in menuList" :key="item.name">
                    <v-list-item @click="item.fun? item.fun() : $router.push(item.path)">
                        <v-list-item-action>
                            <v-icon :color="item.color || 'primary'">
                                {{ item.icon }}
                            </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider v-if="index<menuList.length-1" />
                </div>
            </v-list>
        </v-navigation-drawer>
        <!-- 顶部导航栏 -->
        <v-app-bar
            app
            color="primary"
            dense
            dark
            flat
            class="haruka-app-bar-boxshadow"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title class="align-center mr-5">
                <span class="title">{{ title }}</span>
            </v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
                <template #activator="{on: tooltip}">
                    <v-btn
                        icon
                        class="white--text"
                        href="https://github.com/CaoMeiYouRen/shirakami-haruka-button"
                        target="_blank"
                        v-on="{...tooltip}"
                    >
                        <v-icon size="28">
                            iconfont icon-github2
                        </v-icon>
                    </v-btn>
                </template>
                <span>{{ $t('ProjectAddress') }}</span>
            </v-tooltip>
            <v-menu offset-y>
                <template #activator="{on: menu}">
                    <v-tooltip bottom>
                        <template #activator="{on: tooltip}">
                            <v-btn
                                icon
                                class="white--text"
                                v-on="{...tooltip, ...menu}"
                            >
                                <v-icon>translate</v-icon>
                            </v-btn>
                        </template>
                        <span>{{ $t('appBar.SwitchLanguage') }}</span>
                    </v-tooltip>
                </template>
                <v-list>
                    <v-list-item
                        v-for="item in langList"
                        :key="item.lang"
                        @click="switchLang(item.lang)"
                    >
                        <v-list-item-title>{{ item.label }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <!-- 主体 -->
        <v-main class="main">
            <transition
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
                :duration="{enter: 500,leave: 500}"
                mode="out-in"
            >
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>
            <v-tooltip top>
                <template #activator="{on}">
                    <v-fab-transition>
                        <v-btn
                            v-show="isShowBackTop"
                            color="primary"
                            dark
                            fixed
                            bottom
                            right
                            fab
                            v-on="on"
                            @click="backTop"
                        >
                            <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                    </v-fab-transition>
                </template>
                <span>{{ $t('BackToTop') }}</span>
            </v-tooltip>
        </v-main>
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, computed, watch, watchEffect, ref } from '@vue/composition-api'
import { useTitle, useOnScroll } from 'vue-composable'
import { useOnWindowResize } from '@/composable'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import { messages } from '@/locales'
import { BASE_URL } from '@/config/env'

/**
 * 切换语言
*/
function switchLang(locale: string){
    i18n.locale = locale
}

const langList: {lang: string, label: string}[] = Object.keys(messages).map((e) => ({
    lang: e,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    label: messages[e].langName,
}))

const menuList = computed(() => [
    {
        icon: 'home',
        name: i18n.t('menu.Home'),
        path: '/',
    },
    {
        icon: 'iconfont icon-bilibili2',
        name: i18n.t('menu.Bilibili'),
        fun(){
            window.open('https://space.bilibili.com/477332594/')
        },
    },
    {
        icon: 'iconfont icon-changelog-clock',
        name: i18n.t('menu.Changelog'),
        path: '/changelog',
    },
    {
        icon: 'code',
        name: i18n.t('menu.About'),
        path: '/about',
    },
    {
        icon: 'mdi-download',
        name: i18n.t('menu.Download'),
        fun(){
            let url = ''
            const localZipPath = `${BASE_URL}voices.zip`
            if (process.env.NODE_ENV === 'production') {
                url = `https://cdn.jsdelivr.net/gh/CaoMeiYouRen/shirakami-haruka-button@latest/public${localZipPath}`
            } else {
                url = localZipPath
            }
            window.open(url)
        },
    },
])

function backTop() {
    vuetify.framework.goTo(0, {
        duration: 500,
    })
}

export default defineComponent({
    name: 'HomeLayout',
    props: {},
    setup(){
        const title = useTitle()
        const { scrollTop, remove } = useOnScroll()
        const { height } = useOnWindowResize()
        const isShowBackTop = computed(() => scrollTop.value >= (height.value / 3 || 300))
        onUnmounted(() => {
            remove()
        })
        return {
            title,
            isShowBackTop,
            drawer: null,
            switchLang,
            langList,
            menuList,
            backTop,
            scrollTop,
        }
    },
    watch: {
        $route(){
            if (this.scrollTop > 50){
                this.backTop()
            }
        },
    },
})
</script>

<style lang="scss" scoped>
.haruka-app-bar-boxshadow {
    box-shadow: 0px 1px 5px #ffaea6 !important;
}

.main {
    margin-bottom: 20px;
}
</style>