<template>
  <div id="usercenter">
    <div class="userContent">
      <h3>修改信息</h3>
      <el-form
        ref="form"
        :model="form"
        label-width="60px"
        :rules="rule"
        status-icon
      >
        <el-form-item label="学号" prop="Student_code">
          <el-input v-model="form.user_id" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="user_name">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="user_department">
          <el-input v-model="form.user_department"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="user_class">
          <el-input v-model="form.user_class"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="user_sex">
          <el-select
            class="select-sex"
            v-model="form.user_sex"
            placeholder="请选择性别"
          >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="号码" prop="user_mobile">
          <el-input v-model="form.user_mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="info"
            @click.native.prevent="reset"
            style="float: right"
            >重置</el-button
          >
          <el-button
            type="primary"
            style="float: right; margin-right: 20px"
            @click="submitForm('form')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_id: sessionStorage.getItem("id"),
        user_name: "",
        user_department: "",
        user_class: "",
        user_sex: "",
        user_mobile: "",
      },
      rule: {
        user_name: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
        user_departtment: [
          {
            required: true,
            message: "请输入专业",
            trigger: "blur",
          },
        ],
        user_class: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur",
          },
        ],
        user_sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
        ],
        user_mobile: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur",
          },
        ],
      },
    }
  },

  mounted() {
    this.getUserData()
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
    },
    getUserData() {
      var params = { id: sessionStorage.getItem("id") }
      console.log(params)
      this.$http
        .get("http://localhost:3000/student/findStudent", { params })
        .then((response) => {
          let result = response.data[0]
          this.form.user_name = result.user_name
          this.form.user_department = result.user_department
          this.form.user_class = result.user_class
          this.form.user_sex = result.user_sex
          this.form.user_mobile = result.user_mobile
        })
        .then(function (error) {
          console.log(error)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$http.post('http://localhost:3000/student/updateinfo',this.form).then((data) => {
                  this.$message({
                  type:'success',
                  message:'修改成功'
                  });
              }).catch(function(error){
                  this.$message({
                  type:'error',
                  message:'修改失败!'
                  });
              });
              } else {
              console.log('error submit!!');
              }
          });
    },
  },
}
</script>

<style>
.userContent {
  width: 400px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 20px 10px 10px;
  border-radius: 8px;
}

.select-sex {
  width: 340px;
}
#usercenter {
  margin-top: 40px;
}
h3 {
  text-align: center;
}
</style>
