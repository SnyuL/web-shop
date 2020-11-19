import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from "@/components/Login";
// import Home from "@/components/Home";

const Login = () =>
    import ( /* webpackChunkName:"login_home" */ '@/components/Login')
const Home = () =>
    import ( /* webpackChunkName:"login_home" */ '@/components/Home')
    //  权限
    // import Rights from '../views/rights/rights'
    // import Roles from '../views/rights/roles'
const Rights = () =>
    import ( /* webpackChunkName:" Rights_Roles" */ '../views/rights/rights')
const Roles = () =>
    import ( /* webpackChunkName:"Rights_Roles" */ '../views/rights/roles')

//  用户
// import Users from '../views/users/users'
const Users = () =>
    import ( /* webpackChunkName:"Users" */ '../views/users/users')

//  商品
// import Goods from '../views/goods/goods'
// import goodsAdd from '../views/goods/goodsAdd.vue'
// import Params from '../views/goods/params'
// import Categories from '../views/goods/categories'

const Goods = () =>
    import ( /* webpackChunkName:"Goods_goodsAdd_Params_Categories" */ '../views/goods/goods')

const goodsAdd = () =>
    import ( /* webpackChunkName:"Goods_goodsAdd_Params_Categories" */ '../views/goods/goodsAdd.vue')
const Params = () =>
    import ( /* webpackChunkName:"Goods_goodsAdd_Params_Categories" */ '../views/goods/params')
const Categories = () =>
    import ( /* webpackChunkName:"Goods_goodsAdd_Params_Categories" */ '../views/goods/categories')

//   订单
// import Order from '../views/order/orders'
// import Reports from '../views/reports/reports'
const Order = () =>
    import ( /* webpackChunkName:"Order_Reports" */ '../views/order/orders')
const Reports = () =>
    import ( /* webpackChunkName:"Order_Reports" */ '../views/reports/reports')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        component: Home,
        children: [
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/users', component: Users },
            { path: '/goods', component: Goods },
            { path: '/goodsAdd', component: goodsAdd },
            { path: '/params', component: Params },
            { path: '/categories', component: Categories },
            { path: '/orders', component: Order },
            { path: '/reports', component: Reports }
        ]
    },
    {
        path: '/login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
    //to将要访问的路径
    //from  代表从哪个路径跳转而来
    //next是一个函数，表示放行，其中next()表示直接放行，next("")加上内容表示强制跳转的路径
    if (to.path == '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router