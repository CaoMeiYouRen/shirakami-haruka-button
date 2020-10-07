<template>
    <v-card
        flat
        rounded="xl"
        class="haruka-card"
    >
        <v-card-title v-if="!disableTitle && title" primary-title>
            {{ title }}
        </v-card-title>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'HarukaCard',
    props: {
        tag: {
            type: String,
        },
        disableTitle: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx){
        return {
        }
    },
    computed: {
        title(): string {
            return this.$t(`tags.${this.tag}`) as string
        },
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.haruka-card {
    box-shadow: 1px 5px 22px rgb(255, 174, 166, 0.6) !important;
}
</style>