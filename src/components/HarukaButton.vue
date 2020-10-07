<template>
    <span class="haruka-button">
        <v-btn
            color="primary"
            rounded
            @click="play"
        >
            {{ title }}
        </v-btn>
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
import { computed, defineComponent, Ref, ref } from '@vue/composition-api'
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
        const playList = ref([]) as Ref<number[]>
        const style = ref({
            animation: '',
        })
        function play(event, item){
            const audio = new Audio()
            audio.preload = 'meta'
            audio.src = `${publicPath}voices/${props.path}`
            audio.load()
            audio.oncanplay = (e) => {
                style.value.animation = `playing ${audio.duration}s linear forwards`
                playList.value.push(Date.now())
                audio.play()
            }
            audio.onended = (e) => {
                playList.value.shift()
            }
        }
        return {
            play,
            style,
            playList,
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
        width: 18px;
    }

    to {
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
    }
}
</style>