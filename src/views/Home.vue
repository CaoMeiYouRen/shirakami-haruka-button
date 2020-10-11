<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <HarukaCard disable-title>
                    <v-row algin="start" justify="start">
                        <v-col
                            cols="12"
                            sm="4"
                            md="3"
                            lg="2"
                        >
                            <v-img
                                class="rounded-lg"
                                :src="baobao"
                                width="220px"
                                contain
                            />
                        </v-col>
                        <v-col
                            cols="12"
                            sm="8"
                            md="9"
                            lg="10"
                            class="subtitle-1"
                        >
                            欢迎来到 “豹按钮(:3っ)∋” 项目，这是一个从
                            <a target="_blank" href="https://vtbbtn.org/">https://vtbbtn.org/</a>
                            获得灵感的项目。感觉很有意思，不过目前只是立个项，什么时候写完看心情，也许会弃坑。<br>
                            诚邀日语、英语翻译，本人日语、英语本当锤子，全靠机翻；诚邀剪辑man，一个人实在剪辑不过来<br>
                            <b>新增音声</b>：如果会编程的可以直接上
                            <a target="_blank" href="https://github.com/CaoMeiYouRen/shirakami-haruka-button">GitHub</a>
                            fork，修改完后提 pull request ，不会编程的可以提个 issue<br>
                            更多内容请参考 <a href="https://github.com/CaoMeiYouRen/shirakami-haruka-button#readme" target="_blank">README</a><br>
                            <b>使用指南</b>：点击按钮即可播放对应音声；多次点击可以造成相当鬼畜的效果
                        </v-col>
                    </v-row>
                </HarukaCard>
            </v-col>
        </v-row>
        <v-row algin="start" justify="start">
            <v-col
                v-for="(item,tag) in voicesGroup"
                :key="tag"
                cols="12"
            >
                <HarukaCard
                    :tag="tag"
                >
                    <HarukaButton
                        v-for="(e,j) in item"
                        :key="j"
                        :path="e.path"
                        :messages="e.messages"
                    />
                </HarukaCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import _ from 'lodash'
import baobao from '@/assets/shabao.jpg'
import voices from '@/config/voices'

export default defineComponent({
    name: 'Home',
    props: {},
    setup(props, ctx){
        return {
            baobao,
            voicesGroup: _.groupBy(voices, 'tag'),
        }
    },
})
</script>

<style lang="scss" scoped>
</style>