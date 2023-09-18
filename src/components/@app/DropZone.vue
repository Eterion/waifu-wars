<script setup lang="ts">
import { ref } from 'vue';
import DraggableCard from './DraggableCard.vue';

withDefaults(
  defineProps<{
    /** Array of items. */
    modelValue?: Array<InstanceType<typeof DraggableCard>['$props']>;
  }>(),
  {
    modelValue: () => [],
  },
);

const rootRef = ref<HTMLElement>();
</script>

<template>
  <div ref="rootRef" :class="$style.el">
    <DraggableCard
      v-for="(card, index) in modelValue"
      :key="index"
      v-bind="card" />
  </div>
</template>

<style module lang="scss">
.el {
  box-sizing: content-box;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 75px / 3 * 4;
  padding: 6px;
}
</style>
