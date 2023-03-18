<script setup lang="ts">
defineProps<{
  /**
   * Links array.
   */
  dataSource: Array<{
    /** Caption text. */
    caption: string;
    /** Danger style. */
    danger?: boolean;
    /** Icon template name. */
    iconTemplate?: string;
    /** Click action. */
    onClick: EventListener;
  }>;
}>();
</script>

<template>
  <ul :class="$style.el">
    <li
      v-for="{ caption, onClick, danger, iconTemplate } in dataSource"
      :key="caption">
      <button
        :class="[$style.link, { [$style.isDanger]: danger }]"
        type="button"
        @click="onClick">
        <slot :name="iconTemplate" :size="18" :class="$style.icon" />
        <span :class="$style.caption">{{ caption }}</span>
      </button>
    </li>
  </ul>
</template>

<style module lang="scss">
.el {
  list-style: none;
  padding: 0;
  & > li {
    &:not(:last-child) {
      margin-bottom: 1;
    }
  }
}

.icon {
  color: var(--text-light);
  grid-area: icon;
  justify-self: center;
}

.caption {
  grid-area: caption;
  padding-right: 12px;
}

.link {
  $-height: 36px;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  column-gap: 3px;
  cursor: pointer;
  display: grid;
  grid-template-areas: 'icon caption';
  grid-template-columns: $-height 1fr;
  height: $-height;
  padding: 0;
  text-align: left;
  transition-duration: 200ms;
  transition-property: background-color, transform;
  width: 100%;

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    background-color: var(--hover-surface);
  }

  &.isDanger {
    color: var(--danger-text);

    &:hover {
      background-color: rgba(var(--danger-surface-rgb), 0.15);
    }

    .icon {
      color: currentColor;
    }
  }
}
</style>
