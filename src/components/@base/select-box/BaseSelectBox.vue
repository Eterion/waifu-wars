<script setup lang="ts">
import ChevronDownIcon from '@/components/@icons/ChevronDownIcon.vue';
import XIcon from '@/components/@icons/XIcon.vue';
import { useField } from '@/composables/useField';
import { autoUpdate, offset, size, useFloating } from '@floating-ui/vue';
import {
  onClickOutside,
  useElementHover,
  useFocusWithin,
  useVModel,
} from '@vueuse/core';
import type { CSSProperties } from 'vue';
import { computed, ref, watch } from 'vue';

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

const { id } = useField();
const modelValue = useVModel(props, 'modelValue', emit);
const editorRef = ref<HTMLElement>();
const hovered = useElementHover(editorRef);
const { focused } = useFocusWithin(editorRef);

const options = computed(() => {
  return props.options.map(({ caption, value }) => ({
    caption,
    value,
    isSelected: modelValue.value === value,
    onClick: () => {
      isOpen.value = false;
      modelValue.value = value;
    },
  }));
});

const selectedCaption = computed(() => {
  return options.value.find(({ isSelected }) => {
    return isSelected;
  })?.caption;
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
      apply: ({ elements, rects, availableHeight }) => {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
          maxHeight: `${Math.min(240, availableHeight - 36)}px`,
        } satisfies CSSProperties);
      },
    }),
  ],
});

watch(isOpen, (isOpen) => {
  setTimeout(() => {
    if (isOpen && floatingRef.value) {
      floatingRef.value
        .querySelector("[aria-selected='true']")
        ?.scrollIntoView({
          block: 'center',
        });
    }
  });
});

// Dropdown clickout
onClickOutside(floatingRef, (event) => {
  if (event.target instanceof Element)
    if (!editorRef.value?.contains(event.target)) {
      isOpen.value = false;
    }
});

function onClear() {
  modelValue.value = undefined;
  if (document.activeElement instanceof HTMLElement)
    document.activeElement.blur();
}
</script>

<template>
  <div>
    <div
      ref="editorRef"
      :class="[
        $style.el,
        { [$style.hovered]: hovered, [$style.focused]: focused || isOpen },
      ]">
      <input
        :id="id"
        :value="modelValue"
        :class="$style.input"
        :tabindex="-1"
        type="text"
        @focus="isOpen = true" />
      <button
        :class="$style.selectedCaption"
        type="button"
        @click="isOpen = true">
        <span>
          {{ selectedCaption || '&nbsp;' }}
        </span>
      </button>
      <button
        v-if="modelValue"
        :class="$style.button"
        :tabindex="-1"
        type="button"
        @click="onClear">
        <XIcon :size="18" :stroke-width="1.5" />
      </button>
      <button
        v-else
        :class="$style.button"
        :tabindex="-1"
        type="button"
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
          <li
            v-for="option in options"
            :key="option.value"
            :aria-selected="option.isSelected">
            <button
              type="button"
              :class="[$style.option, { [$style.selected]: option.isSelected }]"
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
@use '@/css/scrollbar';

.input {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.selectedCaption {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: inherit;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  padding: 8px 12px;
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
  position: relative;
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
  @include scrollbar.thin;
  background-color: var(--foreground);
  border-radius: 6px;
  box-shadow: var(--medium-shadow);
  overflow-y: auto;
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
  line-height: 1.2;
  padding: 6px;
  text-align: left;
  width: 100%;
  &:not(.selected) {
    &:hover {
      background-color: var(--hover-surface);
      color: var(--primary);
    }
  }
  &.selected {
    background-color: var(--primary-surface);
    color: var(--text-on-primary-surface);
  }
}
</style>
