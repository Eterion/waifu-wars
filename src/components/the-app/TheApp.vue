<script setup lang="ts">
import TheAppHeader from './TheAppHeader.vue';
</script>

<template>
  <TheAppHeader />
  <div :class="$style.content">
    <main :class="$style.main">
      <RouterView />
    </main>
  </div>
</template>

<style module lang="scss">
.content {
  margin: false auto;
  margin-top: var(--app-header-height);
  max-width: var(--app-max-width);
}

.main {
  padding: 48px 36px 64px 36px;
}
</style>
