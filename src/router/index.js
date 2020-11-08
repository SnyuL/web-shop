import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login";
import Home from "@/components/Home";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/login"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/login",
        component: Login
    }
];

const router = new VueRouter({
    routes
});

export default router;