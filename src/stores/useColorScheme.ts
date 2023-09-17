import { useDark, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useColorSchemeStore = defineStore('colorScheme', () => {
  /**
   * Keeps track of dark state.
   */

  const isDark = useDark({ disableTransition: false });

  /**
   * Toggles dark scheme.
   */

  const toggle = useToggle(isDark);

  return {
    isDark,
    toggle,
  };
});
