<template>
    <div>
        <p>Hello Home.vue</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'Home',
    props: {},
    setup(props, ctx){
        return {
        }
    },
})
</script>

<style lang="scss" scoped>
</style>