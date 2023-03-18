<script setup lang="ts">
import DraggingCharacter from '@/components/DraggingCharacter.vue';
import RemoveCharacterDropZone from '@/components/RemoveCharacterDropZone.vue';
import TheAppCharacters from '@/components/the-app/TheAppCharacters.vue';
import TheAppSearch from '@/components/the-app/TheAppSearch.vue';
import TheAppTiers from '@/components/the-app/TheAppTiers.vue';
</script>

<template>
  <div>
    <RemoveCharacterDropZone />
    <DraggingCharacter />
    <h1>Airing Season (Winter 2023)</h1>
    <p>
      This is a generated list of waifus based on the currently airing season.
      Share your rankings or use this list as basis for your own. You can also
      easily populate the list with waifus from previous seasons.
    </p>
    <TheAppSearch />
    <TheAppCharacters />
    <TheAppTiers />
  </div>
</template>
