<template>
    <a
        :href="href"
        rel="noopener noreferrer"
        :target="target"
    >
        <slot />
    </a>
</template>

<script lang="ts">
// 通过设置 rel="noopener noreferrer" 来保证打开新页面的安全
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'SafeLink',
    props: {
        href: {
            type: String,
        },
        target: {
            type: String,
            default: '_blank',
        },
    },
})
</script>

<style lang="scss" scoped>
</style>
