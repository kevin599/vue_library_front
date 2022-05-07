<template>
  <el-container>
    <el-header>
      <!-- 顶部导航栏 -->
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="#fff"
        background-color="#9bba82"
        active-text-color="#903b37"
        style="width: 100%; font-size: 20px"
        :router="true"
      >
        <el-menu-item @click="saveNavState('/user_index')" index="/user_index"
          ><template slot="title">
            <i class="el-icon-s-home" style="color: #fff"></i>
            <span>首页</span>
          </template></el-menu-item
        >
        <el-menu-item
          @click="saveNavState('/user_book_info')"
          index="/user_book_info"
        >
          <template slot="title">
            <i class="el-icon-search" style="color: #fff"></i>
            <span>图书检索</span>
          </template>
        </el-menu-item>
        <el-menu-item
          @click="saveNavState('/user_borrow_restored')"
          index="/user_borrow_restored"
        >
          <template slot="title">
            <i class="el-icon-reading" style="color: #fff"></i>
            <span>个人记录</span>
          </template>
        </el-menu-item>

        <el-submenu>
          <template slot="title">
            <i class="el-icon-s-custom" style="color: #fff"></i>
            <span>我的空间</span>
          </template>
          <el-menu-item index="/user_info" @click="saveNavState('/user_info')">
            <template slot="title">
              <i class="el-icon-view" style="color: #fff"></i>
              <span>个人信息</span>
            </template>
          </el-menu-item>
          <el-menu-item
            index="/user_change_psd"
            @click="saveNavState('/user_change_psd')"
          >
            <template slot="title">
              <i class="el-icon-key" style="color: #fff"></i>
              <span>修改密码</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <iframe
        style="
          background-color: #9bba82;
          line-height: 60px;
          position: absolute;
          right: 200px;
        "
        allowtransparency="true"
        frameborder="0"
        width="180"
        height="60"
        scrolling="no"
        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=2&bd=0&k=000000&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=59287&w=180&h=60&align=center"
      ></iframe>
      <el-button
        type="info"
        @click="logout"
        style="
          position: absolute;
          right: 80px;
          border-radius: 12px;
          background: linear-gradient(145deg, #9a3f3b, #823532);
          box-shadow: 5px 5px 0px #702e2b, -5px -5px 0px #b04843;
        "
        >退出</el-button
      >
    </el-header>

    <el-main>
      <!-- 当路由发生改变，路由对应的模块显示到这里 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "UserHome",

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
  width: 100%;
}
.el-header {
  width: 100%;
  padding: 0;
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

.el-menu-item {
  height: 100%;
}
</style>
