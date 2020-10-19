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
                            获得灵感的项目，感觉很有意思。<br>
                            诚邀日语、英语翻译，本人日语、英语本当锤子，全靠机翻；诚邀剪辑man，一个人实在剪辑不过来<br>
                            <b>新增音声</b>：如果会编程的可以直接上
                            <a target="_blank" href="https://github.com/CaoMeiYouRen/shirakami-haruka-button">GitHub</a>
                            fork，修改完后提 pull request ，不会编程的可以提个 issue<br>
                            更多内容请参考 <a href="https://github.com/CaoMeiYouRen/shirakami-haruka-button#readme" target="_blank">README</a><br>
                            <b>使用指南</b>：点击按钮即可播放对应音声；多次点击可以造成相当鬼畜的效果<br>
                            <b>声明</b>：本项目仅为 DD 作品，和 白神遥Haruka、P-SP 官方没有关联
                        </v-col>
                    </v-row>
                </HarukaCard>
            </v-col>
        </v-row>
        <v-row
            algin="start"
            justify="start"
            :class="{'fixed': fixed}"
        >
            <v-col
                cols="12"
            >
                <HarukaCard
                    class="control"
                    :raw-title="$t('play.PlaybackControl')"
                >
                    <v-icon class="pin" @click="fixed = !fixed">
                        {{ fixed ? 'mdi-pin' : 'mdi-pin-off' }}
                    </v-icon>
                    <span class="haruka-button">
                        <v-btn
                            color="primary"
                            rounded
                            @click="startLoop"
                        >
                            <v-icon>play_arrow</v-icon>{{ $t('play.LoopPlayback') }}
                        </v-btn>
                    </span>
                    <span class="haruka-button">
                        <v-btn
                            color="primary"
                            rounded
                            @click="stopLoop"
                        >
                            <v-icon>stop</v-icon>{{ $t('play.StopPlay') }}
                        </v-btn>
                    </span>
                    <span class="haruka-button">
                        <v-btn
                            :color="isLoop ? 'primary' : '#fff'"
                            rounded
                            @click="isLoop = !isLoop"
                        >
                            <v-icon>mdi-restore</v-icon>{{ isLoop ? $t('play.LoopOn') : $t('play.LoopOff') }}
                        </v-btn>
                    </span>
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
                        ref="voiceButton"
                        v-model="e.isPlay"
                        :path="e.path"
                        :messages="e.messages"
                    />
                </HarukaCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, provide, Ref } from '@vue/composition-api'
import _ from 'lodash'
import baobao from '@/assets/shabao.jpg'
import voices, { VoiceInfo } from '@/config/voices'

export default defineComponent({
    name: 'Home',
    props: {},
    setup(props, ctx){
        const playList: Ref<Set<HTMLAudioElement>> = ref(new Set)
        provide('playList', playList)
        const isLoop = ref(false)
        provide('isLoop', isLoop)
        const voiceButton = ref()
        const _voices = ref(voices.map(e => {
            e.isPlay = false
            return e
        }))
        const voicesGroup = computed(() => _.groupBy(_voices.value, 'tag'))
        const currentVoiceIndex = ref(0)
        const currentVoice = computed(() => _voices.value[currentVoiceIndex.value])
        let stop: any = null
        function startLoop() {
            currentVoice.value.isPlay = true
            if (!stop){
                stop = watch(currentVoice, (val, newVal, onInvalidate) => {
                    if (!val.isPlay){
                        currentVoiceIndex.value += 1
                        currentVoiceIndex.value %= _voices.value.length
                        currentVoice.value.isPlay = true
                    }
                }, {
                    deep: true,
                })
            }
        }
        function stopLoop() {
            if (stop){
                stop()
                stop = null
            }
            currentVoice.value.isPlay = false
            currentVoiceIndex.value = 0
            playList.value.forEach(i => {
                i.pause()
                playList.value.delete(i)
            })
            for (const i in voiceButton.value) {
                voiceButton.value[i].playList = []
            }
        }

        /**
         * 是否固定播放面板
         */
        const fixed = ref(false)

        return {
            voiceButton,
            isLoop,
            baobao,
            voicesGroup,
            startLoop,
            stopLoop,
            currentVoice,
            currentVoiceIndex,
            fixed,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.control {
    position: relative;

    .pin {
        position: absolute;
        top: 20px;
        right: 16px;
    }
}

.fixed {
    position: sticky;
    top: 50px;
    z-index: 1;
}

.haruka-button {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    margin-right: 15px;
    margin-bottom: 15px;

    .v-btn {
        text-transform: none;
        box-shadow: 0px 0px 7px $haruka-primary !important;
    }
}
</style>