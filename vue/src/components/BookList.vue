<template>
  <div>
    <b-table
        table-variant="primary"
        v-if="this.books.length"
        sticky-header="800px"
        :items="this.books"
        :fields="fields"
        @row-clicked="openBook"
        head-variant="light">
      <template v-slot:cell(reserve)="row">
        <b-button variant="primary" @click="reserveBook(row.item)">Rezervisi</b-button>
      </template>
    </b-table>
    <h1 v-else>No books</h1>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "BookList",
  computed: {
    ...mapState(['books', 'member', 'loggedIn'])
  },
  data() {
    return {
      fields: [
        {key: 'title', isRowHeader: true},
        {key: 'author'},
        {key: 'publish_year'},
        {key: 'category'},
        {key: 'reserve'}
      ]
    }
  },
  methods: {
    reserveBook(item) {
      if (item.br_komada === 0) {
        alert('Trenutno nema na stanju.')
        return
      }
      this.$router.push({name: 'Reserve', params: {id: item.id}})
    },
    openBook(item) {
      this.$router.push({name: 'Book', params: {id: item.id}})
    }
  }
}
</script>

<style scoped>
  :hover {
    cursor: pointer;
  }
</style>