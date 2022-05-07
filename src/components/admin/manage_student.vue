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
          <el-table-column sortable prop="user_department" width="120" label="专业"> </el-table-column>
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
      <el-form :model="form">
        <el-form-item label="ID" class="row" >
          <el-input v-model="form.user_id" style="width: 400px" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="row">
          <el-input v-model="form.user_name" style="width: 400px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色" class="row">
          <el-input v-model="" style="width: 400px"></el-input>
        </el-form-item> -->
        <el-form-item label="性别" class="row">
          <el-input v-model="form.user_sex" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="专业" class="row">
          <el-input v-model="form.user_department" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="班级" class="row">
          <el-input v-model="form.user_class" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" class="row">
          <el-input v-model="form.user_mobile" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
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
    return {
      users: [
        {
          id: "1",
          name: "张三",
          mobile: "13888888888",
          department: "计算机学院",
          sex: "男",
          class: "2班",
        },
        {
          id: "2",
          name: "李四",
          mobile: "13888888888",
          department: "土木工程学院",
          sex: "男",
          class: "1班",
        },
        {
          id: "3",
          name: "王五",
          mobile: "13888888888",
          department: "外语学院",
          sex: "女",
          class: "21班",
        },
        {
          id: "4",
          name: "赵六",
          mobile: "13888888888",
          department: "会计学院",
          sex: "女",
          class: "6班",
        },
      ],
      keywords: "",
      pageSize: 10,
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
    ...mapActions([
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
</style>
