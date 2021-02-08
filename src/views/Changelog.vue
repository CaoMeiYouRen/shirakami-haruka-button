<script lang="ts">
/* eslint-disable vue/no-v-html */
import { defineComponent } from '@vue/composition-api'
import changelog from '../../CHANGELOG.md'
export default defineComponent({
    name: 'Changelog',
    props: {},
    setup(props, ctx) {
        return {
            changelog,
        }
    },
})
</script>

<template>
    <v-container fluid>
        <v-row
            algin="center"
            justify="center"
        >
            <v-col cols="10">
                <div v-html="changelog" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
</style>
