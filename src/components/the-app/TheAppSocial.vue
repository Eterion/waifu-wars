<script setup lang="ts">
import { useColorSchemeStore } from '@/stores/useColorScheme';
import { storeToRefs } from 'pinia';
import GithubIcon from '../icons/GithubIcon.vue';
import MoonIcon from '../icons/MoonIcon.vue';
import ShareIcon from '../icons/ShareIcon.vue';
import SunIcon from '../icons/SunIcon.vue';

const colorSchemeStore = useColorSchemeStore();
const { toggle: toggleColorScheme } = colorSchemeStore;
const { isDark } = storeToRefs(colorSchemeStore);

function share() {
  alert('Not yet implemented');
}
</script>

<template>
  <ul :class="$style.el">
    <li>
      <button :class="$style.item" type="button" @click="share">
        <ShareIcon :size="18" />
      </button>
    </li>
    <li>
      <a
        :class="$style.item"
        href="https://github.com/Eterion/waifu-wars"
        target="_blank">
        <GithubIcon :size="18" />
      </a>
    </li>
    <li>
      <button :class="$style.item" type="button" @click="toggleColorScheme()">
        <SunIcon v-if="isDark" :size="18" />
        <MoonIcon v-else :size="18" />
      </button>
    </li>
  </ul>
</template>

<style module lang="scss">
.el {
  align-items: center;
  display: flex;
  list-style: none;
  padding: 0;
}

.item {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  size: 46px;
  &:hover {
    color: var(--text);
  }
}
</style>
