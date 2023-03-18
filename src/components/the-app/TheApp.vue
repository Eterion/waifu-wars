<script setup lang="ts">
import DraggingCharacter from '../DraggingCharacter.vue';
import RemoveCharacterDropZone from '../RemoveCharacterDropZone.vue';
import TheAppCharacters from './TheAppCharacters.vue';
import TheAppHeader from './TheAppHeader.vue';
import TheAppSearch from './TheAppSearch.vue';
import TheAppTiers from './TheAppTiers.vue';
</script>

<template>
  <TheAppHeader />
  <RemoveCharacterDropZone v-if="false" />
  <DraggingCharacter v-if="false" />
  <div :class="$style.content">
    <main :class="$style.main">
      <TheAppSearch v-if="false" />
      <TheAppTiers v-if="false" />
      <TheAppCharacters v-if="false" />
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
  padding: 36px;
}
</style>
