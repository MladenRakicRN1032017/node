import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: null,
    loggedIn: false,
    books: [],
    loans: [],
    loansHistory: [],
    reservations: []
  },

  mutations: {
    set_books: function (state, books) {
      state.books = books;
    },

    set_loans: function (state, loans) {
      state.loans = loans
    },

    set_reservations: function (state, reservations) {
      state.reservations = reservations
    },

    set_history: function (state, history) {
      state.loansHistory = history
    },

    set_member: function (state, member) {
      state.member = member
      state.loggedIn = true
    },

    log_out: function (state) {
      state.member = null
      state.loggedIn = false
    },

    add_reservation: function (state, reservation) {
      state.reservations.push(reservation)
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
      fetch('http://localhost:8000/books').then((response) => {
        return response.json()
      }).then(data => {
        commit('set_books', data)
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

    load_reservations: function ({commit}) {
      const jwt = localStorage.getItem('jwt')
      const bearer = `Bearer ${jwt}`
      fetch('http://localhost:8000/reservations', {
        method: 'get',
        headers: {
          'Authorization': bearer
        }
      }).then((response) => {
        return response.json()
      }).then(data => {
        commit('set_reservations', data)
      }).catch(err => {
        alert(err)
      })
    },

    load_history: function ({commit}) {
      const jwt = localStorage.getItem('jwt')
      const bearer = `Bearer ${jwt}`
      fetch('http://localhost:8000/history', {
        method: 'get',
        headers: {
          'Authorization': bearer
        }
      }).then((response) => {
        return response.json()
      }).then(data => {
        commit('set_history', data)
      }).catch(err => {
        alert(err)
      })
    },

    login: function ({commit}, member) {
      commit('set_member', member)
    },

    reserve: function ({commit}, book) {
      let body = {"book_id": book}
      const jwt = localStorage.getItem('jwt')
      const bearer = `Bearer ${jwt}`
      fetch('http://localhost:8000/reservations/reserve', {
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
        commit('add_reservation', data)
        alert('Knjiga je uspesno rezervisana.')
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



  }
})
