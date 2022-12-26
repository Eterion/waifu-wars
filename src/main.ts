import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './globalStyles.scss';

createApp(App).use(createPinia()).mount('#app');
