<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ params1 }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ params2 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ["params1", "params2"]
};
</script>
<style scoped lang="less">
.el-breadcrumb {
  margin: 15px 0 25px;
}
</style>
