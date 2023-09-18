<script setup lang="ts">
import { ref } from 'vue';
import BaseTextBox from '../text-box/BaseTextBox.vue';
import BaseField from './BaseField.vue';

const modelValue = ref<string>();
</script>

<template>
  <Story>
    <BaseField label="Field">
      <BaseTextBox v-model="modelValue" />
    </BaseField>
  </Story>
</template>
