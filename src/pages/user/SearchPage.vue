<template>
<div class="style1">

  <q-layout view="hHh Lpr fFf">
    <q-header elevated style="background: rgba(0, 0, 0, 0.6);">
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
            color="teal"
            dense
            square
            v-model="search"
            label="Cari"
            label-color="white"
            borderless
            class="q-ml-sm q-mr-sm text-white"
            @input="onSearch"
          >
            <template v-slot:after>
              <q-icon color="white" name="search" />
            </template>
          </q-input>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      
      <q-infinite-scroll @load="onLoad" :offset="250">
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
          <div v-if="users.data">
            <q-intersection
              v-for="user in users.data"
              :key="user.id"
              :style="`min-height: 10vh;width: 100vw`"
              transition="scale"
              style="background: rgba(0, 0, 0, 0.3);"
            >
              <item-component :user="user"></item-component>
            </q-intersection>
          </div>
        </q-list>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="teal" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-page-container>
  </q-layout>
</div>
</template>

<script>
import { mapState } from "vuex";
import { debounce } from "quasar";
export default {
  components: {
    ItemComponent: () => import("components/user/ItemComponent.vue")
  },
  data() {
    return {
      search: "",
      users: {},
      loading: false
    };
  },
  created() {
    this.onSearch = debounce(this.onSearch, 1000);
  },
  methods: {
    onSearch() {
      if (this.search.length != 0) {
        this.loading = true;
        this.$store
          .dispatch("User/search", this.search)
          .then(res => {
            this.users = res.data;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    onLoad(index, done) {
      this.users.next_page_url
        ? this.$store
            .dispatch("User/next", this.users.next_page_url)
            .then(res => {
              const users = {
                ...res.data,
                data: [...this.users.data, ...res.data.data]
              };
              this.users = users;
              done();
            })
        : done();
    }
  }
};
</script>

<style type="text/css">
.style1{
  background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('~assets/images/bg-login.jpg');background-size:cover;
}
</style>
