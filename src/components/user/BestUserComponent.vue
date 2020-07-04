<template>
  <div>
    <q-card class="my-card">
       <q-badge style="position:absolute;top:0;left:0" color="teal" :label="'#'+(index+1)" />
      <q-card-section clickable v-ripple v-if="bestuser!= null" @click="$router.push(`/user/profile/${bestuser.id}`)">
        <div class="row justify-center">
            <q-avatar size="20vw" >
                    <q-img 
                    :src="`${Setting.storageUrl}/${bestuser.avatar}`"
                      no-default-spinner
                    />
                  </q-avatar>  
          </div>
           <div class="row justify-center" >
              {{bestuser.name}}
          </div>
          <q-separator />
          
          <div class="row justify-center" >
            <div class="col-3 self-center">
              <div class="row justify-center">
                <div class="text-body1 text-bold">
                  {{bestuser.total_posts}}
                </div>
              </div>
              <div class="row justify-center">
                <div class="text-caption">Media</div>
              </div>
            </div>
            <div class="col-3 self-center">
              <div class="row justify-center">
                <div class="text-body1 text-bold">
                  {{bestuser.total_event_guests}}
                </div>
              </div>
              <div class="row justify-center">
                <div class="text-caption">Acara</div>
              </div>
            </div>
            <div class="col-3 self-center">
              <div class="row justify-center">
                <div class="text-body1 text-bold">
                   {{bestuser.total_books}}
                </div>
              </div>
              <div class="row justify-center">
                <div class="text-caption">Buku</div>
              </div>
            </div>
            <div class="col-3 self-center">
              <div class="row justify-center">
                <div class="text-body1 text-bold">
                  {{bestuser.total_lesson_plans}}
                </div>
              </div>
              <div class="row justify-center">
                <div class="text-caption">RPP</div>
              </div>
            </div>
          </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    bestuser: null,
    index:null,
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
