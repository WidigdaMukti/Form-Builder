<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 space-y-6">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">{{ stepData.title }}</h2>
        <p class="text-gray-600">{{ stepData.description }}</p>
      </div>
      <div
        v-for="(field, index) in stepData.fields"
        :key="index"
        class="space-y-4"
      >
        <!-- Textfield -->
        <div v-if="field.type === 'textfield'" class="flex flex-col">
          <label class="text-md font-medium text-gray-700 mb-2">{{
            field.label
          }}</label>
          <input
            type="text"
            :placeholder="field.placeholder"
            v-model="formData[field.label]"
            :required="field.required"
            class="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <!-- Radio -->
        <div v-else-if="field.type === 'radio'" class="flex flex-col">
          <label class="text-md font-medium text-gray-700 mb-2">{{
            field.label
          }}</label>
          <div class="flex flex-row space-x-4 mt-1">
            <div
              v-for="option in field.options"
              :key="option.value"
              class="flex items-center"
            >
              <input
                type="radio"
                :id="option.value"
                :value="option.value"
                v-model="formData[field.label]"
                class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label :for="option.value" class="ml-2 text-md text-gray-700">{{
                option.label
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="nextStep"
      :disabled="!isFormValid"
      class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-max"
      :class="{ 'bg-blue-300 cursor-not-allowed': !isFormValid }"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    stepData: Object,
    stepIndex: Number,
  },
  data() {
    return {
      formData: {},
    };
  },
  mounted() {
    // Ambil data dari localStorage
    const savedData = JSON.parse(
      localStorage.getItem(`step-${this.stepIndex}`)
    );
    if (savedData) {
      this.formData = savedData;
    }
  },
  watch: {
    formData: {
      handler(newData) {
        // Simpan data
        localStorage.setItem(`step-${this.stepIndex}`, JSON.stringify(newData));
      },
      deep: true,
    },
  },
  computed: {
    isFormValid() {
      // Cek apakah semua field telah diisi
      return this.stepData.fields.every((field) => {
        if (field.required) {
          return (
            this.formData[field.label] &&
            this.formData[field.label].trim() !== ""
          );
        }
        return true;
      });
    },
  },
  methods: {
    nextStep() {
      // Validasi
      if (this.isFormValid) {
        this.$emit("next", this.formData);
      } else {
        alert("Please complete the required fields.");
      }
    },
  },
};
</script>

