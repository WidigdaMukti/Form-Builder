<template>
  <ol class="relative flex flex-col space-y-8">
    <li
      v-for="(step, index) in totalSteps"
      :key="index"
      class="relative flex items-center"
    >
      <a :href="step.href" class="flex items-center font-medium w-full">
        <span
          :class="[
            'w-8 h-8 border-2 rounded-full flex justify-center items-center mr-3 text-sm lg:w-10 lg:h-10',
            {
              'bg-blue-500 text-white border-transparent': index < currentStep,
              'bg-indigo-50 text-blue-500 border-blue-500':
                index === currentStep,
              'bg-gray-50 text-gray-600 border-gray-200': index > currentStep,
            },
          ]"
        >
          {{ index + 1 }}
        </span>
        <div class="block">
          <h4
            :class="[
              'text-lg',
              {
                'text-blue-500': index <= currentStep,
                'text-gray-900': index > currentStep,
              },
            ]"
          >
            {{ `Step ${index + 1}` }}
          </h4>
          <span class="text-sm">{{ step.label }}</span>
        </div>
      </a>
      <span
        v-if="index < totalSteps - 1"
        class="absolute w-0.5 h-full bg-gray-200 -bottom-10 left-4 lg:left-5"
      ></span>
    </li>
  </ol>
</template>

<script>
export default {
  name: "Indicator",
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
    steps: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
