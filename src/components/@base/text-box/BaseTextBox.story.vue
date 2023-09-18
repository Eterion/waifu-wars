<script setup lang="ts">
import { logEvent } from 'histoire/client';
import { ref } from 'vue';
import BaseTextBox from './BaseTextBox.vue';

const modelValue = ref<string>();
</script>

<template>
  <Story>
    <Variant title="Default">
      <BaseTextBox
        v-model="modelValue"
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
    <Variant title="Search">
      <BaseTextBox
        v-model="modelValue"
        search
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
  </Story>
</template>
