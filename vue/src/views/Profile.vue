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
          <b-tab title="Info">
            <div>
              <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img src="https://avatarfiles.alphacoders.com/120/120992.jpg" alt="Image" class="rounded-0"></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body>
                      <b-card-title>{{member.email}}</b-card-title>
                      <b-card-text>
                        This is a wider card with supporting text as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-tab>
          <b-tab title="Books">
            <MyBooks/>
          </b-tab>
          <b-tab title="Rezervacije">
            <MyReservations/>
          </b-tab>
          <b-tab title="History">
            <MyHistory/>
          </b-tab>
        </b-tabs>
      </div>
    </b-row>
  </div>
</template>

<script>
import MyBooks from "@/components/MyBooks";
import MyReservations from "@/components/MyReservations";
import MyHistory from "@/components/MyHistory";
import {mapState} from 'vuex'
export default {
  name: "Profile",
  components: {MyReservations, MyBooks, MyHistory},
  computed: {
    ...mapState(['member'])
  }
}
</script>

<style scoped>

</style>