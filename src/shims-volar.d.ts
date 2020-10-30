import CopyrightFooter from './components/CopyrightFooter.vue'
import HarukaButton from './components/HarukaButton.vue'
import HarukaCard from './components/HarukaCard.vue'

declare global {
    interface __VLS_GlobalComponents {
        CopyrightFooter: typeof CopyrightFooter
        HarukaButton: typeof HarukaButton
        HarukaCard: typeof HarukaCard
    }
}