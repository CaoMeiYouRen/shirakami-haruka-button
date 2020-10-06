<template>
    <v-app>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            :duration="{enter: 500, leave: 500}"
            mode="out-in"
        >
            <keep-alive :exclude="/^err/g">
                <!-- 排除404等页面的缓存，以err开头的组件都不会被保留-->
                <router-view />
            </keep-alive>
        </transition>
        <CopyrightFooter />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'Layout',
})
</script>

<style lang="scss" scoped>
</style>