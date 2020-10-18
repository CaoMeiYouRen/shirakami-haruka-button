<template>
    <span class="haruka-button">
        <v-btn
            v-if="title.length < maxLength"
            color="primary"
            rounded
            @click="play"
        >
            {{ title }}
        </v-btn>
        <v-tooltip v-else top>
            <template #activator="{on,attrs}">
                <v-btn
                    color="primary"
                    rounded
                    v-bind="attrs"
                    @click="play"
                    v-on="on"
                >
                    {{ title }}
                </v-btn>
            </template>
            <span>{{ rawTitle }}</span>
        </v-tooltip>
        <span v-if="playList.length">
            <span
                v-for="(e) in playList"
                :key="e"
                :style="style"
                class="process-mask"
                @click="play"
            />
        </span>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, reactive, watchEffect, isRef, isReactive, unref, watch, toRefs } from '@vue/composition-api'
import { messages } from '@/locales'
import { useOnWindowResize } from '@/composable'
import i18n from '@/plugins/i18n'

function strFix(val: string, max = 16){
    if (val && val.length > max){
        return `${val.slice(0, max)}…`
    }
    return val
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
    },
    setup(props, ctx){
        const { isPlay } = toRefs(props)
        const publicPath = process.env.BASE_URL || ''
        const disabled = ref(false)
        const playList = ref<number[]>([])
        const style = ref({
            animation: '',
        })
        const { width } = useOnWindowResize()
        // 计算按钮标题最大字数
        // 屏幕宽度减 44px ，除以每个字 19px，最大不超过32个字
        const maxLength = computed(() => Math.min(Math.floor((width.value - 44) / 19), 32))
        const path = `${publicPath}voices/${props.path}`
        let stop: any = null
        function play(cb){
            if (disabled.value) { // 如果当前音频文件还未加载完则跳过本次。
                return
            }
            const audio = new Audio()
            audio.preload = 'meta'
            audio.src = path
            disabled.value = true
            const timer = setTimeout(() => {
                disabled.value = false
            }, 10 * 1000) // 如果超过 10 秒还未加载成功则允许重新点击
            audio.load()
            audio.oncanplay = e => {
                disabled.value = false
                clearTimeout(timer)
                style.value.animation = `playing ${audio.duration}s linear forwards`
                playList.value.push(Date.now())
                audio.play()
            }
            audio.onended = e => {
                playList.value.shift()
                if (typeof cb === 'function'){
                    cb()
                }
            }
            stop = () => {
                audio.pause()
                playList.value.shift()
            }
        }
        const rawTitle = computed(() => {
            const locale = i18n.locale
            let _title = props.messages[locale]
            if (_title){
                return _title
            }
            const langs = Object.keys(messages)
            for (let i = 0; i < langs.length; i++) {
                const lang = langs[i]
                _title = props.messages[lang]
                if (_title){
                    return _title
                }
            }
            return props.messages['zh']
        })
        const title = computed(() => strFix(rawTitle.value, maxLength.value))
        watch(isPlay, () => {
            if (isPlay.value){
                play(() => {
                    ctx.emit('input', false)
                })
            } else {
                if (stop){
                    stop()
                    stop = null
                }
            }
        })
        return {
            play,
            style,
            playList,
            maxLength,
            rawTitle,
            title,
            disabled,
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
        box-shadow: 0px 0px 7px $haruka-primary !important;
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