<template>
  <el-container>
    <!--  -->
    <el-header>
      <div style="padding-right: 10px">
        <img src="../assets/images/0034-library.png" alt="" />
      </div>
      <span style="margin: 0 auto">高校图书馆管理系统</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧边栏区域 -->
      <el-aside :width="collapse ? 60 + 'px' : 200 + 'px'">
        <!-- 折叠菜单按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- :unique-opened="true",需要加: 不加:会被自动识别成字符串,每次只能打开一个 -->
        <!-- 左侧导航栏 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          default-active="/users"
          :router="true"
        >
          <!-- 首页 -->
          <!-- <el-menu-item
            @click="saveNavState('/admin_home')"
            index="/admin_home"
          >
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </template>
          </el-menu-item> -->

          <!-- 图书管理 -->
          <el-menu-item
            @click="saveNavState('/manage_book')"
            index="/manage_book"
          >
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>图书管理</span>
            </template>
          </el-menu-item>

          <!-- 学生管理 -->
          <el-menu-item
            @click="saveNavState('/manage_student')"
            index="/manage_student"
          >
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>

          <!-- 借阅管理 -->
          <el-submenu>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图书借阅管理</span>
            </template> 

            <el-menu-item
              index="/borrow_history"
              @click="saveNavState('/borrow_history')"
            >
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>借阅记录</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/borrow_rank"
              @click="saveNavState('/borrow_rank')"
            >
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>借阅排行</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-menu-item
            @click="saveNavState('/restore_info')"
            index="/restore_info"
          >
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>图书归还管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 当路由发生改变，路由对应的模块显示到这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      // menulist: [
      //   { id: 103, authName: "用户管理",path:'/manage_student'},
      //   { id: 101, authName: "借阅管理" },
      //   { id: 102, authName: "归还管理" },
      //   { id: 145, authName: "不知道什么功能" },
      // ],
      iconlist: {
        124: "el-icon-s-home",
        125: "el-icon-edit",
        // 125: "el-icon-s-opportunity",
        103: "el-icon-s-custom",
        101: "el-icon-receiving",
        // 101: "el-icon-s-cooperation",
        102: "el-icon-s-order",
        145: "el-icon-s-marketing",
      },
      collapse: false,
    }
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到login页面
      this.$router.push("/login")
    },
    // 获取左侧菜单的数据列表
    // async getMentList() {
    //   const { data: res } = await this.$http.get("menus")
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //   this.menulist = res.data
    //   console.log(this.menulist)
    // },
    // 折叠菜单
    toggleCollapse() {
      this.collapse = !this.collapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath)
      console.log(activePath)
    },
  },
  // created() {
  //   this.getMentList()
  // },
}
</script>

<style scoped>
div > img {
  margin-left: 20px;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  padding-left: 0;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.el-header img {
  height: 60px;
  margin-right: 15px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-aside {
  background-color: #333744;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor: pointer;
}
</style>
