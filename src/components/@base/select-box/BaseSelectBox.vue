<script setup lang="ts">
import ChevronDownIcon from '@/components/@icons/ChevronDownIcon.vue';
import XIcon from '@/components/@icons/XIcon.vue';
import { autoUpdate, offset, size, useFloating } from '@floating-ui/vue';
import {
  onClickOutside,
  useElementHover,
  useFocusWithin,
  useVModel,
} from '@vueuse/core';
import { computed, ref } from 'vue';

const props = defineProps<{
  /** Array of options. */
  options: Array<{
    /** Caption text. */
    caption: string;
    /** Value. */
    value?: number | string;
  }>;
  /** Model value. */
  modelValue?: number | string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue?: number | string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emit);
const editorRef = ref<HTMLElement>();
const hovered = useElementHover(editorRef);
const { focused } = useFocusWithin(editorRef);

const options = computed(() => {
  return props.options.map(({ caption, value }) => ({
    caption,
    value,
    onClick: () => {
      modelValue.value = value;
    },
  }));
});

const isOpen = ref(false);
const floatingRef = ref<HTMLElement>();
const { floatingStyles } = useFloating(editorRef, floatingRef, {
  open: isOpen,
  placement: 'bottom-start',
  strategy: 'fixed',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(6),
    size({
      apply: ({ elements, rects }) => {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      },
    }),
  ],
});

// Dropdown clickout
onClickOutside(floatingRef, (event) => {
  if (event.target instanceof Element)
    if (!editorRef.value?.contains(event.target)) {
      isOpen.value = false;
    }
});
</script>

<template>
  <div>
    <div
      ref="editorRef"
      :class="[
        $style.el,
        { [$style.hovered]: hovered, [$style.focused]: focused },
      ]">
      <input
        :value="modelValue"
        :class="$style.input"
        type="text"
        @focus="isOpen = true" />
      <button
        v-if="modelValue"
        :class="$style.button"
        type="button"
        tabindex="-1"
        @click="modelValue = undefined">
        <XIcon :size="18" :stroke-width="1.5" />
      </button>
      <button
        v-else
        :class="$style.button"
        type="button"
        tabindex="-1"
        @click="isOpen = true">
        <ChevronDownIcon :size="18" :stroke-width="1.5" />
      </button>
    </div>
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="floatingRef"
        :class="$style.floating"
        :style="floatingStyles">
        <ul :class="$style.options">
          <li v-for="option in options" :key="option.value">
            <button
              type="button"
              :class="$style.option"
              @click="option.onClick">
              {{ option.caption }}
            </button>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<style module lang="scss">
.input {
  background-color: transparent;
  border: none;
  border-radius: inherit;
  color: inherit;
  flex-grow: 1;
  font-family: inherit;
  font-size: inherit;
  padding: 12px;
  width: 100%;
  &:focus {
    outline: none;
  }
}

.button {
  align-items: center;
  align-self: stretch;
  background-color: transparent;
  border: none;
  border-radius: inherit;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: false 12px;
}

.el {
  align-items: center;
  background-color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  &.hovered {
    border-color: var(--border-dark);
    .button {
      color: var(--text);
    }
  }
  &.focused {
    border-color: var(--primary);
    outline: 1px solid var(--primary);
  }
}

.floating {
  background-color: var(--foreground);
  border-radius: 6px;
  box-shadow: var(--medium-shadow);
}

.options {
  list-style: none;
  margin: 0;
  padding: 6px;
  & > li {
    &:not(:last-child) {
      margin-bottom: 1px;
    }
  }
}

.option {
  background-color: transparent;
  border: none;
  border-radius: 3px;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  padding: 6px;
  text-align: left;
  width: 100%;
  &:hover {
    background-color: var(--hover-surface);
    color: var(--primary);
  }
}
</style>
