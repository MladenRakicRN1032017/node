<template>
  <div>
    <b-table
        v-if="this.loans.length"
        sticky-header="800px"
        :items="this.loans"
        :fields="fields"
        head-variant="light">
      <template v-slot:cell(return)="row">
        <b-button variant="primary" @click="returnBook(row.item.book_id)">Return</b-button>
      </template>
    </b-table>
    <h1 v-else>No loans</h1>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "MyBooks",
  computed: {
    ...mapState(['loans'])
  },
  data() {
    return {
      fields: [
        {key: 'title'},
        {key: 'loan_date'},
        {key: 'due_date'},
        {key: 'return'}
      ]
    }
  },
  methods: {
    ...mapActions(['load_loans', 'return_book']),
    returnBook(id) {
      console.log(id)
      this.return_book(id)
    }
  },
  mounted() {
    this.load_loans()
  }
}
</script>

<style scoped>

</style>