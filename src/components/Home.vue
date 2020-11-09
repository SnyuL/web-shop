<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../../public/heima.png" alt="" /><span>电商后台管理系统</span>
      </div>

      <el-button type="info" @click="btn">退出</el-button></el-header
    >

    <el-container>
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="arrow" @click="arrowHandle">|||</div>
        <el-menu
          :collapse-transition="false"
          :collapse="collapse"
          :default-active="defaultActive"
          active-text-color="skyblue"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
          background-color="#333744"
          text-color="#fff"
        >
          <el-submenu
            :index="index + ''"
            v-for="(item, index) in menList"
            :key="index"
          >
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <i
                style="margin-right:10px"
                :class="['iconfont', iconObj[index]]"
              ></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                @click="itemHandle(item2.path)"
                :index="item2.path"
                v-for="(item2, index2) in item.children"
                :key="index2"
                ><i class="el-icon-menu"></i>{{ item2.authName }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus_api } from "@/api";
export default {
  data() {
    return {
      menList: [],
      collapse: false,
      iconObj: {
        0: "icon-user",
        1: "icon-tijikongjian",
        2: "icon-shangpin",
        3: "icon-danju",
        4: "icon-baobiao"
      },
      defaultActive: window.localStorage.getItem("defaultActive") || "users"
    };
  },

  methods: {
    itemHandle(path) {
      console.log(path, 6666);
      //  需要点击后做两件事
      /*
      1-将获取的path赋值给defaultActive
      2-将这个值做本地缓存   localStorage
      3-data中的defaultActive  初次进入或者刷新的时候  从本地缓存中拿，如果本地缓存有值就直接拿，没值的话就取默认值 users
      */
      this.defaultActive = path;

      window.localStorage.setItem("defaultActive", path);
    },
    btn() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取左侧的菜单函数
    async getMenus() {
      // const res = await menus_api();
      const { data: res } = await menus_api();
      this.menList = res.data;
      console.log(this.menList);
    },
    arrowHandle() {
      this.collapse = !this.collapse;
    }
  },
  created() {
    this.getMenus();
  }
};
</script>
<style scoped lang="less">
.home_container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}
.el-aside {
  background-color: #333744;
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .arrow {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu {
    border: none !important;
  }
}
el-container {
  height: 100%;
}
.el-main {
  background-color: #eaedf1;
}
</style>
