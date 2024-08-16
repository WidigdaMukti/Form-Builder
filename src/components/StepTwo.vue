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
        <!-- Textarea -->
        <div v-if="field.type === 'textarea'" class="flex flex-col">
          <label class="text-md font-medium text-gray-700 mb-2">{{
            field.label
          }}</label>
          <textarea
            :placeholder="field.placeholder"
            v-model="formData[field.label]"
            :required="field.required"
            class="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>
        <!-- Autocomplete -->
        <div v-else-if="field.type === 'autocomplete'" class="flex flex-col">
          <label class="text-md font-medium text-gray-700 mb-2">{{
            field.label
          }}</label>
          <input
            type="text"
            list="autocompleteOptions"
            v-model="formData[field.label]"
            :placeholder="field.placeholder"
            :required="field.required"
            class="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <datalist id="autocompleteOptions">
            <option v-for="option in field.options" :key="option">
              {{ option }}
            </option>
          </datalist>
        </div>
      </div>
    </div>
    <div class="flex mt-4 space-x-3">
      <button
        @click="previousStep"
        class="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Previous
      </button>
      <button
        @click="nextStep"
        :disabled="!isFormValid"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{ 'bg-blue-300 cursor-not-allowed': !isFormValid }"
      >
        Next
      </button>
    </div>
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
        // Simpan data setiap kali terjadi perubahan
        localStorage.setItem(`step-${this.stepIndex}`, JSON.stringify(newData));
      },
      deep: true,
    },
  },
  computed: {
    isFormValid() {
      // Cek apakah semua field yang dibutuhkan telah diisi
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
    previousStep() {
      this.$emit("previous", this.formData);
    },
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
