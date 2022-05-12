<template>
  <el-card class="box-card">
    <el-row style="margin-bottom: 20px">
      <el-select
        v-model="condition_value"
        clearable
        placeholder="请选择查询条件"
      >
        <el-option
          v-for="item in conditions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入要查找的图书信息"
        prefix-icon="el-icon-search"
        v-model="keywords"
        @change="findQuery"
        style="width: 300px"
      >
      </el-input>
      <el-button
        type="primary"
        @click="toExcel1"
        style="float: right; margin-right: 50px"
        >导出excel</el-button
      >
      <el-button
        type="primary"
        @click="addBook"
        style="float: right; margin-right: 10px"
        >新书录入</el-button
      >
    </el-row>
    <template>
      <!-- <el-table
        :data="
          books.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
        height="550"
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
        <el-table-column prop="cur_num" label="现存数量" width="120">
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
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table> -->

      <!-- 改成展开行 -->
      <el-table
        stripe
        :data="
          books.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand zhankai"
            >
              <el-form-item label="图书ID：" class="lie">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="图书名称：" class="lie">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="作者：" class="lie">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item label="ISBN码：" class="lie">
                <span>{{ props.row.ISBN }}</span>
              </el-form-item>
              <el-form-item label="出版社：" class="lie">
                <span>{{ props.row.publisher }}</span>
              </el-form-item>
              <el-form-item label="入库时间：" class="lie">
                <span>{{ props.row.timeIn }}</span>
              </el-form-item>
              <el-form-item label="图书价格：" class="lie">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="图书简介：" class="lie">
                <span>{{ props.row.message }}</span>
              </el-form-item>
              <el-form-item label="图书分类：" class="lie">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="书架号：" class="lie">
                <span>{{ props.row.shelf }}</span>
              </el-form-item>
              <el-form-item label="书籍总量：" class="lie">
                <span>{{ props.row.total_num }}</span>
              </el-form-item>
              <el-form-item label="剩余书籍量：" class="lie">
                <span>{{ props.row.cur_num }}</span>
              </el-form-item>
              <el-form-item label="借出书籍量：" class="lie">
                <span>{{ props.row.borrow_num }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图书ID" prop="id" width="100">
        </el-table-column>
        <el-table-column label="图书名称" prop="name"> </el-table-column>
        <el-table-column label="图书作者" prop="author"> </el-table-column>
        <el-table-column label="ISBN码" prop="ISBN"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="success"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- /展开行 -->

      <div class="block">
        <el-pagination
          :total="books.length"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          layout="total,prev,pager,next,jumper"
        ></el-pagination>
      </div>

      <!-- 新书录入对话框 -->
      <el-dialog
        :title="title"
        :visible.sync="editBookDialogVisible"
        center
        width="40%"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <!-- <el-form-item label="封面" class="row">
            <el-upload
              class="upload-demo"
              name="fulAvatar"
              action="http://localhost:3000/book/uploadImg"
              :before-upload="beforeAvatarUpload"
              :on-success="uploadsuccess"
              :limit="1"
              :list-type="picture"
            >
              <el-button size="small" plain="" type="primary"
                >点击上传</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过1024kb
              </div>
            </el-upload>
          </el-form-item> -->
          <el-form-item label="书名" class="row" prop="name">
            <el-input
              v-model="form.name"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="作者" class="row" prop="author">
            <el-input
              v-model="form.author"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="ISBN" class="row" prop="ISBN">
            <el-input
              v-model="form.ISBN"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="出版社" class="pubcompany" prop="publisher">
            <el-input
              v-model="form.publisher"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="入库日期" prop="timeIn">
            <el-date-picker
              v-model="form.timeIn"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 400px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="总数量" class="row" prop="total_num">
            <el-input
              v-model="form.total_num"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="当前数量" class="row" prop="cur_num">
            <el-input
              v-model="form.cur_num"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="价格" class="row" prop="price">
            <el-input
              v-model="form.price"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="简介" class="row" prop="message">
            <el-input
              v-model="form.message"
              style="width: 400px"
              placeholder=""
              type="textarea"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item label="书籍类目" prop="category">
            <el-input
              v-model="form.category"
              style="width: 400px"
              placeholder=""
            ></el-input>
            <!-- <el-select
              v-model="form.category"
              style="width: 400px"
              placeholder="请选择书籍类目"
            >
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="书架号" class="row" prop="shelf">
            <el-input
              v-model="form.shelf"
              style="width: 400px"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editBookDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit('form')"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </template>
  </el-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  name: "ManageBook",
  computed: {
    ...mapGetters(["books", "types"]),
  },
  data() {
    return {
      condition_value: "",
      conditions: [
        {
          value: "id",
          label: "图书ID",
        },
        {
          value: "author",
          label: "作者",
        },
        {
          value: "name",
          label: "图书名称",
        },
        {
          value: "ISBN",
          label: "ISBN码",
        },
        {
          value: "publisher",
          label: "出版社",
        },
        {
          value: "timeIn",
          label: "入库时间",
        },
        {
          value: "price",
          label: "图书价格",
        },
        {
          value: "category",
          label: "图书分类",
        },
        {
          value: "shelf",
          label: "书架号",
        },
      ],
      editBookDialogVisible: false,
      form: {},
      keywords: "",
      pageSize: 10,
      currentPage: 1,
      title: "",
      picture: "",
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
        total_num: [
          { required: true, message: "请输入书籍数量", trigger: "blur" },
        ],
        cur_num: [
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
    this.findAllTypes()
  },
  methods: {
    //图书查找
    findQuery() {
      var params = { keys: this.keywords, condition: this.condition_value }
      console.log(params)
      this.findQueryBook(params)
      if (this.keywords == "") {
        this.condition_value = ""
        this.findAllBook()
      }
    },

    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    //修改图书信息
    handleEdit(index, row) {
      console.log(index, row) //row index,row message
      this.form = row
      this.title = "修改书籍信息"
      this.editBookDialogVisible = true
    },

    beforeAvatarUpload(file) {
      console.log(file.type)
      const isJPG = file.type === "image/jpeg" || "image/png"
      const isLt2M = file.size / 500 / 500 < 1
      console.log(file.size)
      if (!isJPG) {
        this.$message({
          type: "false",
          message: "只支持jpg/png格式",
        })
      }
      if (!isLt2M) {
        this.$message({
          type: "false",
          message: "图片大小不能超过1024KB!",
        })
      }
      return isJPG
    },
    uploadsuccess(fulAvatar) {
      console.log("上传成功")
      //  this.findAllBook();
    },

    //日期显示问题
    dateFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ""
      }
      return moment(date).format("YYYY-MM")
    },

    // 新书录入、修改图书--确定按钮
    handleSubmit(formName) {
      this.editBookDialogVisible = false
      var vm = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log("submit!")
          if (this.title == "录入新书") {
            // this.tableData.push()
            // this.saveBook(this.form)
            //   .then(function (data) {
            //     this.editBookDialogVisible = false
            //     vm.$message({
            //       type: "success",
            //       message: "添加成功!",
            //     })
            //   })
            //   .catch(function (error) {
            //     vm.$message({
            //       type: "error",
            //       message: "添加失败!",
            //     })
            //   })
            console.log(this.form)
            this.saveBook(this.form)
              .then(function (data) {
                vm.$message({
                  type: "success",
                  message: "添加成功!",
                })
              })
              .catch(function (error) {
                vm.$message({
                  type: "error",
                  message: "添加失败!",
                })
              })
          } else {
            console.log("修改图书", this.form)
            this.updateBook(this.form)
              .then(function (data) {
                vm.$message({
                  type: "success",
                  message: "修改成功!",
                })
              })
              .catch(function (error) {
                vm.$message({
                  type: "error",
                  message: "修改失败!",
                })
              })
          }
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },

    toExcel1() {
      this.toExcel()
        .then(function (data) {
          // console.log(data)
          // if (data.status_code == 1) {
          //   console.log("download")
          //   window.open("http://localhost:3000/excel/book_info", "_blank")
          // }
        })
        .catch((err) => {
          console.error(err)
        })
    },

    addBook() {
      this.editBookDialogVisible = true
      this.title = "录入新书"
      this.form = {}
      // this.dialogFormVisible = true
      // this.title = "录入书籍信息"
      // this.form = {}
    },

    handleDelete(index, row) {
      // this.$confirm(`此操作将永久删除该${index + 1}图书, 是否继续?`, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     console.log("queding")
      //     this.tableData.splice(index, 1)
      //     console.log(this.tableData)
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!",
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除",
      //     })
      //   })
      this.$confirm(
        `此操作将永久删除图书ID为 : ${row.id} 的记录, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let ids = [row.id]
          this.batchDeleteBook(ids)
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
      "toExcel",
      "findAllBook",
      "findQueryBook",
      "batchDeleteBook",
      "updateBook",
      "saveBook",
      "findAllTypes",
    ]),
  },
}
</script>

<style lang="css" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.demo-table-expand .el-form-item__label {
  color: #99a9bf;
}
.zhankai .lie:nth-child(4n-2),
.lie:nth-child(4n-3) {
  background-color: hsl(0, 0%, 76%, 0.5);
}
.demo-table-expand .el-form-item:nth-child(even) {
  border-left: 1px solid black;
  /* border-right: 1px solid black; */
}
</style>
