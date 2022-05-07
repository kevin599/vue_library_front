<template>
  <el-card class="box-card">
    <el-row style="margin-bottom: 20px">
      <el-input
        placeholder="请输入要查找的图书"
        prefix-icon="el-icon-search"
        style="width: 300px"
        v-model="keywords"
        @change="findQuery"
      >
      </el-input>
    </el-row>
    <template>
      <el-table
        :data="
          books.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
        height="600"
        border
      >
        <el-table-column prop="id" label="ID" width="50"> </el-table-column>
        <el-table-column prop="name" label="书名" width="120">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120">
        </el-table-column>
        <el-table-column prop="ISBN" label="ISBN" width="120">
        </el-table-column>
        <el-table-column prop="publisher" label="出版社" width="130">
        </el-table-column>
        <el-table-column prop="timeIn" label="入库时间" width="120">
        </el-table-column>
        <el-table-column prop="total_num" label="总数量" width="120">
        </el-table-column>
        <el-table-column prop="cur_num" label="当前剩余数量" width="120">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="message" label="简介" width="300">
        </el-table-column>
        <el-table-column prop="category" label="分类" width="120">
        </el-table-column>
        <el-table-column prop="shelf" label="书架" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="success"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >借阅图书</el-button
              >
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :total="books.length"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          layout="total,prev,pager,next,jumper"
        ></el-pagination>
      </div>
    </template>

    <!-- 借阅图书 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      width="40%"
    >
      <el-form :model="form">
        <el-form-item label="书的编号">
          <el-input
            v-model="form.id"
            readonly
            style="width: 400px"
            class="row"
          ></el-input>
        </el-form-item>
        <el-form-item label="学生学号">
          <el-input
            v-model="form.user_id"
            readonly
            style="width: 400px"
            class="row"
          ></el-input>
        </el-form-item>
        <el-form-item label="借书日期">
          <el-date-picker
            v-model="form.borrow_time"
            readonly
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 400px"
            class="row"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="应还书日期">
          <el-date-picker
            v-model="form.restore_time"
            readonly
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 400px"
          >
          </el-date-picker>
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
import moment from "moment"
export default {
  name: "UserBookInfo",
  computed: {
    ...mapGetters(["books"]),
  },

  data() {
    return {
      form: {
        user_id: sessionStorage.getItem("id"),
        borrow_time: moment(new Date()).format("YYYY-MM-DD"),
        restore_time: moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          )
        ).format("YYYY-MM-DD"),
        // restore_time: new Date(
        //   new Date().getFullYear(),
        //   new Date().getMonth() + 1,
        //   new Date().getDate(),
        // ),
      },
      dialogFormVisible: false,
      keywords: "",
      pageSize: 4,
      currentPage: 1,
      tableData: [
        {
          id: 1,
          name: "看着日落",
          author: "不想以后",
          ISBN: "独自旅行",
          publisher: "不要无奈",
          timeIn: "不要哭，也不要逃",
          number: "更不重要",
          price: "请给我一点微笑",
          message:
            "好好默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用border属性，它接受一个Boolean，设置为true即可启用。",
          category: "missya",
          shelf: "打不希勒图",
        },
        {
          id: 2,
          name: "看着日落",
          author: "不想以后",
          ISBN: "独自旅行",
          publisher: "不要无奈",
          timeIn: "不要哭，也不要逃",
          number: "更不重要",
          price: "请给我一点微笑",
          message:
            "好好默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用border属性，它接受一个Boolean，设置为true即可启用。",
          category: "missya",
          shelf: "打不希勒图",
        },
        {
          id: 3,
          name: "看着日落",
          author: "不想以后",
          ISBN: "独自旅行",
          publisher: "不要无奈",
          timeIn: "不要哭，也不要逃",
          number: "更不重要",
          price: "请给我一点微笑",
          message:
            "好好默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用border属性，它接受一个Boolean，设置为true即可启用。",
          category: "missya",
          shelf: "打不希勒图",
        },
        {
          id: 4,
          name: "看着日落",
          author: "不想以后",
          ISBN: "独自旅行",
          publisher: "不要无奈",
          timeIn: "不要哭，也不要逃",
          number: "更不重要",
          price: "请给我一点微笑",
          message:
            "好好默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用border属性，它接受一个Boolean，设置为true即可启用。",
          category: "missya",
          shelf: "打不希勒图",
        },
        {
          id: 5,
          name: "看着日落",
          author: "不想以后",
          ISBN: "独自旅行",
          publisher: "不要无奈",
          timeIn: "不要哭，也不要逃",
          number: "更不重要",
          price: "请给我一点微笑",
          message:
            "好好默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用border属性，它接受一个Boolean，设置为true即可启用。",
          category: "missya",
          shelf: "打不希勒图",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入书籍名称", trigger: "blur" }],
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" },
        ],
        publisher: [
          { required: true, message: "请输入出版社名称", trigger: "blur" },
        ],
        ISBN: [{ required: true, message: "请输入书籍ISBN", trigger: "blur" }],
        timeIn: [
          { required: true, message: "请输入书籍入库时间", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入书籍数量", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入书籍价格", trigger: "blur" }],
        message: [
          { required: true, message: "请输入书籍简介", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请输入书籍分类", trigger: "blur" },
        ],
        shelf: [
          { required: true, message: "请输入书籍书架号", trigger: "blur" },
        ],
      },

      leimu: [
        {
          value: "选项1",
          label: "类目1",
        },
        {
          value: "选项2",
          label: "类目2",
        },
        {
          value: "选项3",
          label: "类目3",
        },
      ],
    }
  },

  mounted() {},
  created() {
    this.findAllBook()
  },
  methods: {
    // 点击借阅
    handleEdit(index, row) {
      this.title = "增加借书信息"
      this.form.id = row.id
      this.form.cur_num = row.cur_num
      this.dialogFormVisible = true
    },
    //确定借阅
    handleSubmit() {
      // console.log('confirm borrow',this.books);
      this.dialogFormVisible = false
      var vm = this
      console.log(this.form)
      if (this.form.cur_num - 1 < 0) {
        this.$message({
          message: "当前书籍数量不足，请重新选择",
          type: "error",
        })
        return
      } else {
        //数量充足
        if (this.title == "增加借书信息") {
          this.saveborrowbook1(this.form)
            .then(function (data) {
              vm.$message({
                type: "success",
                message: "借书成功!",
              })
            })
            .catch(function (error) {
              console.log("借书失败", error)
              vm.$message({
                type: "error",
                message: "借书失败!",
              })
            })
          //增加借书信息成功后书籍数量减一
          let id = this.form.id
          console.log("id", id)
          this.updateBookNum(id)
            .then(function (data) {
              vm.$message({
                type: "success",
                message: "图书当前数量修改成功！",
              })
            })
            .catch(function (error) {
              console.log("借书数量修改失败", error)
              vm.$message({
                type: "error",
                message: "借书数量修改失败,请联系图书管理员!",
              })
            })
        }
      }
    },
    //分页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },

    //日期显示问题
    dateFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ""
      }
      return moment(date).format("YYYY-MM-DD")
    },

    //模糊查询
    findQuery() {
      var params = { keys: this.keywords.trim() }
      console.log(params)
      this.findQueryBook(params)
    },
   
    ...mapActions([
      "findAllBook",
      "findQueryBook",
      "saveborrowbook1",
      "updateBookNum",
    ]),
  },
}
</script>

<style lang="css" scoped></style>
