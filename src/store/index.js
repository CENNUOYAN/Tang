import Vue from "vue";
import Vuex from "vuex";
// import user from "./module/user";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    // user
  },
  state: {
    count: 7777,
    patientLists:''
  },
  mutations: {
    change(state, value) {
      state.count = value;
    },
    setpatientLists(state,value){
      state.patientLists = value
    }
  },
  actions: {
    changevalue(context, params) {
      context.commit("change", params.count);
    }
  }
});
