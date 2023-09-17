<script setup lang="ts">
import BaseButton from '@/components/@base/button/BaseButton.vue';
import XIcon from '@/components/@icons/XIcon.vue';
import BaseModal from '@/components/base-modal/BaseModal.vue';
import { TIER_COLOR_KEYS, useTiersStore } from '@/stores/useTiers';
import type { Tier } from '@/types/Tier';
import { confirm } from '@/utils/confirm';
import { useVModel } from '@vueuse/core';
import { computed, useCssModule } from 'vue';

const props = defineProps<{
  /**
   * Tier info.
   */
  info: Tier;
  /**
   * Controls visibility.
   */
  visible?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void;
}>();

const $style = useCssModule();
const visible = useVModel(props, 'visible', emit);
const tiersStore = useTiersStore();
const tier = computed(() => tiersStore.findById(props.info.id));

const caption = computed({
  get: () => props.info.caption,
  set: (caption) => {
    if (tier.value) tier.value.caption = caption;
    else throw 'UnknownTier';
  },
});

const colors = computed(() => {
  return TIER_COLOR_KEYS.map((key) => {
    const isActive = tier.value?.color === key;
    return {
      key,
      isActive,
      css: [$style[key], { [$style.isActive]: isActive }],
      changeColor: () => {
        if (tier.value) tier.value.color = key;
        else throw 'UnknownTier';
      },
    };
  });
});

async function removeTier() {
  if (await confirm('Really remove tier?', { danger: true })) {
    visible.value = false;
    tiersStore.removeTier(props.info.id);
  }
}
</script>

<template>
  <BaseModal v-model:visible="visible">
    <button :class="$style.close" type="button" @click="visible = false">
      <XIcon />
    </button>
    <div :class="$style.el">
      <div>
        <label>
          <div>Name</div>
          <input v-model="caption" type="text" />
        </label>
      </div>
      <div>
        Color
        <ul :class="$style.colorGrid">
          <li v-for="color in colors" :key="color.key">
            <button
              :class="[$style.colorButton, color.css]"
              type="button"
              @click="color.changeColor" />
          </li>
        </ul>
      </div>
      <BaseButton danger @click="removeTier">Remove Tier</BaseButton>
      <div>Stored</div>
      <pre>{{ info.characterIds }}</pre>
    </div>
  </BaseModal>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;
@use 'sass:map';

.el {
  padding: 36px;
  width: 460px;
}

.close {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: 12px;
  size: 46px;
  top: 12px;
  &:hover {
    color: var(--text);
  }
}

.colorGrid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, 24px);
  list-style: none;
  padding: 0;
}

.colorButton {
  border: none;
  border-radius: 50%;
  cursor: pointer;
  size: 24px;
  &.isActive {
    outline: 2px solid var(--primary-surface);
  }
}

@each $-key in map.values($oc-color-list) {
  .#{$-key} {
    background-color: var(--tier-#{$-key});
  }
}
</style>
