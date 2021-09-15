<template>
  <div>
    <b-table
        v-if="this.reservations.length"
        sticky-header="800px"
        :items="this.reservations"
        :fields="fields"
        head-variant="light">
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
        {key: 'title'},
        {key: 'start_date'},
      ]
    }
  },
  methods: {
    ...mapActions(['load_reservations']),
  },
  mounted() {
    this.load_reservations()
  }
}
</script>

<style scoped>

</style>