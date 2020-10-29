import CopyrightFooter from './src/CopyrightFooter.vue'
import HarukaButton from './src/HarukaButton.vue'
import HarukaCard from './src/HarukaCard.vue'

declare global {
    interface __VLS_GlobalComponents {
        CopyrightFooter: typeof CopyrightFooter
        HarukaButton: typeof HarukaButton
        HarukaCard: typeof HarukaCard
    }
}