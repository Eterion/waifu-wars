<script setup lang="ts">
import { logEvent } from 'histoire/client';
import { ref } from 'vue';
import BaseSelectBox from './BaseSelectBox.vue';

const modelValue = ref<string>();
</script>

<template>
  <Story>
    <BaseSelectBox
      v-model="modelValue"
      :options="[
        { caption: 'Winter', value: 'winter' },
        { caption: 'Spring', value: 'spring' },
        { caption: 'Summer', value: 'summer' },
        { caption: 'Fall', value: 'fall' },
      ]"
      @update:model-value="logEvent('update:modelValue', [$event])" />
  </Story>
</template>
