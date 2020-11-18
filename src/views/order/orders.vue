<template>
  <div class="goods-container">
    <bread :params1="'订单管理'" :params2="'订单列表'"></bread>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-input
              placeholder="请输入内容"
              v-model="orders.query"
              class="input-with-select"
            >
              <el-button
                @click="getOrders"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-table
        ref="singleTable"
        :data="ordersList"
        border
        highlight-current-row
        style="width: 100%;margin:15px  0"
      >
        <el-table-column type="index" width="50" label="#"> </el-table-column>
        <el-table-column property="goods_name" label="订单编号" width="400">
        </el-table-column>
        <el-table-column property="goods_price" label="订单价格" width="120">
        </el-table-column>
        <el-table-column property="goods_weight" label="是否付款">
        </el-table-column>
        <el-table-column property="goods_weight" label="是否发货">
        </el-table-column>
        <el-table-column property="upd_time" label="下单时间">
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
        :current-page="Number(orders.pagenum)"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="orders.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
/* 按需导入 */
import { goods_api, orders_api } from "@/api";
export default {
  data() {
    return {
      //  定义参数
      orders: {
        query: "1",
        pagesize: 50,
        pagenum: 1
      },
      total: 1,
      ordersList: []
    };
  },
  created() {
    this.getOrders();
  },

  methods: {
    //  获取user数据列表
    async getOrders() {
      const { data: res } = await goods_api(this.goods);
      console.log(res, 44445);
      this.goodsList = res.data.goods;
      // //  将获取的total赋值给this.total
      this.total = res.data.total;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      /* 
      这里是改变每一页喜爱是几条
      1-将获取的每页现实的条数赋值pagesize
      2-2-重新发送请求   ==传递的参数是改变后的参数值
      */
      this.orders.pagesize = val;
      this.getOrders(); //  2-重新发送请求   ==传递的参数是改变后的参数值
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)

      /* 这里只要点击页码数 就会触发
      1-将获取的页码数赋值给pagenum
      2-重新发送请求   ==传递的参数是改变后的参数值
      */
      this.orders.pagenum = val; // 1-将获取的页码数赋值给pagenum
      this.getOrders(); //  2-重新发送请求   ==传递的参数是改变后的参数值
    }
  }
};
</script>
<style scoped lang="less">
.goods-container {
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
