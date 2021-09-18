<template>
  <b-row class="mt-3 text-center">
    <h1>Katalog knjiga</h1>
    <b-row class="pt-5 justify-content-center">
      <b-col cols="10">
        <BookList/>
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import BookList from "@/components/BookList";
export default {
  name: "Home",
  components: {BookList},
  computed: {
    ...mapState(['books'])
  },
  props: {
    text: String,
    category: String
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.fetchData()
    }
  },
  methods: {
    ...mapActions(['load_books', 'search', "load_by_category"]),
    fetchData() {
      if (this.text) {
        this.search(this.text)
      } else if (this.category) {
        this.load_by_category(this.category)
      } else {
        this.load_books()
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>