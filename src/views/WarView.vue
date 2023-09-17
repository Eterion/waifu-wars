<script setup lang="ts">
import DraggingCharacter from '@/components/DraggingCharacter.vue';
import RemoveCharacterDropZone from '@/components/RemoveCharacterDropZone.vue';
import TheAppSearch from '@/views/war/TheAppSearch.vue';
import CharacterCollection from './war/CharacterCollection.vue';
import TiersView from './war/TiersView.vue';

defineProps<{
  /**
   * Load specific list from db.
   */
  id?: string;
  /**
   * Load characters from season (requires year).
   */
  season?: 'winter' | 'spring' | 'summer' | 'fall';
  /**
   * Load characters from year.
   */
  year?: number;
}>();
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
    <TheAppSearch v-if="false" />
    <CharacterCollection />
    <TiersView />
  </div>
</template>
