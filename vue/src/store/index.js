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

    update_member: function (state, member) {
      state.member = member
    },

    log_out: function (state) {
      state.member = null
      state.loggedIn = false
    },

    add_reservation: function (state, reservation) {
      state.reservations.push(reservation)
    },

    add_book: function (state, message) {
      state.messages.push(message);
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

    logout: function ({commit}) {
      localStorage.removeItem('jwt')
      console.log(localStorage.getItem('jwt'))
      commit('log_out')
    },

    edit_member: function ({commit}, member) {
      let body = member
      const jwt = localStorage.getItem('jwt')
      const bearer = `Bearer ${jwt}`
      fetch('http://localhost:8000/members/edit', {
        method: 'put',
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
        commit('update_member', data)
        alert('Profil je uspesno azuriran.')
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })
    },

    reserve: function ({commit}, body) {
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

    }



  }
})
