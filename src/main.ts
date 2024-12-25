import './assets/main.css';

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import en from './locales/en.json';
import zh from './locales/zh.json';

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

app.mount('#app')
