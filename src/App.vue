<template>
    <div>
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from '@vue/composition-api'
import { useTitle, useLanguage, useI18n } from 'vue-composable'
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
        return {
            locale,
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