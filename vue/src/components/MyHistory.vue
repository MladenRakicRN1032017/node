<template>
  <div>
    <b-table
        v-if="this.loansHistory.length"
        sticky-header="800px"
        :items="this.loansHistory"
        :fields="fields"
        head-variant="light">
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
        {key: 'title'},
        {key: 'start_date'},
        {key: 'return_date'}
      ]
    }
  },
  methods: {
    ...mapActions(['load_history']),
  },
  mounted() {
    this.load_history()
  }
}
</script>

<style scoped>

</style>