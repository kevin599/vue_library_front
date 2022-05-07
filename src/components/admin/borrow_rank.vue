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
          :data="
            records.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
          style="width: 100%; text-align: center"
          height="510"
          border
          stripe
          header-cell-style="{text-align:center;background-color:#FAFAFA;}"
        >
          <el-table-column type="index" label="排名"></el-table-column>
          <el-table-column prop="Total_num" label="借阅总数"> </el-table-column>
          <el-table-column prop="user_id" label="用户ID"> </el-table-column>
          <el-table-column prop="user_name" label="姓名"> </el-table-column>
          <el-table-column prop="user_department" label="专业">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :total="recordslength"
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
  name: "BorrowRank",
  computed: {
    ...mapGetters(["records"]),
  },
  data() {
    return {
      recordsform: {},
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
    this.findTop()
  },

  methods: {
    findQuery() {},
    // 分页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // 查询排行榜
    findTop() {
      this.findTop(this.form)
      console.log(this.form)
    },
    ...mapActions([
      "findTop",
      "saveStudent",
      "updateStudent",
      "batchDeleteStudent",
      "findQueryStudent",
    ]),
  },
}
</script>

<style lang="css" scoped></style>
