<template>
  <div>
    <b-row class="pt-5 justify-content-center">
      <b-col cols="6" class="text-center">
        <h1>My Profile</h1>
      </b-col>
    </b-row>
    <b-row>
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="Books" active>
            <p>Iznajmljene knjige</p>
            <MyBooks/>
          </b-tab>
          <b-tab title="History"><p>Istorija knjiga</p></b-tab>
        </b-tabs>
      </div>
    </b-row>
  </div>
</template>

<script>
import MyBooks from "@/components/MyBooks";
export default {
  name: "Profile",
  components: {MyBooks}
}
</script>

<style scoped>

</style>