import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$http = axios
// 处理书籍的数据
export default {
    state: {
        users: []
    },
    getters: {
        users: function (state) {
            return state.users
        }
    },
    mutations: {
        alterUser(state, data) {
            state.users = data
        }
    },
    actions: {
        // findAllUser(context) {
        //     axios.get('http://localhost:3000/login/finduser').then(({ data }) => {
        //         context.commit('alterUser', data)
        //         console.log(data);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        // },
        register_check_user_id(context) {
            console.log(context);
            // axios.get('http://localhost:3000/register/register_check_user_id').then(({ data }) => {
            //     console.log(data);
            // }).catch((error) => {
            //     console.error(error);
            // })
        },
        register_user(context, form) {
            console.log(form);
            axios.post('http://localhost:3000/register/register_user', form).then(({ data }) => {
                return data
            }).catch((error) => {
                return error
            })
        },
        register_manager(context, form) {
            console.log(form);
            axios.post('http://localhost:3000/register/register_manager', form).then(({ data }) => {
                return data
            }).catch((error) => {
                return error
            })
        }
    }
}