import { defineSetupVue3 } from '@histoire/plugin-vue';
import { createPinia } from 'pinia';
import StoryWrapper from './StoryWrapper.vue';
import './storyStyle.scss';

export const setupVue3 = defineSetupVue3(({ addWrapper, app }) => {
  // Adds wrapper to stories.
  // https://histoire.dev/guide/vue3/wrapper.html
  addWrapper(StoryWrapper);
  // Pinia instance.
  app.use(createPinia());
});
