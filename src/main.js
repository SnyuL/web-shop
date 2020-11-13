import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../src/global/common.css";
import font from "../src/assets/fonts/iconfont.css";
// import axios from "axios";
// axios.defaults.baseURL = "http://klxin.cn:8888/api/private/v1";
// // console.log(Vue, 8888);

// //  原型对象上挂载  axios
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
import bread from "../src/api/bread.vue";
Vue.component("bread", bread);
Vue.use(ElementUI);

Vue.filter("formats", function() {
    var yy = new Date().getFullYear();
    var mm = new Date().getMonth() + 1;
    var dd = new Date().getDate();
    var h = new Date()

    .getHours()
        .toString()
        .padStart(2, 0);
    var d = new Date()

    .getMinutes()
        .toString()
        .padStart(2, 0);
    var s = new Date()

    .getSeconds()
        .toString()
        .padStart(2, 0);
    return `${yy}-${mm}-${dd}-${h}:${d}:${s}`;
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");