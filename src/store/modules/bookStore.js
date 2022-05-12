import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$http = axios
// 处理书籍的数据
export default {
  state: {
    books: []
  },
  getters: {
    books: function (state) {
      return state.books
    }
  },
  mutations: {
    alterBook(state, data) {
      state.books = data
    }
  },
  actions: {
    // 查找所有书籍
    findAllBook(context) {
      axios.get('http://localhost:3000/book/findAll').then(({ data }) => {
        console.log(data)
        context.commit('alterBook', data)
      }).catch((error) => {
        console.log(error)
      })
    },

    toExcel(context) {
      axios.get('http://localhost:3000/book/exportExcel', {}, { responseType: 'buffer' }).then((res) => {
        console.log('返回的res', res);
        function base64ToArrayBuffer(base64) {
          var binary_string = window.atob(base64);
          var len = binary_string.length;
          var bytes = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
          }
          return bytes.buffer;
        }
        const blob = new Blob([base64ToArrayBuffer(res.data)], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = `书籍汇总表.xlsx`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
        
      })
    },

    // 模糊查询(通过书名或作者)
    findQueryBook(context, params) {
      axios.get('http://localhost:3000/book/query', { params }).then(({ data }) => {
        context.commit('alterBook', data)
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 删除书籍
    batchDeleteBook(context, ids) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/book/batchDelete', { ids: ids }).then((data) => {
          context.dispatch('findAllBook')
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 修改书籍
    updateBook(context, form) {
      return new Promise(function (resolve, reject) {
        axios.post('http://localhost:3000/book/update', form).then((data) => {
          context.dispatch('findAllBook')
          resolve(data)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    // 保存书籍信息
    saveBook(context, form) {
      return new Promise(function (resolve, reject) {
        axios.post('http://localhost:3000/book/save', form).then((data) => {
          context.dispatch('findAllBook')
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 修改书籍当前数量减一
    updateBookNum(context, id) {
      return new Promise(function (resolve, reject) {
        axios.post('http://localhost:3000/book/updatenum', { id: id }).then((data) => {
          context.dispatch('findAllBook');
          resolve(data);
        }).catch(function (error) {
          reject(error);
        })
      })
    },
    // 修改书籍当前数量加一
    updateBookNumadd(context, id) {
      return new Promise(function (resolve, reject) {
        axios.post('http://localhost:3000/book/updatenumadd', { id: id }).then((data) => {
          context.dispatch('findAllBook');
          resolve(data);
        }).catch(function (error) {
          reject(error);
        })
      })
    }

  }

}
