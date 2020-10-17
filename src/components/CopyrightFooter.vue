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
                    <a href="http://www.beian.miit.gov.cn/" target="_blank">{{ ICP }}</a> ||
                    <a href="http://www.beian.gov.cn/" target="_blank">{{ POLICE }}</a>
                </p>
                <p>
                    <a target="_blank" href="https://github.com/CaoMeiYouRen/shirakami-haruka-button">
                        <v-icon color="primary">iconfont icon-github</v-icon>
                        {{ $t('ProjectAddress') }}
                    </a>
                </p>
                <p class="github-info">
                    <a target="_blank" href="https://github.com/CaoMeiYouRen/shirakami-haruka-button">
                        <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/CaoMeiYouRen/shirakami-haruka-button?style=social">
                        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/CaoMeiYouRen/shirakami-haruka-button?style=social">
                        <img alt="GitHub forks" src="https://img.shields.io/github/forks/CaoMeiYouRen/shirakami-haruka-button?style=social">
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
            POLICE: process.env.VUE_APP_POLICE,
            ICP: process.env.VUE_APP_ICP,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.app-footer {
    a,
    p {
        color: $haruka-primary !important;
        font-family: "微软雅黑";
        text-decoration: none;
    }

    a:hover {
        color: #039be5 !important;
    }

    .card {
        background-color: #424242 !important;
    }

    .github-info {
        a {
            display: flex;
            justify-content: center;
            width: 300px;
            margin: 0px auto;

            img {
                display: block;
                margin: 0 7px;
            }
        }
    }
}
</style>