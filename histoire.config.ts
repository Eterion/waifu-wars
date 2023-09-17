import { HstVue } from '@histoire/plugin-vue';
import { defineConfig } from 'histoire';

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'src/storySetup.ts',
  tree: {
    groups: [
      {
        title: 'Components',
        include: (file) => /^src\/components\/@base/.test(file.path),
      },
      {
        title: 'Utils',
        include: (file) => /^src\/utils/.test(file.path),
      },
    ],
  },
});
