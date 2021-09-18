<template>
  <b-row class="pt-5 justify-content-center">
    <b-col cols="6">
      <div>
        <label><b>Izaberite datum</b></label>
        <b-form-datepicker id="datepicker" v-model="date" :max="max" :min="min" class="mb-2 mt-2"></b-form-datepicker>
      </div>
      <b-button variant="primary" @click="reserveBook">Rezervisi</b-button>
    </b-col>
  </b-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "ReserveBook",
  props: {
    book: Number
  },
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 2)
    maxDate.setDate(15)
    return {
      min: minDate,
      max: maxDate,
      date: ''
    }
  },
  methods: {
    ...mapActions(['reserve']),
    reserveBook() {
      if (this.date === '') {
        alert('Morate uneti datum!')
        return
      }
      let body = {"book_id": this.book, "start_date": this.date}
      this.reserve(body)
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style scoped>

</style>