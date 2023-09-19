<script setup lang="ts">
import { MediaSeason, useGetAnimeQuery } from '@/composables/useGraphQL';
import { createCharacterInfoFromGetAnime } from '@/utils/createCharacterInfo';
import { useVModel } from '@vueuse/core';
import { remove } from 'lodash-es';
import { computed, ref } from 'vue';
import BaseField from '../@base/field/BaseField.vue';
import BaseLoader from '../@base/loader/BaseLoader.vue';
import BaseSelectBox from '../@base/select-box/BaseSelectBox.vue';
import BaseTextBox from '../@base/text-box/BaseTextBox.vue';
import SearchResult from './SearchResult.vue';

const props = withDefaults(
  defineProps<{
    /** Checked ids. */
    modelValue?: number[];
  }>(),
  { modelValue: () => [] },
);

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: number[]): void;
}>();

const modelValue = useVModel(props, 'modelValue', emit);
const searchQuery = ref<string>();

const year = ref<number>();
const yearOptions: InstanceType<typeof BaseSelectBox>['options'] = Array.from({
  length: new Date().getFullYear() - 1940 + 1,
})
  .map((_, index) => 1940 + index)
  .reverse()
  .map((year) => ({
    caption: year.toString(),
    value: year,
  }));

const season = ref<MediaSeason>();
const seasonOptions: InstanceType<typeof BaseSelectBox>['options'] =
  Object.entries(MediaSeason).map(
    ([caption, value]: [string, MediaSeason]) => ({
      caption,
      value,
    }),
  );

const { loading, result } = useGetAnimeQuery(() => ({
  search: searchQuery.value,
  season: season.value,
  seasonYear: year.value,
}));

const searchResult = computed(() => {
  return createCharacterInfoFromGetAnime(result.value)
    .filter(
      ({ gender, imageUrl }) =>
        gender === 'Female' && !imageUrl.endsWith('/default.jpg'),
    )
    .map<{
      key: symbol;
      props: InstanceType<typeof SearchResult>['$props'];
      onClick: EventListener;
    }>((character) => {
      const isChecked = modelValue.value.includes(character.id);
      return {
        key: Symbol(character.fullName),
        props: {
          image: character.imageUrl,
          name: character.fullName,
          metadata: character,
          checked: isChecked,
        },
        onClick: () => {
          isChecked
            ? remove(modelValue.value, (id) => id === character.id)
            : modelValue.value.push(character.id);
        },
      };
    });
});
</script>

<template>
  <div>
    <div :class="$style.inputs">
      <BaseField label="Search" :class="$style.inputs_search">
        <BaseTextBox v-model="searchQuery" search />
      </BaseField>
      <BaseField label="Year" :class="$style.inputs_year">
        <BaseSelectBox v-model="year" :options="yearOptions" />
      </BaseField>
      <BaseField label="Season" :class="$style.inputs_season">
        <BaseSelectBox v-model="season" :options="seasonOptions" />
      </BaseField>
    </div>
    <BaseLoader v-if="loading" />
    <div v-else :class="$style.grid">
      <SearchResult
        v-for="item in searchResult"
        :key="item.key"
        v-bind="item.props"
        @click="item.onClick" />
    </div>
  </div>
</template>

<style module lang="scss">
.inputs {
  display: flex;
  gap: 24px;
  &:not(:last-child) {
    margin-bottom: 36px;
  }
  &_search {
    width: 260px;
  }
  &_year {
    width: 120px;
  }
  &_season {
    width: 180px;
  }
}

.grid {
  align-items: flex-start;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}
</style>
