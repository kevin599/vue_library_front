<template>
  <div id="container">
    <div class="login_box">
      <el-form
        label-width="0"
        class="login_form"
        :rules="loginFormRules"
        :model="loginForm"
        ref="loginFormRef"
      >
        <div class="title">登 录 界 面</div>
        <!-- 用户名 -->

        <el-form-item prop="id">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.id"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-mima"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn">
          <el-button
            class="confirm"
            type="primary"
            @click="loginFormLogin"
            style="background-color: #203d8d"
            >登录</el-button
          >
          <el-button class="cancel" type="info" v-on:click="register"
            >注册</el-button
          >
          <!-- <el-button class="cancel" type="info" v-on:click="loginFormCancel"
            >取消</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      loginForm: {
        // admin
        // id: "001",
        // password: "admin",
        // user
        id: "111",
        password: "user",
        // id: "",
        // password: "",
      },

      loginFormRules: {
        id: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods: {
    //点击重置按钮 resetFields():对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    loginFormCancel() {
      this.$refs.loginFormRef.resetFields()
    },
    //
    loginFormLogin() {
      console.log("line88", this.loginForm)
      // 管理员首页
      // this.$router.push("/home")
      // 用户首页
      // this.$router.push("/user_home")
      this.$refs.loginFormRef.validate(async (bool, obj) => {
        if (!bool) return

        this.$http
          .post("http://localhost:3000/login/selectUser", this.loginForm)
          .then((response) => {
            console.log("line90:", response.data)
            if (response.data == -1) {
              this.$message({
                type: "error",
                message: "用户不存在",
              })
              console.log("该用户不存在")
              return 
            } else if (response.data == 0) {
              this.$message({
                type: "error",
                message: "密码错误",
              })
              console.log("密码错误")
              return 
            } else if (response.data == "admin") {
              console.log(response.data)
              //跳转到管理员首页
              this.$router.push("/home")
              //将登录数据注入到sessionStorage中
              sessionStorage.setItem("id", this.loginForm.id)
            } else if (response.data == "user") {
              console.log(response.data)
              //跳转到用户首页
              this.$router.push("/user_home")
              //将登录数据注入到sessionStorage中
              sessionStorage.setItem("id", this.loginForm.id)
            }
          })
          .catch((error) => {
            console.log(error)
            return false
          })

        // 1. 登录成功后的token，保存到客户端的sessionStorage中，
        // console.log(res);
        // window.sessionStorage.setItem("token", res.data.token)
        //    1. 项目中除了登录之外的其他api接口都必须在登录之后才能访问
        //    2. token只应在当前网站打开之间生效，所以将token保存在sessionStorage中
        //  2. 通过编程式导航跳转到后台主页，路由地址是/home
        // this.$router.push("/home")
      })
    },
  },
}
</script>

<style scoped>
.login_bg {
  background: url("../assets/images/login.jpg") center no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
#container {
  background: url("../assets/images/login_3.jpg") no-repeat center;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: rgba(230, 230, 230, 0.76);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  background-color: #fff;
  width: 130px;
  height: 130px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 这个-50%是根据这个盒子的宽高来位移的 */
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btn {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: flex-end; */
  width: 100%;
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.confirm {
  width: 100%;
  margin-bottom: 5px;
}
.cancel {
  width: 100%;
}
.el-button + .el-button {
  margin-left: 0;
}
.title {
  text-align: center;
  /* font-weight: 900; */
  font-size: 2rem;
  margin-bottom: 40px;
  color: #fff;
}
</style>
