import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { MediaSeason } from './composables/useGraphQL';
import './globalStyles.scss';
import { resolveRouteParams } from './utils/resolveRouteParams';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
import NotFoundView from './views/NotFoundView.vue';
import AnimeView from './views/anime/AnimeView.vue';
import CharactersView from './views/characters/CharactersView.vue';

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
          path: `/w/:season(${Object.values(MediaSeason).join(
            '|',
          )})?/:year(\\d+)`,
          component: CharactersView,
          props: ({ params }) => {
            return resolveRouteParams(params, {
              season: String,
              year: Number,
            });
          },
        },
        {
          path: '/w/top/:top(\\d+)',
          component: CharactersView,
          props: ({ params }) => {
            return resolveRouteParams(params, {
              top: Number,
            });
          },
        },
        {
          path: '/w',
          component: CharactersView,
        },
        {
          path: `/a/:season(${Object.values(MediaSeason).join(
            '|',
          )})?/:year(\\d+)`,
          component: AnimeView,
          props: ({ params }) => {
            return resolveRouteParams(params, {
              season: String,
              year: Number,
            });
          },
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
