<template>
  <el-card class="StudentInfo">
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入学生学号或姓名进行查询"
          prefix-icon="el-icon-search"
          v-model="keywords"
          @change="findQuery"
        >
        </el-input>
      </el-col>
      <el-col :span="18"> </el-col>
    </el-row>
    <el-row class="tabletop" style="text-align: center">
      <el-col>
        <el-table
        :data="records.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%; text-align: center"
          height="510"
          border
          stripe
          header-cell-style="{text-align:center;background-color:#FAFAFA;}"
        >
          <el-table-column prop="restore_id" label="Restore ID"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID"> </el-table-column>
          <el-table-column prop="user_name" label="姓名"> </el-table-column>
          <el-table-column prop="name" label="书名"> </el-table-column>
          <el-table-column prop="borrow_time" label="借书日期">
          </el-table-column>
          <el-table-column prop="restore_time" label="应还日期">
          </el-table-column>
          <el-table-column prop="restore_realTime" label="实际归还时间">
          </el-table-column>
          <el-table-column prop="pass_day" label="逾期天数"> </el-table-column>
          <!-- <el-table-column label="操作" width="184">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
        <div class="block">
                <el-pagination :total="records.length" :current-page="currentPage" :page-size="pageSize"
                 @current-change="handleCurrentChange"
                 layout="total,prev,pager,next,jumper"></el-pagination>
            </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  name: "RestoreInfo",
  computed: {
    ...mapGetters(["records"]),
  },

  data() {
    return {
      keywords: "",
      pageSize: 8,
      currentPage: 1,
    }
  },
  created() {
    this.findAllRestoreRecords()
  },

  mounted() {},

  methods: {
    // 分页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // 模糊查询
    findQuery() {
      var params = { keys: this.keywords }
      console.log(params)
      this.findQueryStudentRestore(params)
    },
    // 删除记录
    handleDelete(index, row) {
      // this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     let id = [row.Id]
      //     console.log("ID=" + id)
      //     this.deleteStudentRecord(id)
      //       .then((data) => {
      //         this.$message({
      //           type: "success",
      //           message: "删除成功!",
      //         })
      //       })
      //       .catch((error) => {
      //         this.$message({
      //           type: "false",
      //           message: "删除失败!",
      //         })
      //       })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消操作",
      //     })
      //   })
    },
    ...mapActions([
      "findAllRestoreRecords",
      "findQueryStudentRestore",
    ]),
    // "findQueryStudent",
    // "deleteStudentRecord",
  },
}
</script>

<style lang="css" scoped></style>
