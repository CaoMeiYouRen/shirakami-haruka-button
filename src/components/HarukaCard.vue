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
import { computed, defineComponent } from '@vue/composition-api'
import i18n from '@/plugins/i18n'

export default defineComponent({
    name: 'HarukaCard',
    props: {
        tag: {
            type: String,
            default: '',
        },
        rawTitle: {
            type: String,
        },
    },
    setup(props, ctx){
        const title = computed(() => {
            if (props.rawTitle){
                return props.rawTitle
            }
            if (!props.tag){
                return ''
            }
            return i18n.t(`tags.${props.tag}`)
        })
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