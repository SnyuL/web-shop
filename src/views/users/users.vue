<template>
  <div class="users-container">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <bread :params1="'用户管理'" :params2="'用户列表'"></bread>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-input
              placeholder="请输入内容"
              v-model="users.query"
              class="input-with-select"
              @clear="getUsers"
              clearable
            >
              <el-button
                @click="getUsers"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="dialogFormVisibleAdd = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <el-table
        ref="singleTable"
        :data="userList"
        border
        highlight-current-row
        style="width: 100%;margin:15px  0"
      >
        <el-table-column type="index" width="50" label="#"> </el-table-column>
        <el-table-column property="username" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="email" label="邮箱" width="120">
        </el-table-column>
        <el-table-column property="mobile" label="电话"> </el-table-column>
        <el-table-column property="role_name" label="角色"> </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- <pre>{{scope.row}}</pre> -->
            <el-switch
              @change="btnSwitch(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <pre>{{scope.row}}</pre> -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row.id)"
            ></el-button>

            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top-start"
            >
              <el-button
                @click="addRoles(scope.row)"
                size="mini"
                type="warning"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Number(users.pagenum)"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="users.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 更改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rulesEdit" ref="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="form.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="mobile" label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="formAdd" :rules="rulesEdit" ref="addForm">
        <el-form-item
          prop="username"
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formAdd.username" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input v-model="formAdd.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formAdd.email" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="mobile" label="手机" :label-width="formLabelWidth">
          <el-input v-model="formAdd.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialogAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogFormVisibleRoles"
      width="30%"
    >
      <div>当前的用户：{{ username }}</div>
      <div>当前的角色：{{ role_name }}</div>
      <el-select v-model="rid" placeholder="请选择">
        <el-option
          v-for="item in rolesList"
          :key="item.value"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRoles = false">取 消</el-button>
        <el-button type="primary" @click="rolesBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* 按需导入 */
import {
  users_api,
  usersState_api,
  usersDel_api,
  usersEdit_api,
  usersAdd_api,
  addUserRole_api,
  roles_api
} from "@/api";
export default {
  data() {
    return {
      //  定义参数
      users: {
        query: "",
        pagesize: 10,
        pagenum: 1
      },
      total: 1,
      userList: [],
      //分配角色
      rolesList: [],
      rid: "", //  角色id
      id: "",
      username: "",
      role_name: "",

      props: {
        label: "roleName"
      },
      /* 对话框==编辑 */
      dialogFormVisible: false,
      dialogFormVisibleRoles: false,
      form: {
        email: "",
        mobile: "",
        id: "",
        username: ""
      },
      formLabelWidth: "120px",
      rulesEdit: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6-16个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3-11个字符", trigger: "blur" }
        ]
      },
      //   添加
      dialogFormVisibleAdd: false,
      formAdd: {
        email: "",
        mobile: "",
        username: "",
        password: ""
      }
    };
  },
  created() {
    this.getUsers();

    this.getRolesData();
  },

  methods: {
    //  获取user数据列表
    async getUsers() {
      const { data: res } = await users_api(this.users);
      // console.log(res, 4444555566666)
      this.userList = res.data.users;
      //  将获取的total赋值给this.total
      this.total = res.data.total;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      /*
      这里是改变每一页喜爱是几条
      1-将获取的每页现实的条数赋值pagesize
      2-2-重新发送请求   ==传递的参数是改变后的参数值
      */
      this.users.pagesize = val;
      this.getUsers(); //  2-重新发送请求   ==传递的参数是改变后的参数值
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)

      /* 这里只要点击页码数 就会触发
      1-将获取的页码数赋值给pagenum
      2-重新发送请求   ==传递的参数是改变后的参数值
      */
      this.users.pagenum = val; // 1-将获取的页码数赋值给pagenum
      this.getUsers(); //  2-重新发送请求   ==传递的参数是改变后的参数值
    },

    /* 开关状态改变 */
    async btnSwitch(rows) {
      //console.log(rows.id,rows.mg_state,1111);
      //  点击按钮
      /*
      1-获取参数===  {uId:rows.id,type:rows.mg_state}
      2-发送请求==
      3-成功后根据返回值提示不同的提示框
      */

      const { data: res } = await usersState_api({
        uId: rows.id,
        type: rows.mg_state
      });
      console.log(res, 7777);
      if (res.meta.status == 200) {
        //  成功后的判断
        //  成功
        // this.$message({
        //   message: '恭喜你，登录成功',
        //   type: 'success'
        // })
        this.$message.success(res.meta.msg);
      } else {
        this.$message.error(res.meta.msg);
      }
    },

    async handleDelete(id) {
      const res = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
      console.log(res, 88);
      //  判断点击的是确认还是取消
      if (res == "confirm") {
        // 进入的话就是确认
        //  点击确认按钮要做的事情
        const { data: res } = await usersDel_api(id);
        console.log(res, 7);
        if (res.meta.status == 200) {
          //  成功后的判断
          //  成功
          // this.$message({
          //   message: '恭喜你，登录成功',
          //   type: 'success'
          // })
          this.$message.success(res.meta.msg);
        } else {
          this.$message.error(res.meta.msg);
        }
        //  刷新页面
        this.getUsers();
      }

      // /*  */
    },

    /* 删除当前行用户 */
    handleDelete2(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //  点击确认按钮要做的事情
          const { data: res } = await usersDel_api(id);
          console.log(res, 7);
          if (res.meta.status == 200) {
            //  成功后的判断
            //  成功
            // this.$message({
            //   message: '恭喜你，登录成功',
            //   type: 'success'
            // })
            this.$message.success(res.meta.msg);
          } else {
            this.$message.error(res.meta.msg);
          }
          //  刷新页面
          this.getUsers();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // /*  */
    },
    /* 编辑用户 */
    handleEdit(rows) {
      console.log(rows, 6677);
      this.dialogFormVisible = true;
      //   将获取的值赋值给form对象  即表单元素
      this.form.id = rows.id;
      this.form.email = rows.email;
      this.form.mobile = rows.mobile;
      this.form.username = rows.username;
    },
    /* 点击对话框中的确认按钮 */
    closeDialog() {
      //  二次校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          //alert('submit!');
          const { data: res } = await usersEdit_api(this.form);
          console.log(res, 9999888);
          this.dialogFormVisible = false;
          this.getUsers(); //  重新渲染
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  添加
    /* 点击对话框中的确认按钮 */
    closeDialogAdd() {
      //  二次校验
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          //alert('submit!');
          const { data: res } = await usersAdd_api(this.formAdd);
          console.log(res, 333333);
          this.dialogFormVisibleAdd = false;
          this.getUsers(); //  重新渲染
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 分配角色
    addRoles(rows) {
      this.dialogFormVisibleRoles = true;
      console.log(rows, 4);
      this.id = rows.id; //  获取用户id
      this.username = rows.username;
      this.role_name = rows.role_name;
    },
    //获取角色数据
    async getRolesData() {
      const { data: res } = await roles_api();
      console.log(res, 555);
      this.rolesList = res.data;
    },
    //  分配角色确认按钮
    async rolesBtn() {
      const { data: res } = await addUserRole_api({
        id: this.id,
        rid: this.rid
      });
      console.log(res, 19999);
      this.dialogFormVisibleRoles = false;
    }
  }
};
</script>
<style scoped lang="less">
.users-container {
  .el-breadcrumb {
    margin: 15px 0 25px;
  }

  .el-row {
    display: flex;
    align-items: center;
    .el-col {
      > div {
        margin: 0;
      }
    }
  }
}
</style>
