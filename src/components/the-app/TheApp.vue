<script setup lang="ts">
import DraggingCharacter from '../DraggingCharacter.vue';
import RemoveCharacterDropZone from '../RemoveCharacterDropZone.vue';
import TheAppCharacters from './TheAppCharacters.vue';
import TheAppHeader from './TheAppHeader.vue';
import TheAppSearch from './TheAppSearch.vue';
import TheAppSocial from './TheAppSocial.vue';
import TheAppTiers from './TheAppTiers.vue';
</script>

<template>
  <RemoveCharacterDropZone />
  <DraggingCharacter />
  <aside :class="$style.sidebar">
    <TheAppSocial :class="$style.social" />
    <TheAppHeader />
    <TheAppSearch />
  </aside>
  <main :class="$style.main">
    <TheAppCharacters :class="$style.main_characters" />
    <TheAppTiers />
  </main>
</template>

<style module lang="scss">
.sidebar {
  background-color: var(--background);
  bottom: 0;
  display: grid;
  grid-template-rows: auto 1fr;
  left: 0;
  min-height: 0;
  padding: 64px;
  position: fixed;
  row-gap: 32px;
  top: 0;
  width: var(--sidebar-width);
}

.social {
  position: absolute;
  right: 48px;
  top: 24px;
}

.main {
  margin-left: var(--sidebar-width);
  min-height: 0;
  padding: 64px;

  &_characters {
    margin-bottom: 24px;
  }
}
</style>
