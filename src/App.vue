<template>
    <div>
        <router-view />
        <!-- <div>{{ height + ' - ' + width }}</div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from '@vue/composition-api'
import { useTitle, useLanguage, useI18n, useOnResize } from 'vue-composable'
export default defineComponent({
    name: 'App',
    setup(props){
        const { language } = useLanguage()
        const locale = ref('zh')
        if (/zh|cn|han/i.test(language.value)){
            locale.value = 'zh'
        } else {
            locale.value = 'en'
        }
        const { height, width } = useOnResize(document.body)
        return {
            locale,
            height,
            width,
        }
    },
    watch: {
        '$i18n.locale' (val) {
            document.title = this.$t('title') as string
        },
    },
    created() {
        this.$i18n.locale = this.locale
        document.title = this.$t('title') as string
    },
})
</script>

<style lang="scss" scoped>
</style>