<template>
  <q-layout view="hHr lpR fFr">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        v-model="tab"
        no-caps
        stretch
        class="text-grey"
        active-color="indigo"
        indicator-color="transparent"
        align="justify"
      >
        <q-tab
          name="home"
          icon="home"
          @click="$route.name == 'home' ? null : $router.push('/')"
        />
        <q-tab
          name="account"
          @click="$route.name == 'account' ? null : $router.push('/account')"
        >
          <template v-slot:default>
            <div>
              <q-avatar size="sm">
                <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
              </q-avatar>
            </div>
          </template>
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainLayout",

  components: {},
  computed: {
    ...mapState(["Setting", "Auth", "MusicPlayer"])
  },
  mounted:function(){
    
  },
  data() {
    return {
      tab: this.$route.name
    };
  },
  methods: {
    onLogout() {
      this.$router.push("/login").then(() => {
        this.$store.dispatch("Auth/logout");
      });
    }
  }
};
</script>
<style type="text/css">
.style1{
  background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('~assets/images/bg-login.jpg');background-size:cover;
  background-attachment: fixed;
}
</style>
