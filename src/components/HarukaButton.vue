<template>
    <span class="haruka-button">
        <v-btn
            color="primary"
            rounded
            @click="play"
        >
            {{ title }}
        </v-btn>
        <span
            v-if="isPlay"
            :style="style"
            class="process-mask"
            @click="play"
        />
    </span>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
    name: 'HarukaButton',
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
    },
    setup(props, ctx){
        const publicPath = process.env.BASE_URL || ''
        const audio = ref(new Audio())
        const isPlay = ref(false)
        const duration = computed(() => audio.value.duration)
        audio.value.preload = 'meta'
        audio.value.src = `${publicPath}voices/${props.path}`
        const style = ref({
            animation: '',
        })
        function play(){
            audio.value.load()
            audio.value.oncanplay = (e) => {
                isPlay.value = true
                style.value.animation = `playing ${audio.value.duration}s linear forwards`

                audio.value.play()
            }
            audio.value.onended = (e) => {
                isPlay.value = false
            }
        }
        return {
            audio,
            play,
            duration,
            isPlay,
            style,
        }
    },
    computed: {
        title(): string {
            const locale = this.$i18n.locale
            return this.messages[locale]
        },
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.haruka-button {
    position: relative;
    margin-right: 15px;

    .v-btn {
        // margin-right: 15px;
        margin-bottom: 15px;
        text-transform: none;
        box-shadow: 0px 0px 7px $haruka-primary !important;
    }
}

.process-mask {
    position: absolute;
    top: -14px;
    left: 0px;
    height: 36px;
    overflow: hidden !important;
    background-color: rgba(0, 0, 0, 0.2) !important;
    border-top-left-radius: 28px;
    border-bottom-left-radius: 28px;
    cursor: pointer;
    animation: playing 3s linear;
}
</style>
<style lang="scss">
@keyframes playing {
    from {
        width: 5%;
    }

    to {
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
    }
}
</style>