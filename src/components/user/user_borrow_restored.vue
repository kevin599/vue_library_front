<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane name="first">
        <span slot="label"
          ><i class="el-icon-remove-outline"></i>&nbsp;书籍借阅记录</span
        >
        <!-- 查看个人书籍归还记录 -->
        <div class="BookRecord">
          <el-row class="tabletop" style="text-align: center">
            <el-col>
              <el-table
                :data="records"
                style="width: 100%; text-align: center"
                height="440"
                border
                header-cell-style="text-align:center;background-color:#f0f9eb;"
              >
                <el-table-column
                  prop="borrow_id"
                  label="借阅编号"
                  class="bookname"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="书名"
                  class="bookname"
                ></el-table-column>
                <el-table-column
                  prop="user_id"
                  label="用户ID"
                ></el-table-column>
                <el-table-column
                  prop="borrow_time"
                  label="借书日期"
                  :formatter="dateFormat"
                >
                </el-table-column>
                <el-table-column
                  prop="restore_time"
                  label="应还书日期"
                  :formatter="dateFormat"
                ></el-table-column>
                <!-- 借书记录这里还书 -->
                <el-table-column label="操作" width="160">
                  <template slot-scope="scope">
                    <!-- disabled=" state == 0 ? true : false" -->
                    <el-button
                      v-model="types"
                      round
                      type="success"
                      plain
                      icon="el-icon-time"
                      @click="handleReturn(scope.$index, scope.row)"
                      size="small"
                      >还书</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second" type="border-card">
        <span slot="label"
          ><i class="el-icon-circle-plus"></i>&nbsp;书籍归还记录</span
        >
        <!-- 学生查看个人借书记录 -->
        <!-- <el-row>
          <el-col :span="6" class="search">
            <el-input
              v-model="keywords"
              placeholder="请输入书名进行查询"
              prefix-icon="el-icon-search"
              @change="findQuery"
            ></el-input>
          </el-col>
          <el-col :span="18"></el-col>
        </el-row> -->
        <el-row class="tabletop" style="text-align: center">
          <el-col>
            <el-table
              :data="
                records.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              style="width: 100%; text-align: center"
              height="510"
              border
              stripe
              header-cell-style="{text-align:center;background-color:#FAFAFA;}"
            >
              <el-table-column prop="restore_id" label="Restore ID">
              </el-table-column>
              <el-table-column prop="user_id" label="用户ID"> </el-table-column>
              <el-table-column prop="user_name" label="姓名"> </el-table-column>
              <el-table-column prop="name" label="书名"> </el-table-column>
              <el-table-column prop="borrow_time" label="借书日期">
              </el-table-column>
              <el-table-column prop="restore_time" label="应还日期">
              </el-table-column>
              <el-table-column prop="restore_realTime" label="实际归还时间">
              </el-table-column>
              <el-table-column prop="pass_day" label="逾期天数">
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                :total="records.length"
                :current-page="currentPage"
                :page-size="pageSize"
                @current-change="handleCurrentChange"
                layout="total,prev,pager,next,jumper"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"
import moment from "moment"
export default {
  name: "UserBorrowRestored",
  computed: {
    ...mapGetters(["records"]),
  },
  data() {
    return {
      form: {
        // Student_code: sessionStorage.getItem("username"),
        borrow_date: new Date(),
        return_date: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate(),
          new Date().getHours(),
          new Date().getMinutes(),
          new Date().getSeconds()
        ),
      },
      activeName: "first",
      keywords: "",
      keywordsreturn: "",
      dialogFormVisiblereturn: false,
      dialogFormVisible: false,
      formreturn: {},
      title: "",
      types: "",
      pageSize: 8,
      // pageSize: 4,
      currentPage: 1,
      temp: {},
    }
  },
  created() {
    var params = { id: sessionStorage.getItem("id") }
    console.log("created", params)
    this.findStudentRecord(params)
    // this.findAllBook()
  },
  methods: {
    dateFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ""
      }
      return moment(date).format("YYYY-MM-DD")
    },
    dateFormat1(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ""
      }
      return moment(date).format("YYYY-MM")
    },

    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // 模糊查询
    findQuery() {
      var params = { keys: this.keywords }
      console.log(params)
      this.findQueryBook(params)
    },
    // 借书
    handleEdit(index, row) {
      this.title = "增加借书信息"
      this.form.Book_num = row.Book_num
      this.dialogFormVisible = true
    },
    handleSubmit() {
      this.dialogFormVisible = false
      var vm = this
      if (this.title == "增加借书信息") {
        this.saveborrowbook1(this.form)
          .then(function (data) {
            console.log("借书", data)
            vm.$message({
              type: "success",
              message: "借书成功!",
            })
          })
          .catch(function (error) {
            console.log("借书失败", error)
            vm.$message({
              type: "success",
              message: "借书成功!",
            })
          })
        let id = this.form.Book_num
        console.log("id", id)
        this.updateBookNum(id)
          .then(function (data) {
            console.log("减", data)
          })
          .catch(function (error) {
            console.log("借书数量修改失败", error)
          })
      }
    },
    // 还书
    handleReturn(index, row) {
      this.$confirm("校对信息后确定还书?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.temp.user_id = sessionStorage.getItem("id")
        this.temp.id = row.book_id
        this.temp.borrow_id = row.borrow_id
        this.temp.restore_realTime = moment(new Date()).format("YYYY-MM-DD")
        this.temp.pass_day =
          moment(this.temp.restore_realTime).diff(row.restore_time, "days") > 0
            ? moment(this.temp.restore_realTime).diff(row.restore_time, "days")
            : 0
            this.temp.restore_time = row.restore_time
            this.temp.borrow_time = row.borrow_time
        console.log("line231,this.temp:", this.temp)
        // this.$http
        //   .post("http://localhost:3000/bookstudent/returnbook", {
        //     user_id: user_id,
        //     id: id,
        //     borrow_id: borrow_id,
        //     restore_realtime: borrow_realTime,
        //     pass_day: pass_day,
        //   })
        this.returnBook(this.temp)
          .then((data) => {
            this.$message({
              type: "success",
              message: "还书成功!",
            })
            this.updateBookNumadd(this.temp.id)
              .then(function (data) {
                console.log("加", data)
              })
              .catch(function (error) {
                console.log("还书数量修改失败", error)
              })
            var params = { id: sessionStorage.getItem("id") }
            console.log(params)
            this.findStudentRecord(params)
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: "还书失败!",
            })
          })
      })
    },

    handleClick(tab, event) {
      if (this.activeName == "first") {
        let params = { id: sessionStorage.getItem("id") }
        console.log(params)
        this.findStudentRecord(params)
      } else if (this.activeName == "second") {
        let params = { keys: sessionStorage.getItem("id") }
        console.log(params)
        // this.studentQueryRestore(params)
        this.studentFindRestore(params)
      } else {
      }
    },
    ...mapActions([
      "findAllBook",
      "findQueryBook",
      "findQueryBook1",
      "findStudentRecord",
      "studentQueryRestore",
      "findQueryStudent",
      "saveborrowbook1",
      "updateBookNum",
      "returnBook",
      "updateBookNumadd",
      "studentFindRestore",
    ]),
  },
}
</script>
<style scoped>
.tabletop {
  padding: 10px 0 20px 0;
}

.row {
  margin-left: 10px;
}
.search {
  margin: 4px 0;
}
.breadcrumb {
  margin-bottom: 20px;
  margin-top: -14px;
}
</style>
