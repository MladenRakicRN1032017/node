<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <SingleBook :book="book"/>
    </b-col>
  </b-row>
</template>

<script>
import SingleBook from "@/components/SingleBook";
export default {
  name: "Book",
  components: {SingleBook},
  data() {
    return {
      book: null
    }
  },
  props: {
    id: Number,
  },
  mounted() {
    fetch('http://localhost:8000/books/' + this.id)
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    }).then(data => {
      this.book = data
    }).catch(err => {
      if (typeof err.text === 'function')
        err.text().then((errorMessage) => {
          alert(errorMessage);
        });
      else
        alert(err);
    })
  }
}
</script>

<style scoped>

</style>