<template>
  <div class="col-8">
    <b-table
        caption-top
        striped table-variant="primary"
        v-if="this.loansHistory.length"
        sticky-header="800px"
        :items="this.loansHistory"
        :fields="fields"
        @row-clicked="openBook"
        head-variant="light">
      <template #table-caption>Loans history</template>
    </b-table>
    <h1 v-else>Nema knjiga za prikaz.</h1>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "MyHistory",
  computed: {
    ...mapState(['loansHistory'])
  },
  data() {
    return {
      fields: [
        {key: 'title', isRowHeader: true},
        {key: 'start_date', formatter: function (value) {  value = value.substr(0, value.indexOf('T')); return value}},
        {key: 'return_date', formatter: function (value) {  value = value.substr(0, value.indexOf('T')); return value}}
      ]
    }
  },
  methods: {
    ...mapActions(['load_history']),
    openBook(item) {
      this.$router.push({name: 'Book', params: {id: item.book_id}})
    }
  },
  mounted() {
    this.load_history()
  }
}
</script>

<style scoped>
  :hover {
    cursor: pointer;
  }
</style>