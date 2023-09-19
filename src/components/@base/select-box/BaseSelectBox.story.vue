<script setup lang="ts">
import { MediaSeason } from '@/composables/useGraphQL';
import { logEvent } from 'histoire/client';
import { ref } from 'vue';
import BaseSelectBox from './BaseSelectBox.vue';

const seasonValue = ref<string>();
const seasonOptions: InstanceType<typeof BaseSelectBox>['options'] =
  Object.entries(MediaSeason).map(
    ([caption, value]: [string, MediaSeason]) => ({
      caption,
      value,
    }),
  );

const yearValue = ref(1976);
const yearOptions: InstanceType<typeof BaseSelectBox>['options'] = Array.from({
  length: new Date().getFullYear() - 1940 + 1,
})
  .map((_, index) => 1940 + index)
  .reverse()
  .map((year) => ({ caption: year.toString(), value: year }));
</script>

<template>
  <Story>
    <Variant title="Default">
      <BaseSelectBox
        v-model="seasonValue"
        :options="seasonOptions"
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
    <Variant title="Many">
      <BaseSelectBox
        v-model="yearValue"
        :options="yearOptions"
        @update:model-value="logEvent('update:modelValue', [$event])" />
    </Variant>
  </Story>
</template>
