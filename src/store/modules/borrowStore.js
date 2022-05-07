import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$http = axios

export default {
    state: {
        records: []
    },
    getters: {
        records: state => state.records
    },
    mutations: {
        alterRecords(state, data) {
            state.records = data
            console.log('alterRecords', state.records);
        },
        //排序对象中的值
        sorttop(state, data) {
            data.sort(function (a, b) {
                return b.Total_num - a.Total_num;
            })
            console.log('sorttop', data);
            state.records = data
        }

    },
    actions: {
        // 管理员-查找所有学生借阅记录
        findAllRecords(context) {
            axios.get('http://localhost:3000/bookstudent/findAll').then(({ data }) => {
                context.commit('alterRecords', data)
            }).catch((error) => {
                console.log(error)
            })
        },
        // 学生-查找借阅记录
        findStudentRecord(context, params) {
            axios.get('http://localhost:3000/bookstudent/studentRecord', { params }).then(({ data }) => {
                console.log('borrowStore.js line39 查找借阅记录', params);
                context.commit('alterRecords', data)
            }).catch((error) => {
                console.log(error)
            })
        },
        // 模糊查询(书名)
        findQueryBook1(context, params) {
            axios.get('http://localhost:3000/bookstudent/queryBook', { params }).then(({ data }) => {
                context.commit('alterRecords', data)
            }).catch((error) => {
                console.log(error)
            })
        },
        // 管理员-模糊查询学生借阅记录
        findQueryStudent(context, params) {
            axios.get('http://localhost:3000/bookstudent/queryStudent', { params }).then(({ data }) => {
                console.log('line 46 borrowStore:', data);
                context.commit('alterRecords', data)
            }).catch((error) => {
                console.log('管理员-模糊查询学生借阅记录', error)
            })
        },
        // 添加借阅信息
        saveborrowbook1(context, form, params) {
            console.log(params);
            return new Promise(function (resolve, reject) {
                axios.post('http://localhost:3000/bookstudent/addrecord', form).then((data) => {
                    resolve(data);
                }).catch(function (error) {
                    reject(error)
                    console.log("error", error)
                })
            })
        },
        // 还书，管理员修改book_student表中信息
        updateborrowbook(context, form) {
            return new Promise(function (resolve, reject) {
                axios.post('http://localhost:3000/bookstudent/update', form).then((data) => {
                    resolve(data);
                }).catch(function (error) {
                    reject(error)
                    console.log("error", error)
                })
            })
        },
        // 学生归还图书
        returnBook(context, form) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:3000/bookstudent/returnbook', form).then((data) => {
                    // context.dispatch('findStudentRecord');
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            })
        },
        //查询借阅排行榜
        findTop(context) {
            axios.get('http://localhost:3000/top/findTop').then(({ data }) => {
                console.log("borrowStore.js-findTop line92 :", data);
                context.commit('sorttop', data)
            }).catch((error) => {
                console.log('borrowStore.js-findTop', error)
            });
            //   .then(
            //       response => {
            //         //   context = response.data
            //         context.commit('alterRecords',response.data)

            //       }
            //   ).catch((error) => {
            //       console.log(error)
            //   })
        },
        // 管理员删除记录
        deleteStudentRecord(context, id) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:3000/bookstudent/deleterecord', { id: id }).then((data) => {
                    context.dispatch('findAllRecords');
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
}
