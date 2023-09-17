<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import BaseBackdrop from '../backdrop/BaseBackdrop.vue';

const props = defineProps<{
  /** Controls visibility. */
  visible?: boolean;
}>();

const emit = defineEmits<{
  (e: 'hidden'): void;
  (e: 'hide'): void;
  (e: 'show'): void;
  (e: 'shown'): void;
  (e: 'update:visible', visilbe: boolean): void;
}>();

defineOptions({
  inheritAttrs: false,
});

const visible = useVModel(props, 'visible', emit);
function hide() {
  visible.value = false;
}
</script>

<template>
  <Teleport to="body">
    <Transition
      :enter-from-class="$style.vHidden"
      :leave-to-class="$style.vHidden"
      :enter-active-class="$style.vActive"
      :leave-active-class="$style.vActive"
      @before-enter="$emit('show')"
      @after-enter="$emit('shown')"
      @before-leave="$emit('hide')"
      @after-leave="$emit('hidden')">
      <div v-if="visible" :class="$style.el">
        <BaseBackdrop :class="$style.backdrop" />
        <div :class="$style.overflow">
          <div :class="$style.placement">
            <div v-bind="$attrs" :class="$style.modal">
              <slot :hide="hide" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style module lang="scss">
$-gap: 1.5rem;
$-grid-gap: minmax($-gap, 1fr);

.el {
  position: fixed 0;
}

.backdrop {
  z-index: -1;
}

.overflow {
  overflow-y: auto;
  position: relative;
  size: 100%;
  z-index: 0;
}

.placement {
  display: grid;
  grid-template-areas: '. before .' '. modal .' '. after .';
  grid-template-columns: $-grid-gap auto $-grid-gap;
  grid-template-rows: $-grid-gap auto $-grid-gap;
  min-height: 100%;
  min-width: 100%;

  &::before,
  &::after {
    content: '';
    display: block;
    min-height: $-gap;
    pointer-events: none;
  }

  @each $-pseudo in 'before', 'after' {
    &::#{$-pseudo} {
      grid-area: #{$-pseudo};
    }
  }
}

.modal {
  background-color: var(--foreground);
  border-radius: 24px;
  box-shadow: var(--high-shadow);
  grid-area: modal;
  min-height: 0;
  min-width: 0;
  position: relative;
  size: 100%;
  & > * {
    max-width: 100%;
  }
}

.vHidden {
  .backdrop {
    opacity: 0;
  }
  .modal {
    opacity: 0;
    transform: scale(0.9);
  }
}

.vActive {
  transition-duration: 200ms;
  .backdrop {
    transition-duration: 200ms;
    transition-property: opacity;
  }
  .modal {
    transition-duration: 150ms;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.54, 1.5, 0.38, 1.11);
  }
}
</style>
