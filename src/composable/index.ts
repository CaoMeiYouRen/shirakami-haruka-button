import _ from 'lodash'
import { onMounted, onUnmounted, Ref, ref } from '@vue/composition-api'

type OnWindowResizeReturn = {
    height: Ref<number>
    width: Ref<number>
    remove: () => void
}

/**
 * 返回 window 的大小
 *
 * @author CaoMeiYouRen
 * @date 2020-10-10
 * @export
 * @returns
 */
export function useOnWindowResize(): OnWindowResizeReturn {
    function getSize(): { height: number, width: number } {
        const height = window.innerHeight || document.documentElement.clientHeight
        const width = window.innerWidth || document.documentElement.clientWidth
        return {
            height,
            width,
        }
    }
    const height = ref(0)
    const width = ref(0)
    const handler = _.debounce(() => { // 去抖动
        const size = getSize()
        height.value = size.height
        width.value = size.width
    }, 200)
    window.addEventListener('resize', handler)
    onMounted(() => {
        handler()
    })
    onUnmounted(() => {
        window.removeEventListener('resize', handler)
    })
    function remove(): void {
        window.removeEventListener('resize', handler)
    }
    return {
        height,
        width,
        remove,
    }
}
