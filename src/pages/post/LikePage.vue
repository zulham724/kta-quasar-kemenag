<template>
<div class="style1">
  <q-layout view="hHh Lpr fFf">
    <q-header elevated style="background: rgba(0, 0, 0, 0.6);">
      <q-toolbar>
        <q-btn
          color="teal"
          flat
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          <div class="text-body2 text-teal text-bold">Suka</div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-list bordered class="rounded-borders">
          <div v-if="loading">
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
          <div v-if="post">
            <q-intersection
              v-for="(user,u) in post.likes.map(like=>like.user)"
              :key="u"
              :style="`min-height: 10vh;width: 100vw`"
              transition="scale"
               style="background: rgba(0, 0, 0, 0.3);"
            >
              <item-component :user="user"></item-component>
            </q-intersection>
          </div>
        </q-list>
    </q-page-container>
  </q-layout>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:{
    postId: null
  },
  components: {
    ItemComponent: () => import("components/user/ItemComponent.vue")
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      post: null,
      loading: false
    };
  },
  mounted() {
    this.getPost()
  },
  methods: {
    getPost(){
      this.$store.dispatch('Post/show',this.postId).then(res=>{
        this.post = res.data
      })
    }
  }
};
</script>

<style>
.style1{
  background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('~assets/images/bg-login.jpg');background-size:cover;
}
</style>
