<script setup lang="ts">
import { logEvent } from 'histoire/client';
import BasePopup from './BasePopup.vue';
import BasePopupAlert from './BasePopupAlert.vue';
import BasePopupConfirm from './BasePopupConfirm.vue';

const message =
  'Well known, famous actress, who is currently on hiatus. Because her life had always revolved around her work in entertainment, she remains isolated at school.';
</script>

<template>
  <Story>
    <Variant title="Default">
      <BasePopup
        visible
        title="Popup Message"
        @hidden="logEvent('hidden', $event)"
        @hide="logEvent('hide', $event)"
        @show="logEvent('show', $event)"
        @shown="logEvent('shown', $event)"
        @update:visible="logEvent('update:visible', $event)">
        <p :class="$style.message">{{ message }}</p>
      </BasePopup>
    </Variant>
    <Variant title="Alert">
      <BasePopupAlert
        visible
        title="Alert Message"
        :message="message"
        @close="logEvent('close', $event)"
        @hidden="logEvent('hidden', $event)"
        @hide="logEvent('hide', $event)"
        @show="logEvent('show', $event)"
        @shown="logEvent('shown', $event)"
        @update:visible="logEvent('update:visible', $event)" />
    </Variant>
    <Variant title="Confirm">
      <BasePopupConfirm
        visible
        title="Confirm Message"
        :message="message"
        @cancel="logEvent('cancel', $event)"
        @confirm="logEvent('confirm', $event)"
        @hidden="logEvent('hidden', $event)"
        @hide="logEvent('hide', $event)"
        @show="logEvent('show', $event)"
        @shown="logEvent('shown', $event)"
        @update:visible="logEvent('update:visible', $event)" />
    </Variant>
  </Story>
</template>

<style module lang="scss">
.message {
  margin: 0;
}
</style>
