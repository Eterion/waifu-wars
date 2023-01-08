<script setup lang="ts">
import { useFloating } from '@/composables/useFloating';
import {
  TIER_COLOR_KEYS,
  useTierStore,
  type TierColor,
} from '@/stores/useTier';
import type { Tier } from '@/types/Tier';
import { offset } from '@floating-ui/core';
import { flip } from '@floating-ui/dom';
import { onClickOutside, useElementBounding } from '@vueuse/core';
import { ary } from 'lodash';
import { computed, reactive, ref, watch, type CSSProperties } from 'vue';

const props = defineProps<{
  /**
   * Tier information.
   */
  info: Tier;
}>();

const emit = defineEmits<{
  (e: 'change', key: TierColor): void;
  (e: 'visible', visible: boolean): void;
}>();

const tierStore = useTierStore();
const colors = computed(() => {
  const tier = tierStore.findById(props.info.id);
  return TIER_COLOR_KEYS.map((key) => {
    return {
      key,
      isActive: tier?.color === key,
      changeColor: () => {
        if (tier) {
          tier.color = key;
          emit('change', key);
        } else throw 'UnknownTier';
      },
    };
  });
});

const isVisible = ref(false);
watch(isVisible, (isVisible) => {
  emit('visible', isVisible);
});

const { floatingRef, referenceRef, strategy, update, x, y } = useFloating({
  middleware: [offset({ mainAxis: 12 }), flip()],
  placement: 'top',
  strategy: 'fixed',
});

const floatingStyle = computed<CSSProperties>(() => {
  return {
    position: strategy.value,
    transform: `translate(${x.value}px, ${y.value}px)`,
  };
});

const element = computed(() => {
  if (referenceRef.value instanceof HTMLElement) return referenceRef.value;
  return undefined;
});

const elementBounding = reactive(useElementBounding(element));
watch(elementBounding, ary(update, 0), { deep: true });
onClickOutside(floatingRef, (event) => {
  if (event.target instanceof HTMLElement)
    if (!referenceRef.value?.contains(event.target)) {
      isVisible.value = false;
    }
});
</script>

<template>
  <button
    ref="referenceRef"
    type="button"
    title="Change Color"
    @click="isVisible = !isVisible">
    <Teleport to="body">
      <div
        v-if="isVisible"
        ref="floatingRef"
        :class="$style.dropdown"
        :style="floatingStyle">
        <ul :class="$style.grid">
          <li v-for="color in colors" :key="color.key">
            <button
              type="button"
              :class="[
                $style.button,
                color.key,
                { [$style.isActive]: color.isActive },
              ]"
              @click="color.changeColor" />
          </li>
        </ul>
      </div>
    </Teleport>
  </button>
</template>

<style module lang="scss">
.dropdown {
  background-color: var(--foreground);
  border-radius: 12px;
  box-shadow: 0 0 24px rgba(#000, 0.05);
  left: 0;
  padding: 24px;
  top: 0;
}

.grid {
  display: grid;
  gap: 12px;
  grid-auto-flow: column;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  list-style: none;
  padding: 0;
}

.button {
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  size: 24px;
  &.isActive {
    outline: 2px solid var(--primary);
  }
}
</style>
