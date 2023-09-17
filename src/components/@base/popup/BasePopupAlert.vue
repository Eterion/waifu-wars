<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import BaseButton from '../button/BaseButton.vue';
import BasePopup from './BasePopup.vue';

const props = withDefaults(
  defineProps<{
    /** Close button text. */
    close?: string;
    /** Danger style. */
    danger?: boolean;
    /** Message text. */
    message: string;
    /** Title text. */
    title?: string;
    /** Controls visibility. */
    visible?: boolean;
  }>(),
  {
    close: 'Close',
    title: undefined,
  },
);

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'hidden'): void;
  (e: 'hide'): void;
  (e: 'show'): void;
  (e: 'shown'): void;
  (e: 'update:visible', visilbe: boolean): void;
}>();

const visible = useVModel(props, 'visible', emit);
</script>

<template>
  <BasePopup
    v-model:visible="visible"
    :danger="danger"
    :title="title"
    :width="560"
    @hidden="$emit('hidden')"
    @hide="$emit('hide')"
    @show="$emit('show')"
    @shown="$emit('shown')">
    <div :class="$style.content">
      <p :class="$style.message">{{ message }}</p>
    </div>
    <div :class="$style.buttons">
      <BaseButton @click="$emit('close')">
        {{ close }}
      </BaseButton>
    </div>
  </BasePopup>
</template>

<style module lang="scss">
.content {
  margin-bottom: 24px;
}

.message {
  margin: 0;
}

.buttons {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>
