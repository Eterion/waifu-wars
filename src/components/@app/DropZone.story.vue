<script setup lang="ts">
import { apolloClient } from '@/apolloClient';
import { useGetCharactersQuery } from '@/composables/useGraphQL';
import { createCharacterInfoFromGetCharacters } from '@/utils/createCharacterInfo';
import { provideApolloClient } from '@vue/apollo-composable';
import { ref } from 'vue';
import BaseLoader from '../@base/loader/BaseLoader.vue';
import DropZone from './DropZone.vue';

type ModelValue = InstanceType<typeof DropZone>['modelValue'];
const dropZone1 = ref<ModelValue>([]);
const dropZone2 = ref<ModelValue>([]);

provideApolloClient(apolloClient);
const { loading, onResult } = useGetCharactersQuery();
onResult(({ data }) => {
  dropZone1.value = createCharacterInfoFromGetCharacters(data)
    .filter(
      ({ gender, imageUrl }) =>
        gender === 'Female' && !imageUrl.endsWith('/default.jpg'),
    )
    .slice(0, 20)
    .map((character) => ({
      image: character.imageUrl,
      name: character.fullName,
      metadata: character,
    }));
});
</script>

<template>
  <Story>
    <BaseLoader v-if="loading" />
    <template v-else>
      <DropZone :model-value="dropZone1" :class="$style.dropZone" />
      <DropZone :model-value="dropZone2" :class="$style.dropZone" />
    </template>
  </Story>
</template>

<style module lang="scss">
.dropZone {
  background-color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 12px;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
}
</style>
