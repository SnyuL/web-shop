<template>
  <div class="users-container">
    <bread :params1="'用户管理'" :params2="'商品分类'"></bread>

    <el-card class="box-card">
      <el-button type="primary" @click="dialogFormVisibleAdd = true"
        >添加用户</el-button
      >

      <el-table
        ref="singleTable"
        :data="goodsList"
        border
        highlight-current-row
        style="width: 100%;margin:15px  0"
      >
        <el-table-column type="index" width="50" label="#"> </el-table-column>
        <el-table-column property="goods_name" label="分类名称" width="250">
        </el-table-column>
        <el-table-column
          property="goods_price"
          label="商品价格(元)"
          width="120"
        >
        </el-table-column>
        <el-table-column
          property="goods_weight"
          label="	
是否有效"
        >
        </el-table-column>
        <el-table-column property="'upd_time" label="排序">
          <template slot-scope="scope">
            {{ scope.row.upd_time | formats }}
          </template>
        </el-table-column>

        <el-table-column label="操作"> </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Number(goods.pagenum)"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="goods.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
/* 按需导入 */
import { good_api, usersDel_api, cate_api } from "@/api";
export default {
  data() {
    return {
      //  定义参数
      goods: {
        query: "1",
        pagesize: 50,
        pagenum: 1
      },
      total: 1,
      goodsList: [],
      /* 对话框==编辑 */
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getGoods();
  },

  methods: {
    //  获取user数据列表
    async getGoods() {
      const { data: res } = await good_api(this.goods);
      console.log(res, 4444555566666);
      this.goodsList = res.data.goods;
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
