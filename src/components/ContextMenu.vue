<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useFloating } from '@/composables/useFloating';
import { flip } from '@floating-ui/dom';
import { onClickOutside, useEventListener } from '@vueuse/core';
import { computed, nextTick, ref, toRef, type CSSProperties } from 'vue';

const props = defineProps<{
  /**
   * Reference element outside of the component.
   */
  outsideReferenceElement?: HTMLElement;
}>();

const visible = ref(false);
const { floatingRef, strategy, x, y, update } = useFloating({
  middleware: [flip()],
  placement: 'right-start',
  strategy: 'fixed',
});

const style = computed<CSSProperties>(() => {
  return {
    position: strategy.value,
    transform: `translate(${x.value}px, ${y.value}px)`,
  };
});

function hide() {
  visible.value = false;
}

async function show(event: Event) {
  visible.value = true;
  await nextTick();
  if (event instanceof MouseEvent) {
    const { clientX, clientY } = event;
    await update({
      getBoundingClientRect: () => {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          top: clientY,
          left: clientX,
          right: clientX,
          bottom: clientY,
        };
      },
    });
  }
}

const outsideReferenceElement = toRef(props, 'outsideReferenceElement');
useEventListener(outsideReferenceElement, 'contextmenu', async (event) => {
  event.preventDefault();
  await show(event);
});

onClickOutside(
  floatingRef,
  () => {
    if (visible.value) {
      hide();
    }
  },
  { capture: true }
);
</script>

<template>
  <slot :show="show" :hide="hide" />
  <Teleport to="body" :disabled="!visible">
    <div
      v-if="visible"
      ref="floatingRef"
      :class="$style.el"
      :style="style"
      v-bind="$attrs">
      <slot name="contextMenu" />
    </div>
  </Teleport>
</template>

<style module lang="scss">
.el {
  left: 0;
  top: 0;
}
</style>
