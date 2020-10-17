import { onMounted, onUnmounted, ref, computed, watch, Ref, unref } from '@vue/composition-api'

/**
 * 返回 window 的大小
 *
 * @author CaoMeiYouRen
 * @date 2020-10-10
 * @export
 * @returns
 */
export function useOnWindowResize() {
    function getSize() {
        const height = window.innerHeight || document.documentElement.clientHeight
        const width = window.innerWidth || document.documentElement.clientWidth
        return {
            height,
            width,
        }
    }
    const height = ref(0)
    const width = ref(0)
    function handler() {
        const size = getSize()
        height.value = size.height
        width.value = size.width
    }
    window.addEventListener('resize', handler)
    onMounted(() => {
        handler()
    })
    onUnmounted(() => {
        window.removeEventListener('resize', handler)
    })
    function remove() {
        window.removeEventListener('resize', handler)
    }
    return {
        height,
        width,
        remove,
    }
}