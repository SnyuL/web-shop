<template>
  <div class="roles-container">
    <bread :params1="'权限管理'" :params2="'角色列表'"></bread>

    <el-card class="box-card">
      <el-table
        ref="singleTable"
        :data="rolesList"
        border
        highlight-current-row
        style="width: 100%;margin:15px  0"
      >
        <el-table-column type="expand" width="50">
          <template slot-scope="scope">
            <!-- <pre>{{scope.row}}</pre> -->
            <!-- 一级 -->
            <el-row
              class="first-rows"
              v-for="(item1, index1) in scope.row.children"
              :key="index1"
            >
              <el-col :span="8">
                <el-tag
                  @close="rolesDel(scope.row.id, item1.id, scope.row)"
                  closable
                  >{{ item1.authName }}======{{ item1.id }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="16">
                <!-- 二级 -->
                <el-row
                  class="second-rows"
                  v-for="(item2, index2) in item1.children"
                  :key="index2"
                >
                  <el-col :span="8">
                    <el-tag
                      @close="rolesDel(scope.row.id, item2.id, scope.row)"
                      closable
                      type="success"
                      >{{ item2.authName }}==={{ item2.id }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <!-- 三级 -->
                    <el-tag
                      closable
                      type="warning"
                      v-for="(item3, index3) in item2.children"
                      :key="index3"
                      @close="rolesDel(scope.row.id, item3.id, scope.row)"
                      >{{ item3.authName }}======{{ item3.id }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="#"> </el-table-column>
        <el-table-column property="roleName" label="角色名称" width="300">
        </el-table-column>
        <el-table-column property="roleDesc" label="角色描述" width="400">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <pre>{{scope.row}}</pre> -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>

            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top-start"
            >
              <el-button
                @click="btnRights(scope.row)"
                size="mini"
                type="warning"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 树形组件 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleRights" width="30%">
      <!-- 显示树形组件 -->
      <el-tree
        ref="tree"
        :data="treeList"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="defaultArr"
        :props="defaultProps"
        :default-expand-all="true"
      >
      </el-tree>
      <!-- 显示树形组件 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roles_api, rightsDel_api, rights_api, addRoleRights_api } from "@/api";
export default {
  data() {
    return {
      rolesList: [],
      dialogVisibleRights: false,

      treeList: [],
      defaultProps: {
        children: "children",
        label: "authName" //  这里的值是再从 发送请求返回数据中的每一项来的，具体可参考el-table
      },
      //  定义选中的id数组
      defaultArr: [],
      roleId: ""
    };
  },
  created() {
    this.getRolesData();
  },
  methods: {
    async getRolesData() {
      const { data: res } = await roles_api();
      console.log(res, 555);
      this.rolesList = res.data;
    },
    //  根据角色删除权限
    rolesDel(roleId, rightId, rows) {
      //console.log(roleId, rightId, 666666)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //  这里是点击的确认按钮   //  rightsDel_api({roleId:1,rightId:2})
          // console.log(112233);
          const { data: res } = await rightsDel_api({ roleId, rightId });
          // console.log(rows, 777);
          //  重新渲染
          rows.children = res.data;
          // console.log(res, 889999);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /* 点击按钮显示树形组件 */
    async btnRights(rows) {
      //  获取角色id
      this.roleId = rows.id;

      this.defaultArr = [];
      /* 
      1-显示组件
      2-发送请求获取数据 
      */
      this.dialogVisibleRights = true;

      const { data: res } = await rights_api("tree");
      //console.log(res,5566);
      this.treeList = res.data;

      //  显示 默认复选框  获取所有选中的id
      // console.log(rows, 777775555);

      //  调用递归函数
      this.argumTree(rows, this.defaultArr);
    },

    //  关闭对话框

    /* 递归函数 */
    argumTree(rows, arr) {
      /* 
      如果数组有children  就继续，否则就终止
      */
      /* 无children  最后一项 */
      if (!rows.children) {
        return arr.push(rows.id);
        //  将找到的id存到数组中
      }
      /* 有children */
      rows.children.forEach(item => {
        //   继续往下找
        this.argumTree(item, arr);
      });
    },

    //  给角色授权
    async addRolesRights() {
      var rids = [];

      //console.log(this.roleId);
      //    获取叶子节点和半选节点的id
      //  叶子节点   this.$refs.tree.getCheckedKeys()
      //  半选节点   this.$refs.tree.getHalfCheckedKeys()
      //console.log(this.$refs.tree.getCheckedKeys(), 666555)

      rids = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys()
      ].join();

      //console.log(rids, 444333)

      //  发送请求
      const { data: res } = await addRoleRights_api({
        roleId: this.roleId,
        rids
      });
      console.log(res, 33333);

      this.dialogVisibleRights = false;
      //  重新渲染
      this.getRolesData();
    }
  }
};
</script>
<style scoped lang="less">
.roles-container {
  .first-rows {
    padding: 20px 0;
    border-bottom: 1px solid red;
    .second-rows {
      border-top: 1px solid green;
      &:nth-child(1) {
        border-top: none;
      }
    }
    /* &  =====就是 .first-rows */
    &:nth-child(1) {
      border-top: 1px solid red;
    }
    .el-tag {
      margin: 5px;
    }
  }
}
</style>
