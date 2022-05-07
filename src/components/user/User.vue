<template>
  <!-- 面包屑导航 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片内容 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="userInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button></el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="180">
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template v-slot="scope">
            <!-- {{scope.row}} 这一行的用户信息> -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="userInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px; text-align: center"
      >
      </el-pagination>

      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible="dialogVisible"
        width="30%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisable"
        width="50%"
        @close="editDialogClosed"
      >
        <!-- <span>这是一段信息</span> -->
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisable = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",

  data() {
    return {
      // 获取用户信息列表
      userInfo: {
        // 查询参数
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 2,
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }],
      },
      //修改用户对话框的显示与隐藏
      editDialogVisable: false,
      //查询到的用户信息
      editForm: {},
      // 修改用户信息表单验证
      editFormRules: {
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          // { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          // { validator: checkMobile, trigger: "blur" },
        ],
      },
    }
  },

  created() {
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.userInfo,
      })
      // console.log(res)
      if (res.meta.status !== 200)
        return this.$message.error("获取用户数据失败")
      this.userList = res.data.users
      this.total = res.data.total
    },
    //pageSize改变的事件
    handleSizeChange(newSize) {
      this.userInfo.pagesize = newSize
      this.getUserList()
    },
    // 页码值改变的事件
    handleCurrentChange(newChange) {
      this.userInfo.pagenum = newChange
      this.getUserList()
    },
    async userStateChange(row) {
      console.log(row)
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      )
      if (res.meta.status !== 200) {
        row.mg_state = !row.mg_state
        return this.$message.error("更新用户状态失败！")
      }
      this.$message.success("更新用户状态成功！")
    },
    // async searchUserInfo() {
    //   const { data : res } = await this.$http.get(`users/${this.userInfo.query}`)
    //   console.log(res)
    // },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //点击添加新用户按钮后，先对表单数据进行预校验再关闭dialog
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid);
        //校验不通过 直接return
        if (!valid) return
        //校验通过 发起添加用户网络请求
        const { data: res } = await this.$http.post("users", this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error("添加用户失败")
          return
        }
        this.$message.success("添加用户成功")
        //关闭添加用户对话框
        this.dialogVisible = false
        
        //重新获取用户列表
        this.getUserList()
      })
    },
    //展示编辑用户的对话框
    async showEditDialog(id) {
      // console.log(id)
      const { data: res } = await this.$http.get("users/" + id)
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户失败!")
      }
      this.editForm = res.data
      console.log(this.editForm)
      this.editDialogVisable = true
    },
    // 修改用户信息对话框关闭
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return
        //发起修改用户信息请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error("修改用户信息失败")
        }
        //关闭修改用户信息窗口
        this.editDialogVisable = false
        //刷新用户列表
        this.getUserList()
        //提示修改成功
        this.$message.success("修改用户信息成功")
      })
    },
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        // .then(() => {
        //   this.$message({
        //     type: "success",
        //     message: "删除成功!",
        //   })
        // })
        .catch(
          (err) => err
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // })
        )
      console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除")
      }
      // console.log("confirm delete")
      const { data: res } = await this.$http.delete("users/" + id)
      if(res.meta.status !==200){
        return this.$message.error('删除用户信息失败！')
      }
      this.$message.success('删除用户成功')
      this.getUserLis()
    },
  },
}
</script>

<style lang="css" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
/* 添加用户表单 验证信息通过时 表单输入框变为绿色 */
.is-success .el-input {
  border: 1px solid greenyellow !important;
  border-radius: 5px;
}
</style>
