<script lang="ts">
/* eslint-disable vue/no-v-html */
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

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
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

<style lang="scss" scoped>
</style>