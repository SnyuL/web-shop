<template>
  <div>
    <bread :params1="'用户管理'" :params2="'参数列表'"></bread>

    <el-card class="box-card">
      <!-- 第一块 -->
      <el-alert
        :closable="false"
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
      >
      </el-alert>

      <!-- 第二块 -->
      <div style="margin:20px  0">
        选择商品分类：<el-cascader
          :options="options"
          :props="props"
          v-model="selectedOptions"
          @change="handleChange"
        >
        </el-cascader>
      </div>
      <!-- 第三块 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" :disabled="disabled">添加参数</el-button>
          <el-table style="width: 100%">
            <el-table-column width="180"> </el-table-column>
            <el-table-column label="#" width="180"></el-table-column>
            <el-table-column label="参数名称"> </el-table-column>
            <el-table-column label="操作"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" :disabled="disabled"
            >添加属性</el-button
          ></el-tab-pane
        >
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { cate_api } from "@/api";
export default {
  data() {
    return {
      options: [],
      disabled: true,
      props: {
        children: "children",
        label: "cat_name",
        value: "cat_id"
      },
      selectedOptions: [],
      selectedOptions2: [],
      activeName: "second"
    };
  },
  created() {
    this.getParamsData();
  },
  methods: {
    async getParamsData() {
      const { data: res } = await cate_api({ type: 3 });
      // console.log(res, 1111);
      this.options = res.data;
    },
    handleChange(value) {
      console.log(value, 999999);
      if (value.length != 3) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped></style>
