<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { isNumber } from 'lodash-es';
import { computed } from 'vue';
import BaseModal from '../base-modal/BaseModal.vue';

const props = defineProps<{
  /**
   * Title text.
   */
  title?: string;
  /**
   * Controls visibility.
   */
  visible?: boolean;
  /**
   * Default width, in pixels.
   */
  width?: number;
}>();

const emit = defineEmits<{
  (e: 'hidden'): void;
  (e: 'hide'): void;
  (e: 'show'): void;
  (e: 'shown'): void;
  (e: 'update:visible', visilbe: boolean): void;
}>();

const visible = useVModel(props, 'visible', emit);
const width = computed(() => {
  return isNumber(props.width) ? `${props.width}px` : undefined;
});
</script>

<template>
  <BaseModal
    v-model:visible="visible"
    @hidden="$emit('hidden')"
    @hide="$emit('hide')"
    @show="$emit('show')"
    @shown="$emit('shown')">
    <div :class="$style.el" :style="{ width }">
      <h2 v-if="title" :class="$style.title">{{ title }}</h2>
      <slot />
    </div>
  </BaseModal>
</template>

<style module lang="scss">
.el {
  padding: 32px;
}

.title {
  font-weight: normal;
  margin-bottom: 0.75rem;
  text-align: center;
}
</style>
