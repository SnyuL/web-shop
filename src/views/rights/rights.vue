<template>
  <div>
    <bread :params1="'权限管理'" :params2="'权限列表'"></bread>

    <el-card class="box-card">
      <el-table
        ref="singleTable"
        :data="rightList"
        border
        highlight-current-row
        style="width: 100%;margin:15px  0"
      >
        <el-table-column type="index" width="50" label="#"> </el-table-column>
        <el-table-column property="authName" label="权限名称" width="300">
        </el-table-column>
        <el-table-column property="path" label="路径" width="300">
        </el-table-column>

        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <!-- <pre>{{ scope.row }}</pre> -->
            <el-tag type="primary" v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { rights_api } from "../../api/index";
export default {
  data() {
    return {
      rightList: []
    };
  },
  created() {
    this.getRightsData();
  },
  methods: {
    async getRightsData() {
      const { data: res } = await rights_api("list");
      console.log(res, 111);
      this.rightList = res.data;
    }
  }
};
</script>

<style scoped></style>
