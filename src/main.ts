import { createPinia } from 'pinia';
import { createApp } from 'vue';
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router';
import App from './App.vue';
import './globalStyles.scss';
import { resolveRouteParams } from './utils/resolveRouteParams';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
import NotFoundView from './views/NotFoundView.vue';
import WarView from './views/WarView.vue';

function resolveProps(
  params: Record<string, StringConstructor | NumberConstructor>
) {
  return (route: RouteLocationNormalized) => {
    return resolveRouteParams(route.params, params);
  };
}

const router = createRouter({
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
      path: '/w/:season(winter|spring|summer|fall)?/:year(\\d+)',
      props: resolveProps({ season: String, year: Number }),
      component: WarView,
    },
    {
      path: '/w/:id?',
      props: resolveProps({ id: String }),
      component: WarView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
});

createApp(App).use(createPinia()).use(router).mount('#app');
