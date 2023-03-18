<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import BaseButton from '../base-button/BaseButton.vue';
import ButtonGroup from '../ButtonGroup.vue';
import BasePopup from './BasePopup.vue';

const props = withDefaults(
  defineProps<{
    /**
     * Cancel button text.
     */
    cancel?: string;
    /**
     * Confirm button text.
     */
    confirm?: string;
    /**
     * Message text.
     */
    message: string;
    /**
     * Title text.
     */
    title?: string;
    /**
     * Controls visibility.
     */
    visible?: boolean;
  }>(),
  {
    cancel: 'Cancel',
    confirm: 'Confirm',
    title: undefined,
  }
);

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm'): void;
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
    :title="title"
    :width="400"
    @hidden="$emit('hidden')"
    @hide="$emit('hide')"
    @show="$emit('show')"
    @shown="$emit('shown')">
    <div :class="$style.content">
      <p>{{ message }}</p>
    </div>
    <ButtonGroup :class="$style.buttons">
      <BaseButton @click="$emit('confirm')">
        {{ confirm }}
      </BaseButton>
      <BaseButton @click="$emit('cancel')">
        {{ cancel }}
      </BaseButton>
    </ButtonGroup>
  </BasePopup>
</template>

<style module lang="scss">
.content {
  margin-bottom: 1.5rem;
  text-align: center;
}

.buttons {
  justify-content: center;
}
</style>
