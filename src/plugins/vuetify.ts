import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import '@mdi/font/css/materialdesignicons.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#ffaea6',
            },
        },
    },
})