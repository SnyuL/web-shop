<template>
  <div class="Login-container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="btn-box">
          <el-button size="small" type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button size="small" @click="resetForm('ruleForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login_api } from "../api/index";
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this, 999);
          // console.log(this.ruleForm, 777);
          //  如果valid为true   表示校验满足规则  可以发送请求
          // this.$axios.post("/login", this.ruleForm).then(res => {
          //   console.log(res, 666);

          //   //如果登录成功则会转到home界面，否则弹出提示框
          //   // console.log(res.status);
          //   if (res.data.meta.status == 200) {
          //     this.$message.success("恭喜你登录成功");
          //     this.$router.push("/Home");
          //     console.log(this.$router, 123456);
          //   } else {
          //     this.$message.error(res.data.meta.msg);
          //   }
          // });
          // alert("登录成功!");

          //2.二次验证方式
          const res = await login_api(this.ruleForm);
          console.log(res);
          if (res.data.meta.status == 200) {
            this.$message.success("恭喜你登录成功");

            //将token存储到本地
            window.sessionStorage.setItem("token", res.data.data.token);
            this.$router.push("/Home");
            console.log(this.$router, 123456);
          } else {
            this.$message.error(res.data.meta.msg);
          }
        } else {
          console.log("错误密码!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped lang="less">
.Login-container {
  background-color: #2b4b6b;
  height: 100%;
  width: 100%;
  .login_box {
    background-color: #fff;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    border-radius: 3px;
    top: 50%;
  }
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    -webkit-box-shadow: 0 0 10px #ddd;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el-form {
    margin-top: 80px;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .btn-box {
    text-align: right;
  }
}
</style>
