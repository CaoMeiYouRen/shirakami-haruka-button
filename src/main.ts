import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './plugins/composition-api'
import './components'
import 'normalize.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App),
}).$mount('#app')