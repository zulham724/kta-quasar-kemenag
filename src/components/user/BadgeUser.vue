<template>
<div>
    <div class="col-3" v-for="index in 4" :key="index">
         <q-badge color="primary"><q-icon name="event"/>babi</q-badge>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    user: null
  },
  computed: {
    ...mapState(["Setting", "Auth"]),
    badges(){
        const badges=[]
        this.items.forEach((v,k)=>{
            badges.push(v)
        });
        //return this.user.id
    }
  },
  data() {
    return {
       

    };
  },
  mounted() {},
  methods: {

  }
};
</script>

<style></style>
