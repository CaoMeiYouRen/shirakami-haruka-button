import Vue from 'vue'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './plugins/composition-api'

import App from './App.vue'
import router from './router'
import store from './store'
import './components'
import './styles/index.scss'
import './styles/loading.scss'

Vue.config.productionTip = false

new Vue({
    name: 'Root',
    router,
    store,
    i18n,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')