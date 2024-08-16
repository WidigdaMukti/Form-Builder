import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stepData: {},
  },
  mutations: {
    updateStepData(state, { stepIndex, data }) {
      Vue.set(state.stepData, stepIndex, data);
    },
  },
  getters: {
    getStepData: (state) => (stepIndex) => {
      return state.stepData[stepIndex] || {};
    },
  },
});
