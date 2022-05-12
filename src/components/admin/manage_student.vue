<template>
  <el-card class="StudentInfo">
    <el-row>
      <el-col :span="8">
        <el-input
          placeholder="请输入学生学号或姓名进行查询"
          prefix-icon="el-icon-search"
          v-model="keywords"
          @change="findQuery"
        >
        </el-input>
        
      </el-col>
      <el-button
        type="primary"
        @click="addManagerDialog = true"
        style="float: right; margin-right: 80px"
        >添加管理员</el-button
      >
      <!-- <el-col :span="18"> </el-col> -->
    </el-row>
    <el-row class="tabletop" style="text-align: center">
      <el-col>
          <!-- height="510" -->
          <!-- :data="students" -->
          <!-- stripe -->
          <!-- stripe 斑马行表格，加了这个不显示管理员底色 -->
          <el-table
          :data="students.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%; text-align: center"
          border
          header-cell-style="{text-align:center;background-color:#FAFAFA;}"
          :row-class-name="isadmin"
          >
          <!-- :default-sort = "{prop: 'user_id', order: 'descending'}" -->
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <el-table-column sortable prop="user_id" label="ID" width="150"> </el-table-column>
          <el-table-column sortable prop="user_name" label="姓名"> </el-table-column>
          <el-table-column sortable prop="user_roles" :formatter="user_roles_format" label="角色" width="100"></el-table-column>
          <el-table-column sortable prop="user_sex" label="性别" width="80"></el-table-column>
          <el-table-column sortable prop="user_department" width="120" label="专业/部门"> </el-table-column>
          <el-table-column sortable prop="user_class" label="班级"> </el-table-column>
          </el-table-column>
          <el-table-column prop="user_mobile" width="200" label="手机号码">
          </el-table-column>
          <el-table-column label="操作" width="184">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
                <el-pagination :total="students.length" :current-page="currentPage" :page-size="pageSize"
                 @current-change="handleCurrentChange" 
                 layout="total,prev,pager,next,jumper"></el-pagination>
            </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      width="40%"
    >
      <el-form :model="form" label-position="left" label-width="80px" :rules="rules" status-icon>
        <el-form-item label="ID" class="row" >
          <el-input v-model="form.user_id" style="width: 400px" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="row" prop="user_name">
          <el-input v-model="form.user_name" style="width: 400px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色" class="row">
          <el-input v-model="" style="width: 400px"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="性别" class="row">
          <el-input v-model="form.user_sex" style="width: 400px"></el-input>
        </el-form-item> -->
        <el-form-item label="性别" prop="user_sex">
          <el-select v-model="form.user_sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业/部门" class="row">
          <el-input v-model="form.user_department" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="班级" class="row">
          <el-input v-model="form.user_class" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" class="row" prop="user_mobile">
          <el-input v-model="form.user_mobile" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  <!-- 添加管理员对话框 -->
    <el-dialog title="添加管理员用户" :visible.sync="addManagerDialog">
      <el-form label-position="left" label-width="100px" :model="addManagerForm" status-icon :rules="rules" ref="addManagerForm">
        <el-form-item label="管理员ID" prop="user_id">
          <el-input v-model="addManagerForm.user_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" prop="user_name">
          <el-input v-model="addManagerForm.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_password">
          <el-input v-model="addManagerForm.user_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="check_user_password">
          <el-input v-model="addManagerForm.check_user_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="user_mobile">
          <el-input v-model="addManagerForm.user_mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="user_sex">
          <el-select v-model="addManagerForm.user_sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" >
          <el-input v-model="addManagerForm.user_department" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addManagerDialog = false">取 消</el-button>
        <el-button type="primary" @click="addManager('addManagerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  name: "ManageStudent",
  computed: {
    ...mapGetters(["students"]),
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.addManagerForm.check_user_password !== "") {
          this.$refs.addManagerForm.validateField("check_user_password")
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.addManagerForm.user_password) {
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
      addManagerDialog: false,
      addManagerForm: {
        user_id: "admin100000",
        user_name: "admin",
        user_password: "123456",
        check_user_password: "123456",
        user_mobile: "13510000000",
        user_sex:"",
        user_department:""
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
      keywords: "",
      pageSize: 8,
      currentPage: 1,
      dialogFormVisible: false,
      dialogFormVisiblesave: false,
      form: {},
      formsave: {},
      title: "",
      titlesave: "",
    }
  },
  created() {
    this.findAllStudents()
  },
  methods: {
    //表格数据 user_roles为0的显示管理员,1的显示普通用户
    user_roles_format(row,index){
        if (row.user_roles === 0) {
        return '管理员'
    } else  {
        return '普通用户'
    } 

    },

    //表格数据 如果是管理员就显示绿色
    isadmin({row, rowIndex}) {
        // console.log('isadmin-line163',row);
        // if (row.user_roles === 1) {
        //   return 'success-row';
        // } else 
        if (row.user_roles === 0) {
          return 'warning-row';
        }
        return '';
      
      },
    // 分页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // 模糊查询
    findQuery() {
      var params = { keys: this.keywords }
      console.log(params)
      this.findQueryStudent(params)
    },
    // 修改按钮
    handleEdit(index, row) {
      this.form = row
    //   console.log('line186修改按钮:',this.form);
      this.title = "修改用户信息"
      this.dialogFormVisible = true
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除用户ID为: ${row.user_id} 的记录，是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = [row.user_id]
          this.batchDeleteStudent(ids)
            .then((data) => {
              this.findAllStudents()
              this.$message({
                type: "success",
                message: "删除成功!",
              })
            })
            .catch((error) => {
              this.$message({
                type: "false",
                message: "删除失败!",
              })
            })
        })
        .catch(() => {
          this.$message({
            type: "false",
            message: "已取消操作",
          })
        })
    },
    // 确定按钮
    handleSubmit() {
            this.dialogFormVisible=false;
            var vm=this;
            if(this.title=="修改用户信息"){
                console.log('line225修改用户信息:',this.form);
              this.updateStudent(this.form).then(function(data){
                vm.$message({
                  type:'success',
                  message:'修改成功'
                });
              }).catch(function(error){
                vm.$message({
                  type:'error',
                  message:'修改失败!'
                });
              });
            }
          },
          // 添加管理员
          addManager(addManagerForm){
            this.addManagerDialog = false;
            console.log('添加确认',this.addManagerForm);
            this.$refs[addManagerForm].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          this.register_manager(this.addManagerForm).then(() => {
            this.findAllStudents()
            this.$message({
              type:'success',
              message:'管理员注册成功！'
            })
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
    ...mapActions([
      "register_manager",
      "findAllStudents",
      "saveStudent",
      "updateStudent",
      "batchDeleteStudent",
      "findQueryStudent",
    ]),
  },
}
</script>

<style>
  /* 为什么所有的.success-row样式都在这里定死了啊,重新定义都不行？scope也没用 */
    .el-table .success-row {
    background: #e0cfc5;
  }
    .el-table .warning-row {
    background: #d6f4c4;
  }
.tabletop {
  padding: 20px 0;
}

.row {
  margin-left: 18px;
}
.el-form-item--feedback .el-input__validateIcon {
    color: #67c23a;
}
</style>
