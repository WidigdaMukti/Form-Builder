<template>
  <div class="flex flex-col h-full">
    <!-- Alert -->
    <div
      v-if="showAlert"
      class="flex items-center p-4 mb-4 rounded-xl text-sm border border-emerald-400 bg-emerald-50 text-emerald-500"
      role="alert"
    >
      <svg
        class="w-5 h-5 mr-2"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0043 13.3333V9.16663M9.99984 6.66663H10.0073M9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333Z"
          stroke="#10B981"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <span class="font-semibold mr-1">Success</span> Your subscription payment
      is successful
    </div>

    <!-- Preview Information -->
    <div class="flex-1 space-y-6">
      <h2 class="text-2xl font-semibold">Preview Information</h2>
      <div class="space-y-6">
        <div v-for="(value, key, index) in combinedData" :key="index">
          <div class="flex items-center">
            <strong class="font-medium me-2 flex-shrink-0 w-32">{{
              key
            }}</strong>
            <p class="text-md flex-grow">{{ value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-4 space-x-3">
      <button
        @click="edit"
        class="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Edit
      </button>
      <button
        @click="submit"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataStep1: Object,
    dataStep2: Object,
  },
  data() {
    return {
      showAlert: false,
    };
  },
  computed: {
    combinedData() {
      return { ...this.dataStep1, ...this.dataStep2 };
    },
  },
  methods: {
    edit() {
      this.$emit("edit");
    },
    submit() {
      console.log("Submitted data:", this.combinedData);
      this.showAlert = true; 
      setTimeout(() => {
        this.showAlert = false; 
        localStorage.clear();
        this.$emit("reset");
        setTimeout(() => {
          location.reload();
        }, 100); 
      }, 2000);
    },
  },
};
</script>
