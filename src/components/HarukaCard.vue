<template>
    <v-card>
        <v-card-title v-if="title" primary-title>
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
</style>