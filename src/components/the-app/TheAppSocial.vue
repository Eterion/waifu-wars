<script setup lang="ts">
import ColorSchemeToggle from '../@app/ColorScheme.vue';
import GithubIcon from '../@icons/GithubIcon.vue';
</script>

<template>
  <ul :class="$style.el">
    <li>
      <ColorSchemeToggle />
    </li>
    <li>
      <a
        :class="$style.icon"
        href="https://github.com/Eterion/waifu-wars"
        target="_blank"
        title="GitHub">
        <GithubIcon :size="18" />
      </a>
    </li>
  </ul>
</template>

<style module lang="scss">
.el {
  align-items: center;
  column-gap: 12px;
  display: flex;
  list-style: none;
  padding: 0;
}

.icon {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  size: 40px;

  &:hover {
    color: var(--text);
  }
}
</style>
