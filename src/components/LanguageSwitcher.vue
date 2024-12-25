<template>
    <div class="flex space-x-2">
        <select @change="onLanguageChange" :value="currentLanguage"
            class="px-3 py-1 rounded bg-white text-black border border-gray-300 hover:border-gray-400 transition">
            <option value="en" :disabled="currentLanguage === 'en'">English</option>
            <option value="zh" :disabled="currentLanguage === 'zh'">中文</option>
        </select>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { locale } = useI18n();
const currentLanguage = ref(locale.value); // Track current language

function onLanguageChange(event) {
    const lang = event.target.value;
    locale.value = lang;
    currentLanguage.value = lang; // Update the selected language
}
</script>