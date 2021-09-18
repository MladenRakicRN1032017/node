<template>
  <b-row class="pt-5 justify-content-center">
    <b-col cols="6">
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="name" type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter name">
        </div>
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

export default {
  name: "Register",
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$axios.post('/members/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      }).then(() => {
        alert('Uspesno ste se registrovali.')
        this.$router.push({name: 'Home'})
      }).catch(err => {
        alert(err.response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>