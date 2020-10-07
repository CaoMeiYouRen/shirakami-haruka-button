<template>
    <span class="haruka-button">
        <v-btn
            v-if="title.length < 14"
            color="primary"
            rounded
            @click="play"
        >
            {{ title | strLint }}
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
                    {{ title | strLint }}
                </v-btn>
            </template>
            <span>{{ title }}</span>
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
import { computed, defineComponent, Ref, ref } from '@vue/composition-api'
export default defineComponent({
    name: 'HarukaButton',
    filters: {
        strLint(val: string, max: number = 14){
            if (val && val.length > max){
                return `${val.slice(0, max)}…`
            }
            return val
        },
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
    display: inline-block;
    box-sizing: border-box;
    margin-right: 15px;
    margin-bottom: 15px;

    .v-btn {
        // margin-right: 15px;
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
    // overflow: hidden !important;
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