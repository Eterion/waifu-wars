<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useFloating } from '@/composables/useFloating';
import { flip, offset, shift, type Placement } from '@floating-ui/dom';
import { useElementHover } from '@vueuse/core';
import {
  computed,
  reactive,
  toRef,
  watch,
  watchEffect,
  type CSSProperties,
} from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * Default placement, see {@link Placement}.
     */
    placement?: Placement;
    /**
     * Reference element oustide of the component.
     */
    outsideReferenceElement?: HTMLElement;
    /**
     * Content value.
     */
    value?: string;
  }>(),
  {
    placement: 'bottom',
    outsideReferenceElement: undefined,
    value: undefined,
  }
);

const { floatingRef, referenceRef, strategy, update, x, y } = useFloating(
  reactive({
    middleware: [flip(), shift({ padding: 5 }), offset({ mainAxis: 5 })],
    placement: toRef(props, 'placement'),
    strategy: 'fixed' as const,
  })
);

watchEffect(() => {
  if (props.outsideReferenceElement) {
    referenceRef.value = props.outsideReferenceElement;
  }
});

const style = computed<CSSProperties>(() => {
  return {
    position: strategy.value,
    transform: `translate(${x.value}px, ${y.value}px)`,
  };
});

const hovered = useElementHover(referenceRef);
watch(toRef(props, 'value'), () => {
  update();
});
</script>

<template>
  <slot :reference-ref="(el: any) => void (referenceRef = el)" />
  <Teleport to="body" :disabled="!hovered">
    <div
      v-if="hovered"
      ref="floatingRef"
      :class="$style.el"
      :style="style"
      v-bind="$attrs">
      <slot name="value" :value="value">
        {{ value }}
      </slot>
    </div>
  </Teleport>
</template>

<style lang="scss" module>
.el {
  background-color: var(--foreground);
  border-radius: 6px;
  color: var(--text-light);
  font-size: 0.8125rem;
  left: 0;
  padding: 6px 12px;
  top: 0;
}
</style>
