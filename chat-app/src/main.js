// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueChatScroll from "vue-chat-scroll"

Vue.use(VueChatScroll)

Vue.config.productionTip = false
    /* Adding Modal from Materialize*/

/* eslint-disable no-new */
new Vue({
    // render: h => h(App),
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})