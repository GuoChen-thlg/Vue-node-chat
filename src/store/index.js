import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  user: {
    phone: "",
    name: "",
    head:'',
    isLogin: false
  },
  infoSet: {}
};

const getters = {
  getUser() {
    return state.user;
  },
  getInfoSet(phone) {
    return  state.infoSet
  }
};
const mutations = {
  setUser(state, user) {
    state.user = { ...state.uest, ...user };
  },
  setInfoSet(state, info ) {
    console.log(info);
    info.sender in state.infoSet
      ? state.infoSet[info.sender].push(info)
      : ((state.infoSet[info.sender] = []),
        state.infoSet[info.sender].push(info));
      state.infoSet;
  }
};
const store = new Vuex.Store({
  state,
  getters,
  mutations
});
export default store;
