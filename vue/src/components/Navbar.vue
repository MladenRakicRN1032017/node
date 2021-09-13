<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Library</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li  class="nav-item">
              <router-link :to="{name: 'Home'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">Home</router-link>
            </li>
            <b-nav-item-dropdown id="categoriesDropdown" text="Categories" toggle-class="nav-link-custom" right>
              <b-dropdown-item v-for="category in categories" :key="category.name">
                <router-link :to="{name: 'HomeCategory', params: {category: category.name}}" tag="a" class="nav-link">{{category.name}}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <li class="nav-item">
              <b-form-input v-model="searchText" placeholder="Search..."></b-form-input>
            </li>
            <li class="nav-item">
              <b-button variant="primary" class="ms-2" @click="search">Search</b-button>
            </li>
          </ul>
          <b-button v-if="!this.loggedIn" variant="outline-success" @click="redirectToLogin()">Log in</b-button>
          <b-button v-if="this.loggedIn" variant="outline-success" @click="redirectToProfile()">{{user.name}}</b-button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "Navbar",
  computed: {
    ...mapState(['loggedIn', 'user'])
  },
  data() {
    return {
      searchText: '',
      categories: []
    }
  },
  methods: {
    ...mapActions(['search', 'login']),
    redirectToLogin() {
      this.$router.push({name: 'Login'})
    },
    redirectToProfile() {
      this.$router.push({name: 'Profile'})
    },
    search() {
      if (this.searchText === '') {
        return
      } else {
        this.$router.push({name: 'HomeFiltered', params: {text: this.searchText}})
      }
    }
  },
  mounted() {
    this.$axios.get('/categories')
    .then(response => {
      this.categories = response.data
    }).catch(err => {
      alert(err)
    })
  }
}
</script>

<style scoped>

</style>