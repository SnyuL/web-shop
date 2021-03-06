import axios from 'axios'
import router from '../router'

axios.defaults.baseURL = 'http://klxin.cn:8888/api/private/v1'

// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        //console.log(config,44444);
        var token = window.sessionStorage.getItem('token')
            // console.log(token,445566);
        config.headers['Authorization'] = token
        return config
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
        function(response) {
            // 对响应数据做点什么
            return response
        },
        function(error) {
            // 对响应错误做点什么
            return Promise.reject(error)
        }
    )
    //登录请求函数
export const login_api = params => {
        return axios.post('/login', params)
    }
    //左侧菜单获取
export const menus_api = () => {
        return axios('/menus')
    }
    //users数据获取
export const users_api = params => {
        return axios('/users', {
            params
        })
    }
    //修改用户状态
export const usersState_api = obj => {
        return axios.put(`users/${obj.uId}/state/${obj.type}`)
    }
    //删除用户 users/:id */ 请求类型是delete
export const usersDel_api = id => {
        return axios.delete(`users/${id}`)
    }
    //修改用户 users/:id */ 请求类型是delete
export const usersEdit_api = obj => {
    return axios.delete(`users/${obj.id}`, {
        email: obj.email,
        mobile: obj.mobile
    })
}

/* 6-添加单个用户   users/:id */
export const usersAdd_api = obj => {
    return axios.post(`/users`, {
        email: obj.email,
        mobile: obj.mobile,
        password: obj.password,
        username: obj.username
    })
}

//获取所有权限列表  rights/:type */
export const rights_api = type => {
    return axios.get(`rights/${type}`)
}

//左侧菜单权限
export const roles_api = () => {
    return axios.get(`/roles`)
}

///* 9-删除用户角色的权限   rights/:type */
export const rightsDel_api = obj => {
    return axios.delete(`roles/${obj.roleId}/rights/${obj.rightId}`)
}

//给角色授权  roles/:roleId/rights*/
export const addRoleRights_api = obj => {
    return axios.post(`roles/${obj.roleId}/rights`, {
        rids: obj.rids
    })
}

//  获取  商品列表goods
//  13-users数据获取
export const goods_api = params => {
    return axios('/goods', {
        params
    })
}

//商品分类  categories */
export const cate_api = obj => {
    return axios.get(`categories`, {
        params: {
            type: obj.type,
            pagenum: obj.pagenum,
            pagesize: obj.pagesize
        }
    })
}

//分配角色数据  users/:id/role */

export const addUserRole_api = obj => {
    return axios.put(`users/${obj.id}/role`, {
        rid: obj.rid
    })
}

//  15-获取参数列表   categories/:id/attributes
export const params_api = obj => {
    return axios(`categories/${obj.id}/attributes`, {
        params: {
            sel: obj.sel
        }
    })
}

//订单数据列表的orders
export const orders_api = params => {
    return axios.get('/order', {
        params
    })
}

//  14-添加动态参数或者静态属性  categories/:id/attributes/:attrId
export const addParams_api = obj => {
    return axios.put(`categories/${obj.id}/attributes/${obj.attrId}`, {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel,
        attr_vals: obj.attr_vals
    })
}

//   15- 添加参数或者属性
export const addAttributes_api = obj => {
    return axios.post(`categories/${obj.id}/attributes`, {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel
    })
}

//   16- 图片上传
export const upload_api = obj => {
    return axios.post(`upload`)
}

//   17- 添加商品
export const goodsAdd_api = obj => {
    return axios.post(`goods`, obj)
}

//数据报表  reports/type/1

export const reports_api = obj => {
    return axios('reports/type/1')
}