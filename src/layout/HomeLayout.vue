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
            <v-toolbar-title class="mr-5 align-center">
                <span class="title">{{ title }}</span>
            </v-toolbar-title>
            <v-spacer />
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
                    <v-list-item @click="switchLang('zh')">
                        <v-list-item-title>简体中文</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="switchLang('en')">
                        <v-list-item-title>English</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="switchLang('ja')">
                        <v-list-item-title>日本語</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <!-- 主体 -->
        <v-main>
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
import { defineComponent, onMounted, onUnmounted, ref, computed, watch } from '@vue/composition-api'
import { useTitle, useLanguage, useI18n, useOnScroll, useOnResize } from 'vue-composable'
export default defineComponent({
    name: 'HomeLayout',
    props: {},
    setup(){
        function getWindowHeight() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
        const { scrollTop, remove } = useOnScroll()
        const height = ref(getWindowHeight())
        window.onresize = () => {
            height.value = getWindowHeight()
        }
        const isShowBackTop = computed(() => scrollTop.value >= height.value / 3)

        onUnmounted(() => {
            remove()
            window.onresize = null
        })
        return {
            title: useTitle(),
            scrollTop,
            height,
            isShowBackTop,
        }
    },
    data() {
        return {
            drawer: null,
        }
    },
    computed: {
        menuList(): any[] {
            return [
                {
                    icon: 'home',
                    name: this.$t('menu.Home'),
                    path: '/',
                },
                {
                    icon: 'iconfont icon-bilibili2',
                    name: this.$t('menu.Bilibili'),
                    fun(){
                        window.open('https://space.bilibili.com/477332594/')
                    },
                },
                {
                    icon: 'code',
                    name: this.$t('menu.About'),
                    path: '/about',
                },
            ]
        },
    },
    methods: {
        switchLang(locale){
            this.$i18n.locale = locale
        },
        backTop(){
            this.$vuetify.goTo(0, {
                duration: 500,
            })
        },
    },
})
</script>

<style lang="scss" scoped>
.haruka-app-bar-boxshadow {
    box-shadow: 0px 1px 5px #ffaea6 !important;
}
</style>