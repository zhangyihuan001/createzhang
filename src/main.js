import Vue from "vue"
import "./style/base.less"

import App from "./App"
import router from "./router"

new Vue({
    el:"#app",
    components:{App},
    template:`<App />`,
    router
})