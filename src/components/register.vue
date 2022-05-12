<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <div style="text-align: center; font-weight:bolder">注册</div> -->
            <h2 style="text-align: center">用户注册</h2>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item label="注册ID" prop="user_id">
              <el-input
                type="user_id"
                v-model="ruleForm.user_id"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="user_name">
              <el-input
                type="user_name"
                v-model="ruleForm.user_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="user_password">
              <el-input
                type="password"
                v-model="ruleForm.user_password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="check_user_password">
              <el-input
                type="password"
                v-model="ruleForm.check_user_password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="user_mobile">
              <el-input v-model="ruleForm.user_mobile"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="user_class">
              <el-input v-model="ruleForm.user_class"></el-input>
            </el-form-item>

            <el-form-item label="专业" prop="user_department">
              <el-input v-model="ruleForm.user_department"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="user_sex">
              <el-select v-model="ruleForm.user_sex" placeholder="请选择性别">
                <el-option
                  v-for="item in sex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item>
              <el-radio v-model="ruleForm.user_roles" label="1">注册普通用户</el-radio>
              <el-radio v-model="ruleForm.user_roles" label="0">注册管理员</el-radio>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
              <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
              <el-button @click="toLogin()">返回</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="账号注册成功！"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>{{ countdown }}</span
      >s后跳自动转至登录页面...
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="toLogin">🐎 上 跳 转</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "Register",

  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"))
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }, 1000)
    // }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm.check_user_password !== "") {
          this.$refs.ruleForm.validateField("check_user_password")
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.ruleForm.user_password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    var check_user_id = (rules, value, callback) => {
      this.$http
        .post("http://localhost:3000/register/register_check_user_id", {
          user_id: value,
        })
        .then((response) => {
          //   console.log("register,check_user_id,line123:", response.data)
          if (response.data == -1) {
            callback()
          } else {
            callback("该用户ID已被注册")
          }
        })
    }
    return {
      countdown: 3,
      centerDialogVisible: false,
      ruleForm: {
        user_id: "123123123123",
        user_name: "123",
        user_password: "123123",
        check_user_password: "123123",
        user_mobile: "13512312312",
        user_class: "123",
        user_sex: "",
        user_department: "123",
        user_roles: "1",
      },
      rules: {
        user_password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        check_user_password: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
        user_id: [
          { required: true, message: "请输入注册ID", trigger: "blur" },
          {
            min: 10,
            max: 13,
            message: "长度在 10 到 13 个字符",
            trigger: "blur",
          },
          { validator: check_user_id, trigger: "blur" },
        ],
        user_name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
        ],
        user_mobile: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern:
              /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        user_sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
      },
      //
      sex: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
    }
  },

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          this.register_user(this.ruleForm).then(() => {
            this.centerDialogVisible = true
            this.countdown1()
          })
        } else {
          this.$message({
            type: "error",
            message: "请填写完整信息",
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toLogin() {
      this.$router.push("/login")
    },
    countdown1() {
      let timer = window.setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
          console.log(this.countdown)
          this.countdown1()
        } else {
          window.clearInterval(timer)
          this.$router.push("/login")
        }
      }, 1000)
    },

    ...mapActions(["register_check_user_id", "register_user"]),
  },
}
</script>

<style lang="scss" scoped></style>
