<template>
    <span class="haruka-button">
        <v-btn
            v-if="title.length < maxLength"
            color="primary"
            rounded
            @click="play"
        >{{ title }}</v-btn>
        <v-tooltip v-else top>
            <template #activator="{on, attrs}">
                <v-btn
                    color="primary"
                    rounded
                    v-bind="attrs"
                    @click="play"
                    v-on="on"
                >{{ title }}</v-btn>
            </template>
            <span>{{ rawTitle }}</span>
        </v-tooltip>
        <span v-if="maskList.length">
            <span
                v-for="(e) in maskList"
                :key="e"
                :style="style"
                class="process-mask"
                @click="play"
            />
        </span>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, toRefs, ComputedRef, Ref } from '@vue/composition-api'
import { messages as globalMessages } from '@/locales'
import { useOnWindowResize } from '@/composable'
import i18n from '@/plugins/i18n'
import { BASE_URL, CDN_PATH } from '@/config/env'

const langs = Object.keys(globalMessages)

function strFix(val: string, max = 16) {
    if (val && val.length > max) {
        return `${val.slice(0, max)}…`
    }
    return val
}
/**
 * 计算按钮标题
*/
function useButtonTile(messages: Ref<Record<string, string>>) {
    const rawTitle = computed(() => {
        const locale = i18n.locale
        let _title = messages.value[locale]
        if (_title) {
            return _title
        }
        for (let i = 0; i < langs.length; i++) {
            const lang = langs[i]
            _title = messages.value[lang]
            if (_title) {
                return _title
            }
        }
        return messages.value['zh']
    })

    const { width } = useOnWindowResize()
    // 计算按钮标题最大字数
    // 屏幕宽度减 44px ，除以每个字 19px，最大不超过32个字
    const maxLength = computed(() => Math.min(Math.floor((width.value - 44) / 19), 32))
    const title = computed(() => strFix(rawTitle.value, maxLength.value))

    return {
        maxLength,
        rawTitle,
        title,
    }
}
/**
 * 计算音频路径
*/
function useVoicesPath(path: Ref<string>) {
    const localVoicesPath = computed(() => `${BASE_URL}voices/${path.value}`)
    const voicesPath = computed(() => {
        if (process.env.NODE_ENV === 'production') {
            return `${CDN_PATH}${localVoicesPath.value}`
        }
        return localVoicesPath.value
    })
    return {
        voicesPath,
        localVoicesPath,
    }
}

interface IAudioPlay {
    path: Ref<string>
    /**
     * 是否循环播放单条语音
     */
    isLoop: Ref<boolean>
    /**
     * 是否播放当前语音
    */
    isPlay: Ref<boolean>
    /**
     * 停止全部语音
    */
    stopAll: Ref<boolean>
    playCb?: () => void
}

function useAudioPlay({
    path,
    isLoop,
    isPlay,
    stopAll,
    playCb,
}: IAudioPlay) {
    const playList = ref(new Set<HTMLAudioElement>())
    const disabled = ref(false)
    const maskList = ref<number[]>([])
    const style = ref({
        animation: '',
    })
    const { voicesPath } = useVoicesPath(path)

    function play(cb?: () => void) {
        if (disabled.value) { // 如果当前音频文件还未加载完则跳过本次。
            return
        }
        const audio = new Audio()
        audio.preload = 'meta'
        audio.src = voicesPath.value
        disabled.value = true
        const timer = setTimeout(() => {
            disabled.value = false
        }, 10 * 1000) // 如果超过 10 秒还未加载成功则允许重新点击
        audio.load()
        audio.oncanplay = (e) => {
            playList.value.add(audio)

            audio.play().then(() => {
                clearTimeout(timer)
                disabled.value = false
                style.value.animation = `playing ${audio.duration}s linear forwards`
                maskList.value.push(Date.now())
            })
        }
        audio.onended = (e) => {
            playList.value.delete(audio)
            maskList.value.shift()
            if (typeof cb === 'function') {
                cb()
            }
            if (isLoop.value) {
                play()
            }
        }
        audio.onerror = (e) => {
            console.error(e)
            // 音频资源加载优化，若 CDN 加载失败则从本地加载
            // audio.src = localVoicesPath
        }
    }

    watch(isPlay, (val) => {
        if (val) {
            play(playCb)
        }
    })
    watch(stopAll, (val) => {
        if (val) {
            playList.value.forEach((e) => {
                e.pause()
                playList.value.delete(e)
            })
            maskList.value = []
        }
    })
    return {
        play,
        style,
        maskList,
    }
}

export default defineComponent({
    name: 'HarukaButton',
    model: {
        prop: 'isPlay',
        event: 'input',
    },
    props: {
        /**
         * 音声路径
        */
        path: {
            type: String,
            required: true,
        },
        /**
         * 按钮标题的翻译
        */
        messages: {
            type: Object,
            required: true,
        },
        isPlay: {
            type: Boolean,
            default: false,
        },
        /**
         * 循环播放
        */
        isLoop: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否停止全部音频
        */
        stopAll: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        input: null,
    },
    setup(props, ctx) {
        const { isPlay, isLoop, stopAll, path, messages } = toRefs(props)
        const { play, style, maskList } = useAudioPlay({
            isPlay,
            isLoop,
            stopAll,
            path,
            playCb() {
                ctx.emit('input', false)
            },
        })
        const { maxLength, rawTitle, title } = useButtonTile(messages)
        return {
            play,
            style,
            maskList,
            maxLength,
            rawTitle,
            title,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.haruka-button {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    margin-right: 15px;
    margin-bottom: 15px;

    .v-btn {
        text-transform: none;

        &.primary {
            box-shadow: 0px 0px 7px $primary-color !important;
        }
    }
}

.process-mask {
    position: absolute;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
    height: 36px;
    background-color: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 28px;
    border-bottom-left-radius: 28px;
    cursor: pointer;
    animation: playing 3s linear;
}
</style>

<style lang="scss">
@keyframes playing {
    from {
        width: 18px;
    }

    to {
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
    }
}
</style>