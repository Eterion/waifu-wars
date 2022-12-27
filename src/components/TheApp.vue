<script setup lang="ts">
import { useCharacterDragStore } from '@/stores/useCharacterDrag';
import { useEventListener, useMouse } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';
import BaseCharacter from './BaseCharacter.vue';
import TheAppCharacters from './TheAppCharacters.vue';
import TheAppHeader from './TheAppHeader.vue';
import TheAppSearch from './TheAppSearch.vue';
import TheAppSocial from './TheAppSocial.vue';
import TheAppTiers from './TheAppTiers.vue';

const characterDragStore = useCharacterDragStore();
const { dragging: draggingInfo } = storeToRefs(characterDragStore);
const mouse = reactive(useMouse());

const draggingCharacter = computed(() => {
  return draggingInfo.value?.character;
});

useEventListener('mouseup', (event) => {
  if (characterDragStore.drop()) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
});
</script>

<template>
  <div :class="$style.el">
    <Teleport to="body">
      <BaseCharacter
        v-if="draggingCharacter"
        :class="$style.draggingCharacter"
        :drag-event-origin="false"
        :info="draggingCharacter"
        card />
    </Teleport>
    <aside :class="$style.sidebar">
      <TheAppHeader />
      <TheAppSearch />
    </aside>
    <main :class="$style.main">
      <TheAppSocial />
      <TheAppCharacters />
      <TheAppTiers />
    </main>
  </div>
</template>

<style module lang="scss">
.el {
  display: grid;
  grid-template-columns: 480px 1fr;
}

.sidebar,
.main {
  padding: 64px;
}

.draggingCharacter {
  position: fixed 0;
  transform: translate(
    calc(v-bind('mouse.x') * 1px),
    calc(v-bind('mouse.y') * 1px)
  );
}
</style>
