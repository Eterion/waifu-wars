<script setup lang="ts">
import { kebabCase } from 'lodash-es';
import {
  computed,
  defineAsyncComponent,
  ref,
  type AsyncComponentLoader,
} from 'vue';

const searchQuery = ref('');
const size = ref(24);
const strokeWidth = ref(2);

const icons = Object.entries(
  import.meta.glob('@/components/@icons/**.vue', { import: 'default' }),
).map(([path, asyncLoader]: [string, AsyncComponentLoader]) => ({
  Component: defineAsyncComponent(asyncLoader),
  name: kebabCase(path.match(/\/([a-z]+)Icon\.vue$/i)?.[1]),
}));

const filteredIcons = computed(() => {
  return icons
    .filter(({ name }) => {
      return searchQuery.value
        ? new RegExp(searchQuery.value, 'i').test(name)
        : true;
    })
    .map(({ Component, name }) => ({
      Component,
      name,
      caption: searchQuery.value
        ? name.replace(searchQuery.value, `<mark>${searchQuery.value}</mark>`)
        : name,
    }));
});
</script>

<template>
  <Story group="top" icon="lucide:bookmark" icon-color="#748ffc">
    <template #controls>
      <HstText v-model="searchQuery" title="search" />
      <HstSlider v-model="size" :min="12" :max="64" title="size" />
      <HstSlider v-model="strokeWidth" :min="1" :max="4" title="strokeWidth" />
    </template>
    <div :class="$style.container">
      <div v-for="item in filteredIcons" :key="item.name">
        <div :class="$style.box">
          <Component
            :is="item.Component"
            :size="size"
            :stroke-width="strokeWidth" />
        </div>
        <div :class="$style.name" v-html="item.caption" />
      </div>
    </div>
  </Story>
</template>

<style module lang="scss">
.container {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}

.box {
  align-items: center;
  display: flex;
  height: 96px;
  justify-content: center;
}

.name {
  color: var(--text-light);
  font-size: 0.875rem;
  text-align: center;
}
</style>
