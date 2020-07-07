<template>
  <div class="style1">
    <q-layout view="lHh lpr lFf">
            <q-header elevated  style="background: rgba(0, 0, 0, 0.6);">
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          <q-input
            dark
            dense
            square
            v-model="search"
            label="Cari"
            label-color="white"
            borderless
            class="q-ml-sm q-mr-sm"
          >
            <template v-slot:after>
              <q-icon color="white" name="search" />
            </template>
          </q-input>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
          <q-infinite-scroll :offset="250">
            
            <q-list bordered class="rounded-borders">
              <div v-if="!Setting.bestusers.data">
                <q-item
                  style="max-width: 300px;"
                  v-for="n in 9"
                  :key="`loading-${n}`"
                >
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" width="65%" />
                     </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-if="Setting.bestusers.data">
                <!-- {{Setting.bestusers.data['posts_max'][0].author_id}} -->
                <q-intersection
                  v-for="(bestuser, index) in bestUsers"
                  :key="bestuser.id"
                  class="q-pa-xs"
                  transition="flip-right"
                >
                  <best-user-component :color="getCategoryColor(category)" :index="index" :bestuser="bestuser"></best-user-component>
                </q-intersection>
              </div>
            </q-list>
            <!-- <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="teal" size="40px" />
              </div>
            </template> -->
          </q-infinite-scroll>  
      </q-page>  
    </q-page-container>
          
       </q-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { debounce } from "quasar";
export default {
    props:['category'],
  computed: {
    ...mapState(["Setting", "Auth"]),
    
    bestUsers:function(){
      if (this.search.length != 0) {
        return this.Setting.bestusers.data[this.category].filter(e=>e.name.toLowerCase().indexOf(this.search.toLowerCase())>-1)
      }else return this.Setting.bestusers.data[this.category]
    }

  },
  components: {
    BestUserComponent: () => import("components/user/BestUserComponent.vue")
  },
  data(){
    return {
     search: "",
      //bestusers: {},
      loading: false,
      item:[
        {
          icon: 'event',
          category: 'event_guests_max',
          color:'blue',
        },
        {
          icon: 'note',
          category: 'lesson_plans_max',
          color:'light-blue',
        },
        {
          icon:'record_voice_over',
          category: 'posts_max',
          color:'cyan'
        },
        {
          icon:'book',
          category:'books_max',
          color:'teal'
        }
      ]
    }
  },
  mounted(){
    this.onSearch = debounce(this.onSearch, 1000);
  },
  methods:{
    onSearch(){
      if (this.search.length != 0) {
        this.loading = true;
        this.$store
          .dispatch("LessonPlan/search", this.search)
          .then(res => {
            this.lessonplans = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    onLoad(index, done) {
      this.lessonplans.next_page_url
        ? this.$store
            .dispatch("LessonPlan/next", this.lessonplans.next_page_url)
            .then(res => {
              const lessonplans = {
                ...res.data,
                data: [...this.lessonplans.data, ...res.data.data]
              };
              this.lessonplans = lessonplans;
              done();
            })
        : done();
    },
    getCategoryColor:function(category){
      return this.item[this.item.map(function(e){
        return e.category;
      }).indexOf(category)].color;
    }
  }
}
</script>

<style type="text/css">
.style1{
  background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('~assets/images/bg-login.jpg');background-size:cover;
}
</style>
