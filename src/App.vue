<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100">
    <div class="bg-gray-900 text-white py-1">
      <LanguageSwitcher />
    </div>


    <main>
      <router-view />
    </main>

  </div>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router';

import LanguageSwitcher from './components/LanguageSwitcher.vue';


export default {
  components: {
    LanguageSwitcher,

  },
};
</script>

<style>
/* Add global styles here if needed */
</style>
