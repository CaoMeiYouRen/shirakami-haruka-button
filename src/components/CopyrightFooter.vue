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
                        <strong>{{ COPYRIGHT }}</strong> All Rights Rese.
                    </a>
                </p>
                <p v-if="ICP || POLICE">
                    <template v-if="ICP">
                        <a href="http://www.beian.miit.gov.cn/" target="_blank">{{ ICP }}</a> ||
                    </template>
                    <a
                        v-if="POLICE"
                        href="http://www.beian.gov.cn/"
                        target="_blank"
                    >{{ POLICE }}</a>
                </p>
                <p>
                    <a target="_blank" :href="GITHUB_LINK">
                        <v-icon color="primary">iconfont icon-github2</v-icon>
                        {{ $t('ProjectAddress') }}
                    </a>
                </p>
                <p class="github-info">
                    <a target="_blank" :href="GITHUB_LINK">
                        <img
                            v-for="e in githubs"
                            :key="e.src"
                            :alt="e.alt"
                            :src="e.src"
                        >
                    </a>
                </p>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { POLICE, ICP, COPYRIGHT, REPOSITORIE_NAME, GITHUB_LINK } from '@/config/env'
export default defineComponent({
    name: 'CopyrightFooter',
    props: {},
    setup(props, ctx) {
        return {
            POLICE,
            ICP,
            COPYRIGHT,
            REPOSITORIE_NAME,
            GITHUB_LINK,
            githubs: [
                {
                    alt: 'GitHub package.json version',
                    src: `https://img.shields.io/github/package-json/v/${REPOSITORIE_NAME}?color=ffaea6`,
                },
                {
                    alt: 'GitHub watchers',
                    src: `https://img.shields.io/github/watchers/${REPOSITORIE_NAME}?style=social`,
                },
                {
                    alt: 'GitHub Repo stars',
                    src: `https://img.shields.io/github/stars/${REPOSITORIE_NAME}?style=social`,
                },
                {
                    alt: 'GitHub forks',
                    src: `https://img.shields.io/github/forks/${REPOSITORIE_NAME}?style=social`,
                },
            ],
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.app-footer {
    a,
    p {
        color: $primary-color !important;
        font-family: '微软雅黑';
        text-decoration: none;
    }

    a:hover {
        color: #039be5 !important;
    }

    .card {
        background-color: #424242 !important;
    }

    .github-info {
        margin: 0;

        a {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            margin: 0px auto;

            img {
                display: block;
                margin: 7px;
            }
        }
    }
}
</style>
