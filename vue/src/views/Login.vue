<template>
  <b-row class="pt-5 justify-content-center">
    <b-col cols="6">
      <form @submit.prevent="log">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="text" class="form-control" id="email" aria-describedby="email" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary mt-2">Login</button>
      </form>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Login",
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    log() {
      this.$axios.post('/users/login', {
        email: this.email,
        password: this.password,
      }).then(response => {
        this.login(response.data)
        localStorage.setItem('jwt', response.data.jwt)
        this.$router.push({name: 'Home'});
      }).catch(err => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>

</style>