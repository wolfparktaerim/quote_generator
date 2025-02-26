import './output.css';

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import en from './locales/en.json';
import zh from './locales/zh.json';
import { toast } from 'vue3-toastify';

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.log("Service Worker failed", err));
}

// Set up i18n
const i18n = createI18n({
    locale: 'en', // Default language
    fallbackLocale: 'en',
    messages: {
      en,
      zh
    }
  });


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Toast);

app.mount('#app')
