<template>
  <div>
    <b-table
        v-if="this.books.length"
        sticky-header="800px"
        :items="this.books"
        :fields="fields"
        :tbody-tr-class="rowClass"
        head-variant="light">
      <template v-slot:cell(loan)="row">
        <b-button variant="primary" @click="loanBook(row.item.id)">Loan</b-button>
      </template>
    </b-table>
    <h1 v-else>No books</h1>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "BookList",
  computed: {
    ...mapState(['books', 'user'])
  },
  data() {
    return {
      fields: [
        {key: 'title'},
        {key: 'author'},
        {key: 'publish_year'},
        {key: 'category'},
        {key: 'loan'}
      ]
    }
  },
  methods: {
    ...mapActions(['loan']),
    loanBook(id) {
      this.loan(id)
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      return 'table-primary'
    }
  }
}
</script>

<style scoped>

</style>