import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import User from '../components/user/User'
import Rights from '../components/power/Rights'
import ManageBook from '../components/admin/manage_book'
import AdminHome from '../components/admin/admin_home'
import ManageStudent from '../components/admin/manage_student'
import BorrowHistory from '../components/admin/borrow_history'
import BorrowRank from '../components/admin/borrow_rank'
import RestoreInfo from '../components/admin/restore_info'
import UserHome from '../components/user/user_home'
import UserIndex from '../components/user/user_index'
import UserBookInfo from '../components/user/user_book_info'
import UserBorrowRestored from '../components/user/user_borrow_restored'
import UserChangePsd from '../components/user/user_change_psd'
import UserInfo from '../components/user/user_info'
import Register from '../components/register'



Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'  //在‘/’时 重定向到login页面
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      // redirect: '/admin_home',     //redirect所要重定向的路径要和路径注册的path相同,即redirect: '/welcome', 等于 path: '/welcome',
      redirect: '/manage_book',     
      children: [
        {
          path: '/admin_home',
          component: AdminHome
        },
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: User
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/manage_book',
          component: ManageBook
        },
        //添加学生管理路由
        {
          path: '/manage_student',
          component: ManageStudent
        },
        //借阅排行
        { path: '/borrow_rank', component: BorrowRank },
        //借阅历史
        { path: '/borrow_history', component: BorrowHistory },
        //图书归还
        { path: '/restore_info', component: RestoreInfo }
      ]
    },
    {
      path: '/user_home',
      component: UserHome,
      redirect: '/user_book_info',     //redirect所要重定向的路径要和路径注册的path相同,即redirect: '/welcome', 等于 path: '/welcome',
      children: [
        {
          path: '/user_index',
          component: UserIndex
        },
        {
          path: '/user_book_info',
          component: UserBookInfo
        },
        {
          path: '/user_borrow_restored',
          component: UserBorrowRestored
        },
        {
          path:'/user_change_psd',
          component:UserChangePsd
        },
        {
          path:'/user_info',
          component:UserInfo
        }
      ]
    }

  ]
})

// 挂载路由导航守卫
// to 将要访问的页面
// from 从哪个路径/页面而来
// next 是一个函数表示放行
//  next()放行  next('/login')强制跳转
// router.beforeEach((to, from, next) => {
//   // 如果直接访问登录界面，直接放行
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
