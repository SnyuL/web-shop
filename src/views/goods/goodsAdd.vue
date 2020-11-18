<template>
  <div class="goods-container">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <bread :params1="'商品管理'" :params2="'添加商品'"></bread>

    <el-card class="box-card">
      <!-- 1部分 -->
      <el-alert title="消息提示的文案" type="info" center show-icon> </el-alert>
      <!-- 2部分 -->
      <div style="padding:40px">
        <el-steps :space="200" :active="+activeName" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <!-- 3部分 -->
      <el-tabs :tab-position="tabPosition" v-model="activeName" :before-leave="beforeLeave">
        <el-tab-pane label="基本信息" name="0">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="goods_name">
              <br />
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="goods_price">
              <br />
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>

            <el-form-item label="商品重量" prop="goods_weight">
              <br />
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>

            <el-form-item label="商品数量" prop="goods_number">
              <br />
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>

            <el-form-item label="商品分类" prop="goods_cat">
              <br />
              <el-cascader :options="options" :props="props" v-model="ruleForm.goods_cat" @change="handleChange"> </el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <div class="box" v-for="(item, index) in manyData" :key="index">
            <h3>{{ item.attr_name }}</h3>

            <el-tag style="margin:10px;" v-for="(item2, index2) in item.attr_vals" :key="index2">{{ item2 }}</el-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <!-- <div
                        class="box2"
                        v-for="(item, index) in tableData"
                        :key="index"
                    >
                        <h3>{{item.attr_name}}</h3>

                        <el-tag
                            style="margin:10px;"
                            v-for="(item2, index2) in item.attr_vals"
                            :key="index2"
                        >{{item2==''?'暂无数据':item2}}</el-tag>
                    </div> -->
          <div class="box2" style="margin:20px 0 " v-for="(item, index) in onlyData" :key="index">
            <h3>{{ item.attr_name }}</h3>
            <el-input type="text" :value="item.attr_vals.join(' ')" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload class="upload-demo" :action="url" :headers="headers" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor v-model="ruleForm.goods_introduce" ref="myQuillEditor"> </quill-editor>
          <el-button @click="submitAddGoods" style="margin:20px" size="small" type="primary">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 图片放大 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleImg" width="50%">
      <img :src="srcURL" alt="" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleImg = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleImg = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
/* 富文本 */

import { quillEditor } from 'vue-quill-editor' //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { cate_api, params_api, upload_api, goodsAdd_api } from '@/api'
export default {
  components: {
    quillEditor
  },

  data() {
    return {
      tabPosition: 'left',
      activeName: '0',

      //  第一层、
      ruleForm: {
        goods_name: 'goods_name',
        goods_price: '11',
        goods_weight: '22',
        goods_number: '33',
        goods_cat: [2227, 2304, 2313],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入goods_name', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入goods_price', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入goods_weight', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入goods_number', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入goods_cat', trigger: 'blur' },
          { min: 3, max: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },

      options: [],
      props: {
        children: 'children',
        label: 'cat_name',
        // value: ''
        value: 'cat_id'
      },

      /* 二级 */
      manyData: [],
      onlyData: [],

      /* 图片上传 */
      fileList: [],
      url: 'http://klxin.cn:8888/api/private/v1/upload',
      srcURL: '',
      dialogVisibleImg: false,
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  created() {
    //  获取的是级联选择器的数据
    this.getParamsData()
  },
  methods: {
    async getParamsData() {
      const { data: res } = await cate_api({ type: 3 })
      // console.log(res, 2222222)
      this.options = res.data
    },
    handleChange(value) {
      // console.log(value, 8888)
    },

    /* tabs切换事件 */
    beforeLeave(activeName, oldActiveName) {
      console.log(activeName, oldActiveName, 777888)
      if (activeName != 0) {
        console.log(this, 8888)
        //  只要是点击的不是自己【不是0】  就需要判断数组的长度 ==3
        ///  如果等于3就说明选择了  就可以切换  否则  就跳转不过去  显示提示
        if (this.ruleForm.goods_cat.length == 3) {
          //  去的是第二个tabs
          if (activeName == 1) {
            // console.log(123)
            this.getParamsList(this.ruleForm.goods_cat[2], 'many')
          }

          /* 第三层 */
          if (activeName == 2) {
            // console.log(123)
            this.getParamsList(this.ruleForm.goods_cat[2], 'only')
          }

          return true
        } else {
          return false
        }
      }
    },

    /* 商品参数 */
    //  封装发送请求获取  表格参数列表数据
    async getParamsList(id, sel) {
      const { data: res } = await params_api({
        id: id,
        sel: sel
      })
      //  将获取的值赋值给表格数组
      /* 
      //   给每一项添加一个属性  ====控制按钮和表单显示的
      res.data.forEach(item => {
        item.inputVisible = false
        item.inputValue = ''
        item.attr_vals = item.attr_vals.split(' ')
      })

      */

      res.data.forEach(item => {
        item.attr_vals = item.attr_vals.split(' ')
        this.ruleForm.attrs.push({
          attr_id: item.attr_id,
          attr_vals: item.attr_vals.join(' ')
        })
      })
      if (sel == 'many') {
        this.manyData = res.data.slice(0, 5)
      } else {
        this.onlyData = res.data.slice(0, 5)
      }

      console.log(res, 2222)
    },

    /* 图片上传 */
    handleRemove(file, fileList) {
      console.log(file, fileList, 7788)
      var newArr = [] ///  [{pic:item.response.data.tmp_path},{pic:item.response.data.tmp_path}]

      //  获取删除后的图片
      fileList.forEach(item => {
        newArr.push({ pic: item.response.data.tmp_path })
      })

      //  将最后删除后的图片数据重新赋值给 pic数组
      this.ruleForm.pics = newArr

      console.log(this.ruleForm, 777666)
    },
    handlePreview(file) {
      console.log(file, 88888)
      /* 
      图片的预览

      1-显示对话框   
      2-将图片显示在对话框中并且显示的是  大图片
      */

      this.dialogVisibleImg = true
      this.srcURL = file.url
    },

    /* 上传成功后的钩子 */
    handleSuccess(response, file, fileList) {
      this.ruleForm.pics.push({ pic: response.data.tmp_path })
    },

    /* 添加商品 */
    async submitAddGoods() {
      //console.log(this.ruleForm, 333444555)

      /* 
      为什么需要使用深拷贝
      因为分类id获取的数据类型是【】
      而我们发送请求的时候获取的是字符串   所以不能改原始数据类型  就需要使用 深拷贝
      lodash
      var objects = [{ 'a': 1 }, { 'b': 2 }];
 
      var deep = _.cloneDeep(objects);
      console.log(deep[0] === objects[0]);
      // => false
      
      
      */

      /* 
     研究对象===研究对象的三要素
     属性、
     方法
     回调函数  
     */

      var deepForm = _.cloneDeep(this.ruleForm)

      deepForm.goods_cat = deepForm.goods_cat.join(',')
      // console.log(deepForm, 555666111)

      //  发送请求
      const { data: res } = await goodsAdd_api(deepForm)
      // console.log(res, 11111)
      this.$router.push({ path: '/goods' })
    }
  }
}
</script>
<style scoped></style>
