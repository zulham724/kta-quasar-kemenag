<template>
  <div>
    <q-item clickable v-ripple v-if="bestuser != null" @click="$router.push(`/user/profile/${bestuser.user_id?bestuser.user_id:bestuser.author_id}`)">
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="`${Setting.storageUrl}/${bestuser.avatar}`" width="15vw" no-default-spinner />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="3">{{ bestuser.name }}</q-item-label>
        <q-item-label caption lines="2">{{ bestuser.email }}</q-item-label>
      </q-item-section>

    </q-item>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    bestuser: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.bestuser)
  },
  methods: {
  }
};
</script>

<style></style>
