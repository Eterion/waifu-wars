<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { isNumber } from 'lodash-es';
import { computed } from 'vue';
import BaseModal from '../modal/BaseModal.vue';

const props = defineProps<{
  /** Danger style. */
  danger?: boolean;
  /** Title text. */
  title?: string;
  /** Controls visibility. */
  visible?: boolean;
  /** Default width, in pixels. */
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
      <h2 v-if="title" :class="[$style.title, { [$style.danger]: danger }]">
        {{ title }}
      </h2>
      <slot />
    </div>
  </BaseModal>
</template>

<style module lang="scss">
.el {
  padding: 36px;
  text-align: center;
}

.title {
  font-size: 1.5rem;
  font-weight: medium;
  margin-bottom: 12px;
  margin-top: 0;
  &.danger {
    color: var(--danger);
  }
}
</style>
