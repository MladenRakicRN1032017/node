<template>
  <div class="col-8">
    <b-table
        caption-top hover
        striped table-variant="primary"
        v-if="this.loans.length"
        sticky-header="800px"
        :items="this.loans"
        :fields="fields"
        @row-clicked="openBook"
        head-variant="light">
      <template #table-caption>Current loans</template>
    </b-table>
    <h1 v-else>Nema knjiga za prikaz.</h1>
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
      selected: null,
      fields: [
        {key: 'title', isRowHeader: true},
        {key: 'start_date', formatter: function (value) {  value = value.substr(0, value.indexOf('T')); return value}},
        {key: 'due_date', formatter: function (value) {  value = value.substr(0, value.indexOf('T')); return value}},
      ]
    }
  },
  methods: {
    ...mapActions(['load_loans']),
    openBook(item) {
      this.$router.push({name: 'Book', params: {id: item.book_id}})
    },
  },
  mounted() {
    this.load_loans()
  }
}
</script>

<style scoped>
  :hover{
    cursor: pointer;
  }
</style>