<template>
  <div class="cate-container">
    <bread :params1="'商品管理'" :params2="'商品分类'"></bread>
    <el-card class="box-card">
      <el-button type="primary" @click="dialogFormVisibleAdd = true"
        >添加分类</el-button
      >
      <tree-table :data="cateList" :columns="columns">
        <!--  -->
        <template slot="action">
          <el-button type="primary">确 定</el-button>
        </template>

        <template slot="cat_level" scope="scope">
          <!-- <pre>{{scope.row}}</pre> -->
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level == 1"
            >二级</el-tag
          >
          <el-tag type="warning" v-else>三级</el-tag>
        </template>

        <template slot="cat_deleted" scope="scope">
          <i v-if="!scope.row.cat_deleted" class="el-icon-success"></i>
          <i v-else class="el-icon-error"></i>
        </template>
      </tree-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Number(cate.pagenum)"
        :page-sizes="[2, 4, 5, 10]"
        :page-size="cate.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
/* 按需导入 */
import { cate_api } from "@/api";
export default {
  data() {
    return {
      //  定义参数
      cate: {
        type: 3,
        pagenum: 2,
        pagesize: 3
      },
      total: 1,
      cateList: [],

      //  树形组件配置
      columns: [
        { label: "分类名称", align: "left", prop: "cat_name", tree: true },

        {
          label: "是否有效",
          align: "center",
          prop: "cat_deleted",
          template: "cat_deleted",
          type: "template"
        },
        {
          label: "排序",
          align: "center",
          prop: "cat_level",
          template: "cat_level",
          type: "template"
        },
        {
          label: "操作",
          align: "center",
          prop: "action",
          template: "action",
          type: "template",
          width: "180px"
        }
      ]
    };
  },
  created() {
    this.getCates();
  },

  methods: {
    //  获取user数据列表
    async getCates() {
      const { data: res } = await cate_api(this.cate);
      console.log(res, 4444555566666);
      this.cateList = res.data.result;
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
      this.cate.pagesize = val;
      this.getCates(); //  2-重新发送请求   ==传递的参数是改变后的参数值
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)

      /* 这里只要点击页码数 就会触发
      1-将获取的页码数赋值给pagenum
      2-重新发送请求   ==传递的参数是改变后的参数值
      */
      this.cate.pagenum = val; // 1-将获取的页码数赋值给pagenum
      this.getCates(); //  2-重新发送请求   ==传递的参数是改变后的参数值
    }
  }
};
</script>
<style scoped lang="less">
.cate-container {
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
