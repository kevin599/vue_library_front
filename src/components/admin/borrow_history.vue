<template>
  <el-card class="BookRecord">
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入学生名字进行查询"
          prefix-icon="el-icon-search"
          @change="findQuery"
          v-model="keywords"
        >
        </el-input>
      </el-col>
      <el-col :span="18"> </el-col>
    </el-row>
    <el-row class="tabletop" style="text-align: center">
      <el-col>
        <!-- :data="form" -->
        <!-- stripe -->
        <el-table
          :data="
            records.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%; text-align: center"
          height="540"
          border
          header-cell-style="{text-align:center;background-color:#FAFAFA;}"
          :row-class-name="unrestore"
        >
          <el-table-column
            prop="borrow_id"
            label="ID"
            class="bookname"
            sortable
          >
          </el-table-column>
          <el-table-column prop="name" label="书名"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID" sortable>
          </el-table-column>
          <el-table-column prop="user_name" label="姓名"> </el-table-column>
          <el-table-column prop="borrow_time" label="借书日期">
          </el-table-column>
          <el-table-column prop="restore_time" label="应还日期">
          </el-table-column>
          <el-table-column
            prop="state"
            label="是否归还"
            :formatter="state"
            sortable
          >
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                v-model="types"
                size="small"
                type="danger"
                plain
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
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
  </el-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  name: "BorrowHistory",
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
    this.findAllRecords()
  },
  methods: {
    state(row, index) {
      if (row.state == 1) {
        return "已归还"
      } else if (row.state == 0) {
        return "未归还"
      } else {
        return "unkonw!"
      }
    },
    unrestore({ row, rowIndex }) {
    //   console.log("unrestore-line105", row)
      if (row.state == 0) {
        return "success-row"
      }
      return " "
    },
    dateFormat(row, column) {
      // var date=row[column.property];
      // if(date==undefined){
      // 	return "";
      // }
      // return moment(date).format("YYYY-MM-DD");
    },
    // 分页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // 模糊查询
    findQuery() {
      //   var params={keys:this.keywords};
      var params = { keys: this.keywords.trim() }
      console.log(params)
      this.findQueryStudent(params)
    },
    // 删除记录
    handleDelete(index, row) {
      this.$confirm(
        `此操作将永久删除ID为:${row.borrow_id}的记录, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let id = [row.borrow_id]
          console.log("ID=" + id)
          this.deleteStudentRecord(id)
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
            type: "info",
            message: "已取消操作",
          })
        })
    },
    ...mapActions([
      "findAllRecords",
      "findQueryStudent",
      "deleteStudentRecord",
    ]),
  },
}
</script>
<style scoped>
.tabletop {
  padding: 20px 0;
}

</style>
