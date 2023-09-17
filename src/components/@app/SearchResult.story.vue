<script setup lang="ts">
import SearchResult from './SearchResult.vue';
</script>

<template>
  <Story>
    <Variant title="Default">
      <SearchResult
        :class="$style.result"
        image="https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg"
        name="YoRHa 2-gou B-gata" />
    </Variant>
    <Variant title="Checked">
      <SearchResult
        :class="$style.result"
        image="https://s4.anilist.co/file/anilistcdn/character/large/b132494-R05zeZPjDG3l.jpg"
        name="YoRHa 2-gou B-gata"
        checked />
    </Variant>
  </Story>
</template>

<style module lang="scss">
.result {
  width: 150px;
}
</style>
