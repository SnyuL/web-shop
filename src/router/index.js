import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/components/Login";
import Home from "@/components/Home";
//  权限
import Rights from "../views/rights/rights";
import Roles from "../views/rights/roles";

//  用户
import Users from "../views/users/users";

//  商品
import Goods from "../views/goods/goods";
import goodsAdd from "../views/goods/goodsAdd.vue";
import Params from "../views/goods/params";
import Categories from "../views/goods/categories";

//   订单
import Order from "../views/order/orders";
import Reports from "../views/reports/reports";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/login"
    },
    {
        path: "/home",
        component: Home,
        children: [
            { path: "/rights", component: Rights },
            { path: "/roles", component: Roles },
            { path: "/users", component: Users },
            { path: "/goods", component: Goods },
            { path: "/goodsAdd", component: goodsAdd },
            { path: "/params", component: Params },
            { path: "/categories", component: Categories },
            { path: "/orders", component: Order },
            { path: "/reports", component: Reports }
        ]
    },
    {
        path: "/login",
        component: Login
    }
];

const router = new VueRouter({
    routes
});

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
    //to将要访问的路径
    //from  代表从哪个路径跳转而来
    //next是一个函数，表示放行，其中next()表示直接放行，next("")加上内容表示强制跳转的路径
    if (to.path == "/login") return next();
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) return next("/login");
    next();
});

export default router;