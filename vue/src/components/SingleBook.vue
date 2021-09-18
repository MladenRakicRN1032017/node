<template>
  <b-container class="pt-5">
    <b-card>
      <b-card-header header-class="text-center">
        <h2>{{book.title}}</h2>
      </b-card-header>
      <b-card-body>
        <h3>Autor</h3><h5><i>{{book.author}}</i></h5>
      </b-card-body>
      <b-card-body>
        <h3>Izdata</h3><h5><i>{{book.publish_year}}</i></h5>
      </b-card-body>
      <b-card-body>
        <h3>Kategorija</h3><h5><i>{{book.category}}</i></h5>
      </b-card-body>
      <b-card-body v-if="book.br_komada > 0">
        <h3>Stanje</h3><b>{{book.br_komada}}</b>
      </b-card-body>
      <b-card-body v-else>
        <h3>Stanje</h3>Trenutno nije na stanju.
      </b-card-body>
      <b-card-body v-if="book.br_komada > 0">
        <b-button v-if="book.br_komada > 0" variant="primary" @click="this.reserveBook">Rezervisi</b-button>
      </b-card-body>
    </b-card>

  </b-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: "SingleBook",
  computed: {
    ...mapState(['loggedIn'])
  },
  props: {
    book: Object
  },
  methods: {
    ...mapActions(['reserve']),
    reserveBook() {
      if (!this.loggedIn) {
        this.$router.push({name: 'Login'})
        return
      }
      this.$router.push({name: 'Reserve', params: {id: this.book.id}})
    }
  }
}
</script>

<style scoped>

</style>