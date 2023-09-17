<script setup lang="ts">
import { logEvent } from 'histoire/client';
import BaseModal from './BaseModal.vue';
</script>

<template>
  <Story>
    <BaseModal
      visible
      @hidden="logEvent('hidden', $event)"
      @hide="logEvent('hide', $event)"
      @show="logEvent('show', $event)"
      @shown="logEvent('shown', $event)">
      <div :class="$style.el">
        Well known, famous actress, who is currently on hiatus. Because her life
        had always revolved around her work in entertainment, she remains
        isolated at school.
      </div>
    </BaseModal>
  </Story>
</template>

<style module lang="scss">
.el {
  padding: 36px;
}
</style>
