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
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");