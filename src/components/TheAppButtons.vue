<script setup lang="ts">
import { useColorSchemeStore } from '@/stores/useColorScheme';
import { storeToRefs } from 'pinia';
import GithubIcon from './icons/GithubIcon.vue';
import MoonIcon from './icons/MoonIcon.vue';
import ShareIcon from './icons/ShareIcon.vue';
import SunIcon from './icons/SunIcon.vue';

const colorSchemeStore = useColorSchemeStore();
const { toggle } = colorSchemeStore;
const { isDark } = storeToRefs(colorSchemeStore);
</script>

<template>
  <ul>
    <li>
      <button type="button">
        <ShareIcon />
      </button>
    </li>
    <li>
      <a href="https://github.com/Eterion/waifu-wars" target="_blank">
        <GithubIcon />
      </a>
    </li>
    <li>
      <button type="button" @click="toggle()">
        <SunIcon v-if="isDark" />
        <MoonIcon v-else />
      </button>
    </li>
  </ul>
</template>
