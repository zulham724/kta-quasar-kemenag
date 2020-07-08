<template>
  <div class="style1 text-white">
    <q-layout view="lHh lpr lFf">
      <q-header elevated style="background: rgba(0, 0, 0, 0.6);">
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
             <q-card :class="`my-card q-ma-sm bg-${item.color} text-white text-bold`" style="height:15vh;opacity:0.8" @click="$router.push(`/user/searchBest/${item.category}`)">
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
          category: 'event_guests_max',
          color:'blue',
        },
        {
          name: "Guru teraktif membuat RPP",
          icon: 'note',
          category: 'lesson_plans_max',
          color:'light-blue',
        },
        {
          name: "Guru teraktif berdiskusi ",
          icon:'record_voice_over',
          category: 'posts_max',
          color:'cyan'
        },
        {
          name: "Guru dengan wawasan terluas",
          icon:'book',
          category:'books_max',
          color:'teal'
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
