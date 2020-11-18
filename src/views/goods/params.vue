<template>
  <div class="params-container">
    <bread :params1="'商品管理'" :params2="'参数列表'"></bread>

    <el-card class="box-card">
      <!-- 第一块 -->
      <el-alert title="警告提示的文案" type="warning" show-icon> </el-alert>
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
        <!-- 第一个  el-tab-pane -->
        <el-tab-pane label="动态参数" name="many">
          <el-button @click="addParams" type="primary" :disabled="disabled"
            >添加参数</el-button
          >
          <el-table :data="manyData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 
                  数组没有长度  就不显示   el-tag   否则  就显示
                 -->

                <span class="aaa" v-if="scope.row.attr_vals[0] != ''">
                  <el-tag
                    closable
                    @close="handleClose(scope.row, index)"
                    v-for="(item, index) in scope.row.attr_vals"
                    :key="index"
                    style="margin:10px"
                  >
                  </el-tag>
                </span>

                <el-input
                  style="width:80px"
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="attr_name" label="参数名称" width="180">
            </el-table-column>

            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" @click="handleEdit()"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" @click="handleDelete()"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 第二个  el-tab-pane -->
        <el-tab-pane label="静态属性" name="only">
          <el-button @click="addParams" type="primary" :disabled="disabled"
            >添加属性</el-button
          >
          <el-table :data="onlyData" style="width: 100%">
            <el-table-column prop="attr_name" label="参数名称" width="180">
            </el-table-column>

            <el-table-column label="操作">
              <template>
                <el-button size="mini" @click="handleEdit()">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete()"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数 -->
    <el-dialog
      :title="activeName == 'many' ? '添加动态参数' : '添加静态属性'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="qqq">
        <el-form-item
          prop="name"
          label="活动名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <!-- <el-button @click="resetForm('qqq')">取消</el-button> -->
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { cate_api, params_api, addParams_api, addAttributes_api } from "@/api";
export default {
  data() {
    return {
      /* 需要的参数 */

      options: [],
      props: {
        children: "children",
        label: "cat_name",
        // value: ''
        value: "cat_id"
      },
      selectedOptions: [],
      selectedOptions2: [],
      manyData: [],
      onlyData: [],

      activeName: "many",

      /* 添加参数 */
      dialogFormVisible: false,
      form: {
        name: "1111"
      },
      formLabelWidth: "120px",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    //  获取的是级联选择器的数据
    this.getParamsData();
  },
  methods: {
    async getParamsData() {
      const { data: res } = await cate_api({ type: 3 });
      console.log(res, 2222222);
      this.options = res.data;
    },
    //  点击级联选择器
    handleChange(value) {
      // console.log(value, 999999)
      // if (value.length != 3) {
      //   this.disabled = true
      // } else {
      //   this.disabled = false
      //   //  需要发送请求
      // }

      //  获取参数列表数据
      this.getParamsList();
    },

    //  封装发送请求获取  表格参数列表数据
    async getParamsList() {
      const { data: res } = await params_api({
        id: this.cateId,
        sel: this.activeName
      });
      //  将获取的值赋值给表格数组

      //   给每一项添加一个属性  ====控制按钮和表单显示的
      res.data.forEach(item => {
        item.inputVisible = false;
        item.inputValue = "";
        item.attr_vals = item.attr_vals.split(" ");
      });

      console.log(res, 2222);

      if (this.activeName == "many") {
        this.manyData = res.data;
      } else {
        this.onlyData = res.data;
      }
    },

    handleClick(tab, event) {
      //console.log(tab, event)
      //  点击切换标签页 需要再次根据参数属性发送请求
      //  获取参数列表数据
      if (this.cateId) {
        this.getParamsList();
      }
    },

    handleEdit() {},
    handleDelete() {},
    /* 表单失去焦点函数   */
    async handleInputConfirm(rows) {
      console.log(rows, 7788);
      rows.inputVisible = !rows.inputVisible;

      //  获取表单值并校验
      if (rows.inputValue.trim().length != 0) {
        //var attr_vals = rows.attr_vals.push(rows.inputValue).join(',')
        var attr_vals = [...rows.attr_vals, rows.inputValue].join(" ");

        rows.attr_vals.push(rows.inputValue);

        const { data: res } = await addParams_api({
          id: this.cateId,
          attr_name: rows.attr_name,
          attr_sel: this.activeName,
          attr_vals: attr_vals,
          attrId: rows.attr_id
        });
        console.log(res, 66666);
        //rows.attr_vals=res.data.attr_vals

        //  清空原始数据
        rows.inputValue = "";
      }
      //
    },
    /* 点击就实现按钮和表单切换显示的函数 */
    showInput(rows) {
      rows.inputVisible = !rows.inputVisible;

      //  表单聚焦
      // console.log(this, 3333)

      // this.$refs.saveTagInput.focus()
      // 出现获取不到的根本原因就是：元素都是动态生成的，在挂载属性的时候 元素还没有渲染出来，相当于自定义的ref属性没有挂在上去======
      /* 
     解决方案：等所有的结构加载完毕后在渲染  在获取dom元素    this.$nextTick()====代表的是所有的元素加载渲染完成后执行
     */

      this.$nextTick(() => {
        console.log(this.$refs.saveTagInput, 777888);
        this.$refs.saveTagInput.focus();
      });
    },

    /* 删除属性 */
    async handleClose(rows, index) {
      // var attr_vals = [...rows.attr_vals, rows.inputValue].join(' ')
      rows.attr_vals.splice(index, 1); //   删除你点击的哪一行

      const { data: res } = await addParams_api({
        id: this.cateId,
        attr_name: rows.attr_name,
        attr_sel: this.activeName,
        attr_vals: rows.attr_vals.join(" "),
        attrId: rows.attr_id
      });
    },

    //  添加参数
    addParams() {
      //  显示对话框

      this.dialogFormVisible = true;
    },
    /* 取消 */
    // resetForm(form1){
    //   //  this.$refs[form]    获取的form的dom对象
    //   this.$refs[form1].resetFields();
    // },
    resetForm() {
      //  this.$refs[form]    获取的form的dom对象
      this.$refs.qqq.resetFields();
      this.dialogFormVisible = false;
    },
    /* 确认 */
    submitForm() {
      this.$refs.qqq.validate(async valid => {
        if (valid) {
          //  发送请求
          const { data: res } = await addAttributes_api({
            id: this.cateId,
            attr_name: this.form.name,
            attr_sel: this.activeName
          });
          console.log(res, 5555);

          this.dialogFormVisible = false;
          //  获取参数列表数据
          this.getParamsList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    //  定义按钮是否禁用
    disabled() {
      if (this.selectedOptions.length != 3) {
        //  没有选择第三项
        return true;
      } else {
        return false;
      }
    },
    //  获取分类id  就是选中的数组的最后一项
    cateId() {
      if (this.selectedOptions.length != 3) {
        //  没有选择第三项
        return null;
      } else {
        return this.selectedOptions[this.selectedOptions.length - 1];
      }
    }
  }
};
</script>
<style scoped></style>
