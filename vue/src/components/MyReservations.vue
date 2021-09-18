<template>
  <div class="col-8">
    <b-table
        caption-top
        striped table-variant="primary"
        v-if="this.reservations.length"
        sticky-header="800px"
        :items="this.reservations"
        :fields="fields"
        @row-clicked="openBook"
        head-variant="light">
      <template #table-caption>Current reservations</template>
    </b-table>
    <h1 v-else>No loans</h1>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "MyReservations",
  computed: {
    ...mapState(['reservations'])
  },
  data() {
    return {
      fields: [
        {key: 'title', isRowHeader: true},
        {key: 'start_date', formatter: function (value) {  value = value.substr(0, value.indexOf('T')); return value}},
      ]
    }
  },
  methods: {
    ...mapActions(['load_reservations']),
    openBook(item) {
      this.$router.push({name: 'Book', params: {id: item.book_id}})
    }
  },
  mounted() {
    this.load_reservations()
  }
}
</script>

<style scoped>
  :hover {
    cursor: pointer;
  }
</style>