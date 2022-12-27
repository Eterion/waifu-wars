<script setup lang="ts">
import { useCharacterDragStore } from '@/stores/useCharacterDrag';
import { useEventListener, useMouse } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
import BaseCharacter from './BaseCharacter.vue';
import TheAppCharacters from './TheAppCharacters.vue';
import TheAppHeader from './TheAppHeader.vue';
import TheAppSearch from './TheAppSearch.vue';
import TheAppSocial from './TheAppSocial.vue';
import TheAppTiers from './TheAppTiers.vue';

const characterDragStore = useCharacterDragStore();
const { dragging: draggingCharacter } = storeToRefs(characterDragStore);
const mouse = reactive(useMouse());
useEventListener('mouseup', (event) => {
  const info = characterDragStore.drop();
  if (info) {
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
        card
        :info="draggingCharacter"
        :class="$style.draggingCharacter" />
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
