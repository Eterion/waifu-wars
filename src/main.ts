import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { MediaSeason } from './composables/useGraphQL';
import './globalStyles.scss';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
import NotFoundView from './views/NotFoundView.vue';
import AnimeView from './views/anime/AnimeView.vue';
import CharactersView from './views/characters/CharactersView.vue';

const SEASON_REGEXP = Object.values(MediaSeason).join('|');

createApp(App)
  .use(createPinia())
  .use(
    createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
        {
          path: '/',
          component: HomeView,
        },
        {
          path: '/about',
          component: AboutView,
        },
        {
          path: `/w/:season(${SEASON_REGEXP})?/:year(\\d+)`,
          component: CharactersView,
        },
        {
          path: '/w/top/:top(\\d+)',
          component: CharactersView,
        },
        {
          path: '/w',
          component: CharactersView,
        },
        {
          path: `/a/:season(${SEASON_REGEXP})?/:year(\\d+)`,
          component: AnimeView,
        },
        {
          path: '/a',
          component: AnimeView,
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: NotFoundView,
        },
      ],
    }),
  )
  .mount('#app');
