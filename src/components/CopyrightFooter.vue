<template>
    <v-footer
        padless
        app
        inset
        absolute
        class="app-footer"
    >
        <v-card
            class="card flex text-center"
            flat
            tile
        >
            <v-card-text>
                <p title="About">
                    <a @click.prevent="$router.push('/about')">
                        Copyright &copy;2020 - {{ new Date().getFullYear() }}
                        <strong>CaoMeiYouRen</strong> All Rights Rese.
                    </a>
                </p>
                <p>
                    <a target="_blank" href="https://github.com/CaoMeiYouRen/shirakami-haruka-button">
                        <v-icon color="primary">iconfont icon-github</v-icon>
                        {{ $t('ProjectAddress') }}
                    </a>
                </p>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    name: 'CopyrightFooter',
    props: {},
    setup(props, ctx){
        return {
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

a {
    font-family: "微软雅黑";
}

.p-white,
a {
    color: $haruka-primary !important;
    text-decoration: none;
}

a:hover {
    color: #039be5 !important;
}

.app-footer {
    .card {
        background-color: #424242 !important;
    }
}
</style>