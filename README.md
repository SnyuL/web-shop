表单校验
rules属性绑定
data中定义规则
表单item上prop属性绑定
注意点： prop的值和规则的值以及表单的值需要保持一致

在vue中如何获取dom元素
- 定义属性

<div ref='qqq' @click="btn">111111</div>

- 获取：this.$refs.qqq
如何携带token
登录成功的时候将获取的token做本地缓存
需要做请求拦截====其他所有请求需要携带请求头 Authorization
api/index.js
做请求拦截 获取本地缓存
将本都缓存的值添加到请求头上面去
左侧菜单数据展示
- 封装函数  ===获取左侧菜单数据请求的函数    api/index.js
- home.vue
    + 导入封装请求函数
    + 调用这个函数获取数据，并且将数据 赋值给data中的menuList
    + 将数据循环出来 ====进行2层循环

步骤分析：

- 静态组件布局编写===从官网复制过来
- 动态渲染左侧菜单导航===将获取的请求数据使用循环
- 配置属性默认值展开一个  ====查看官网配置属性
- 配置路由实现显示对应的组件
做菜菜单导航图标的显示
引入iconfont.css文件 main.js中引入

一级图标

准备一个对象或者数组

iconObj: {
  0: 'icon-user',
  1: 'icon-tijikongjian',
  2: 'icon-shangpin',
  3: 'icon-danju',
  4: 'icon-baobiao'
},

图标标签属性绑定 class 然后根据索引找到对象中的哪一个类名进行显示

二级图标====直接在二级循环标题前面提加图标标签====写死

左侧菜单步骤分析：
- 1-显示组件菜单=====从官网复制
- 2-只展开一个   通过控制  index
- 3-配置路由 ===点击谁右边就显示哪一个组件   
    + 配置项上面添加一个router属性   :router="true" 
    + 配置唯一值index的值为path值=====:index="item2.path
- 4-改变默认高亮颜色   active-text-color="#00ff00"
- 5-点击当前只展开其他收起  :unique-opened="true"
- 6-刷新保持最后一次的高亮   
    + 设置默认展开项   :default-active="defaultActive"
    + 点击
        + 给当前每一项的二级菜单  绑定点击事件 并且获取当前的path值
        + 将这个值赋值给 defaultActive 并且做本地缓存【刷新的时候还可以获取上一次的path值】
        + 刷新后获取这个值   defaultActive=从本都缓存中拿 ||  'users'
- 7-解决二级菜单的每一项的右边框    .el-menu {border:none;}
- 8-点击收起菜单功能
    + 布局一个按钮  点击按钮
    + 点击设置 collapse=true  or   false  
    + 改变左侧侧边栏宽度样式的设置     <el-aside :width="collapse?'64px':'200px'">
    + 关闭收起和展开的动画  :collapse-transition="false"
路由拦截
路由拦截和请求拦截的区别

请求拦截=====只要请求就拦截 路由拦截====只要路由值发生改变就拦截

如何设置路由拦截
- 在router文件中设置路由前置拦截   router.beforeEach((to,form,next)=>{})
- 判断是不是lofgin路由值   是 就直接放行，
- 判断是不是有token  有token就放行 没有就去login
- 最后解决掉了问题会出现兼容性  解决方法如下


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err);
};
1-请求拦截====token 2-左侧菜单 3-路由拦截

状态
// 点击按钮

  /* 
  1-获取参数===  {uId:rows.id,type:rows.mg_state}
  2-发送请求==
  */
删除用户id
封装删除用户的api请求函数
给删除按钮绑定点击事件
获取当前行用户id
导入api请求函数
导入对话框api函数 .then()里面执行的就是点击确认按钮之后要做的事情
发送请求并且传入id
成功后给出提示
再次调用初次进入获取数据请求的函数===刷新页面
编辑用户
绑定点击事件
获取当前行的数据
显示对话框 并且将当前行的数据渲染到对话框中
表单校验
点击取消===关闭对话框
点击确认===
二次校验

发送请求

1、封装更改用户api函数 2、导入api函数 3、调用函数并且传入参数 4、成功后显示提示框+关闭对话框 5、重新渲染

添加用户
找组件 对话框组件
点击按钮
显示对话框
校验表单 ======同时给表单数据做双向数据绑定
点击对话框中的确认按钮
二次校验

发送请求

1、封装更改用户api函数 2、导入api函数· 3、调用函数并且传入参数 4、成功后显示提示框+关闭对话框 5、重新渲染

权限列表
布局表格组件
封装函数api
请求数据并渲染
角色列表
页面结构布局
发送请求获取数据并渲染
三级循环 一级===el-row 二级===el-row 三级===el-tag

优化： 1、结构布局中的el-tag的间距 2-边框 3-删除按钮

删除权限 ====根据角色来删除
需要获取两个参数 分别是角色id 【经理】 和权限id 【就是展开的】 插槽

分装api函数

点击当前权限删除按钮 点击谁就获取谁的权限id ====共用一个函数

获取id然后根据id进行发送请求

重新渲染

树形组件数据展示步骤
点击按钮显示对话框
封装api 获取树形组件中的数据函数
将数据渲染到组件上
获取每一行的数据中的children
每一个children获取他的id 逐个获取children中的id 并将id存放至一个空数组中
收集，每个children中的id,总共需要收集3层===需要使用递归 使用递归就是你有children就继续找id 没有children就终止递归
最后将这个数组赋值给 default-checked-keys=【】
给角色授权
点击对话框确认按钮
获取角色id ===
获取权限id=====需要获取所有选中的权限的id 并且以,拼接 rids = [ ...this.refs.tree.getCheckedKeys(),...this.refs.tree.getHalfCheckedKeys() ].join()
封装api函数
调用函数发送请求传入两个参数
成功后 关闭对话框+ 给出成功后的提示
重新调用初次进入函数并刷新页面
分配角色
点击按钮
显示对话框
显示当前行的数据到组件上
显示角色数据列表
发送请求获取数据
将数据展示在级联选择器
点击谁就显示谁的内容在级联选择器上
点击确认按钮
封装api函数
发送请求
成功后关闭对话框
获取商品分类
封装函数api
调用函数api 并且传入三个参数
将数据进行渲染
vue-table-with-tree-grid 使用第三方组件库
下载 vue-table-with-tree-grid