import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loggedIn: false,
    books: [],
    loans: [],
    loansHistory: []
  },

  mutations: {
    set_books: function (state, books) {
      state.books = books;
    },

    set_loans: function (state, loans) {
      state.loans = loans
    },

    log_out: function (state) {
      state.user = null
      state.loggedIn = false
    },

    set_user: function (state, user) {
      state.user = user
      state.loggedIn = true
    },

    add_loan: function (state, book) {
      state.loans.push(book)
    },

    return_book: function (state, book) {
      for (let m = 0; m < state.loans.length; m++) {
        if (state.loans[m].book_id === book) {
          state.loans.splice(m, 1);
          break;
        }
      }
    },

    add_book: function (state, message) {
      state.messages.push(message);
    },

    remove_message: function (state, id) {
      for (let m = 0; m < state.messages.length; m++) {
        if (state.messages[m].id === id) {
          state.messages.splice(m, 1);
          break;
        }
      }
    },

    update_message: function (state, payload) {
      for (let m = 0; m < state.messages.length; m++) {
        if (state.messages[m].id === parseInt(payload.id)) {
          state.messages[m].user = payload.msg.user;
          state.messages[m].message = payload.msg.message;
          break;
        }
      }
    }
  },

  actions: {
    load_books: function ({ commit }) {
      fetch('http://localhost:8000/books', {method: 'get'}).then((response) => {
        return response.json()
      }).then(data => {
        commit('set_books', data)
      }).catch(err => {
        alert(err)
      })
    },

    load_loans: function ({commit}) {
      const jwt = localStorage.getItem('jwt')
      const bearer = `Bearer ${jwt}`
      fetch('http://localhost:8000/loans', {
        method: 'get',
        headers: {
          'Authorization': bearer
        }
      }).then((response) => {
        return response.json()
      }).then(data => {
        commit('set_loans', data)
      }).catch(err => {
        alert(err)
      })
    },

    load_by_category: function ({commit}, category) {
      fetch(`http://localhost:8000/books/category/${category}`).then((response) => {
        return response.json()
      }).then(data => {
        commit('set_books', data)
      }).catch(err => {
        alert(err)
      })
    },

    login: function ({commit}, user) {
      commit('set_user', user)
    },

    loan: function ({commit}, book) {
      let body = {"book": book}
      const jwt = localStorage.getItem('jwt')
      const bearer = `Bearer ${jwt}`
      fetch('http://localhost:8000/loans/loan', {
        method: 'post',
        headers: {
          'Authorization': bearer,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(data => {
        commit('add_loan', data)
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })

    },

    return_book: function ({commit}, book) {
      let body = {"book": book}
      const jwt = localStorage.getItem('jwt')
      const bearer = `Bearer ${jwt}`
      fetch('http://localhost:8000/loans/delete', {
        method: 'delete',
        headers: {
          'Authorization': bearer,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(data => {
        alert('Book returned!')
        commit('return_book', data)
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })
    },

    search: function ({commit}, text) {
      fetch(`http://localhost:8000/books/search/${text}`)
        .then(response => {
          if (!response.ok) {
            throw response
          }
          return response.json()
        }).then(data => {
          commit('set_books', data)
      }).catch(err => {
        alert(err)
      })
    }

  }
})