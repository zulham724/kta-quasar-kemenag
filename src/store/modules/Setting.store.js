/* Module1.store.js */
import axios from "axios";
// State object
const state = {
    // url: "http://localhost:8000",
    storageUrl: "https://S3.wasabisys.com/agpaiidigital.org",
    url: 'https://agpaiidigital.org',
    // storageUrl: 'http://localhost:8000/storage',
    assets: {
        bgToolbar: "statics/bg-toolbar.jpeg"
    },
    count: {},
    provinces:[],
    bestusers:{}
};
// Mutations
const mutations = {
    setTotalMemberEachRegion(state, payload) {
        state.count = {...state.count, ...payload.totalMember };
    },
    setTotalUser(state, payload) {
        state.count = {...state.count, user_total: payload.user_total };
    },
    setProvinces(state, payload){
        state.provinces = payload
    },
    setBestUsers(state, payload){
        state.bestusers = payload
    }
};

// Actions
const actions = {
    getProvinces({commit, dispatch}){
        return new Promise((resolve, reject) => {
            dispatch("Province/index",{}, {root:true})
              .then(res => {
                  let provinces = res.data
                  .sort((a, b) => {
                    return b.users_count - a.users_count;
                  })
                  .slice(0, 10);
                  //console.log(provinces)
                  commit("setProvinces", provinces);
                  resolve()
              })
              .catch(err => {
                reject(err);
              });
          });
    },
    getBestUsers({commit}){
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/setting/information`)
                .then(res => {
                   // console.log(res.data)
                    commit("setBestUsers", {data: res.data});
                    //resolve(res)
                });
        });
    },
    getDetailTotalMember({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/getDetailTotalMember`)
                .then(res => {
                    commit("setTotalMemberEachRegion", { totalMember: res.data });
                });
        });
    },
    getCountUser({ commit }) {
        axios.get(`${this.state.Setting.url}/api/v1/users/count`).then(res => {
            commit("setTotalUser", { user_total: res.data });
        });
    },
    index({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/settings`).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
};

// Getter functions
const getters = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
