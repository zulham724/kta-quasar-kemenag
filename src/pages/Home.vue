<template>
  <div class="style1 text-white">
    <q-layout view="lHh lpr lFf">
      <q-header elevated class="transparent">
        <q-toolbar>
        <q-toolbar-title class="text-weight-light ">
                Kementrian Agama AGPAII
        </q-toolbar-title>
        <q-btn flat round dense icon="search" @click="$router.push({ name: 'usersearch' })" />
        <div class="col-1"></div>
        <q-btn flat round dense icon="logout" @click="onLogout()" />
        </q-toolbar>
      </q-header>
      
      <q-page-container>
          <q-page padding>
        <!-- content -->
        <div class="row full-width q-mb-md">
           <div class="col-6"
            v-for="item in items"
            :key="item.id"
           >
           <q-intersection transition="scale"> 
             <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh;opacity:0.8" @click="$router.push(`/user/searchBest/${item.category}`)">
              <q-icon v-bind:name="item.icon" style="position:absolute;bottom:0;right:0" size="xl" />
              <q-card-section>
                {{item.name}}
              </q-card-section>
            </q-card>
           </q-intersection>
             

           </div>
        </div>
        
        
      </q-page>
      </q-page-container>

    </q-layout>
    

    
  </div>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      items: [
        {
          name: "Guru teraktif di lapangan",
          icon: 'event',
          category: 'events_max'
        },
        {
          name: "Guru teraktif membuat RPP",
          icon: 'note',
          category: 'lesson_plans_max'
        },
        {
          name: "Guru teraktif berdiskusi ",
          icon:'record_voice_over',
          category: 'posts_max'
        },
        {
          name: "Guru dengan wawasan terluas",
          icon:'book',
          category:'books_max'
        }
      ]
    };
  },
  mounted(){
    //console.log(this.$root.tab)
  },
  methods: {
    onLogout() {
      this.$router.push("/login").then(() => {
        this.$store.dispatch("Auth/logout");
      });
    },
  }
};
</script>
<style type="text/css">
.style1{
  background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('~assets/images/bg-login.jpg');background-size:cover;
}
</style>
