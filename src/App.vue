<template>
    <div>
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { useLanguage } from 'vue-composable'
import i18n from '@/plugins/i18n'

function initLanguage() {
    const { language } = useLanguage()
    const locale = ref('zh')
    if (/zh|cn|han/i.test(language.value)){
        locale.value = 'zh'
    } else if (/ja/i.test(language.value)){
        locale.value = 'ja'
    } else {
        locale.value = 'en'
    }
    i18n.locale = locale.value
}

export default defineComponent({
    name: 'App',
    setup(props, ctx){
        initLanguage()
        watchEffect(() => {
            document.title = i18n.t('title') as string
        })
        return {
        }
    },
})
</script>

<style lang="scss" scoped>
</style>