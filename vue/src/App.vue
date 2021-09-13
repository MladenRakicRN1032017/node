<template>
  <div>
    <Navbar/>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {Navbar},
  methods: {
    ...mapActions(['login'])
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-family: Lato;
}
</style>
