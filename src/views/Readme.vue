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
                <div v-highlight v-html="readme" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import readme from '../../README.md'
export default defineComponent({
    name: 'Readme',
    props: {},
    setup(props, ctx){
        return {
            readme,
        }
    },
})
</script>

<style lang="scss" scoped>
</style>