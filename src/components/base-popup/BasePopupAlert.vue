<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import BaseButton from '../base-button/BaseButton.vue';
import ButtonGroup from '../ButtonGroup.vue';
import BasePopup from './BasePopup.vue';

const props = withDefaults(
  defineProps<{
    /**
     * Message text.
     */
    message: string;
    /**
     * Danger style.
     */
    danger?: boolean;
    /**
     * Ok button text.
     */
    ok?: string;
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
    ok: 'Ok',
    title: undefined,
  }
);

const emit = defineEmits<{
  (e: 'hidden'): void;
  (e: 'hide'): void;
  (e: 'ok'): void;
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
    :width="400"
    @hidden="$emit('hidden')"
    @hide="$emit('hide')"
    @show="$emit('show')"
    @shown="$emit('shown')">
    <div :class="$style.content">
      <p>{{ message }}</p>
    </div>
    <ButtonGroup :class="$style.buttons">
      <BaseButton :danger="danger" @click="$emit('ok')">
        {{ ok }}
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
