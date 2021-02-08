<template>
    <v-card
        flat
        rounded="xl"
        class="haruka-card"
    >
        <v-card-title v-if="title" primary-title>
            {{ title }}
        </v-card-title>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRefs } from '@vue/composition-api'
import i18n from '@/plugins/i18n'

function useCardTitle(tag: Ref<string>, rawTitle?: Ref<string>) {
    const title = computed(() => {
        if (rawTitle?.value) {
            return rawTitle.value
        }
        if (!tag.value) {
            return ''
        }
        return i18n.t(`tags.${tag.value}`)
    })
    return title
}

export default defineComponent({
    name: 'HarukaCard',
    props: {
        tag: {
            type: String,
            default: '',
        },
        rawTitle: {
            type: String,
            default: '',
        },
    },
    setup(props, ctx) {
        const { rawTitle, tag } = toRefs(props)
        const title = useCardTitle(tag, rawTitle)
        return {
            title,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.haruka-card {
    box-shadow: 1px 5px 22px rgb(255, 174, 166, 0.6) !important;
}
</style>
