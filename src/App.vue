<template>
  <div
    id="app"
    class="min-h-screen flex flex-col items-center justify-center p-6"
  >
    <h1 class="text-5xl font-bold mb-12">Form Builder!</h1>

    <div
      class="w-full max-w-4xl bg-white drop-shadow-lg rounded-3xl p-6 flex form-container"
    >
      <div class="flex-auto pr-4">
        <Indicator
          :current-step="currentStepIndex"
          :total-steps="steps.length"
          :steps="steps"
        />
      </div>

      <div class="w-3/5 flex-auto">
        <component
          :is="currentStepComponent"
          @next="handleNext"
          @previous="handlePrevious"
          @edit="handleEdit"
          :step-data="currentStepData"
          :step-index="currentStepIndex"
          :data-step1="stepData[0]"
          :data-step2="stepData[1]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Step1 from "./components/StepOne.vue";
import Step2 from "./components/StepTwo.vue";
import Preview from "./components/Preview.vue";
import Indicator from "./components/Indicator.vue";
import steps from "./data/response.json";

export default {
  name: "App",
  components: {
    Step1,
    Step2,
    Preview,
    Indicator,
  },
  data() {
    return {
      steps,
      currentStepIndex: 0,
      stepData: {
        0: {},
        1: {},
      },
    };
  },
  computed: {
    currentStepComponent() {
      return this.currentStepIndex < this.steps.length
        ? `Step${this.steps[this.currentStepIndex].step}`
        : "Preview";
    },
    currentStepData() {
      return this.steps[this.currentStepIndex];
    },
  },
  methods: {
    handleNext(data) {
      this.stepData[this.currentStepIndex] = data;
      this.currentStepIndex += 1;
    },
    handlePrevious(data) {
      this.stepData[this.currentStepIndex] = data;
      this.currentStepIndex -= 1;
    },
    handleEdit() {
      this.currentStepIndex = this.steps.length - 1;
    },
    reset() {
      this.currentStepIndex = 0;
      this.stepData = {
        0: {},
        1: {},
      };
    },
  },
};
</script>

<style scoped>
#app {
  background: url("@/assets/wave.svg") no-repeat top;
  background-size: contain;
  background-color: #f3f4f5;
}

.form-container {
  width: 100%;
  min-height: 420px;
  max-width: 600px;
  display: flex;
  justify-content: center;
}

.drop-shadow-lg {
  box-shadow: 0px 0px 25px rgba(151, 150, 150, 0.15);
}
</style>
