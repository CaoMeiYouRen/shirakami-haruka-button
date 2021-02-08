import Vue from 'vue'
import Vuetify from 'vuetify'
import { PRIMARY_COLOR } from '@/config/env'

// import '@mdi/font/css/materialdesignicons.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: PRIMARY_COLOR,
            },
        },
    },
})
