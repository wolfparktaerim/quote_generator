<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
            <h1 class="text-5xl font-bold text-gray-800">404</h1>
            <h2 class="mt-4 text-3xl font-semibold text-gray-600">{{ $t('notFound.h1') }}</h2>
            <p class="mt-4 text-gray-500">
                {{ $t('notFound.p') }}
            </p>
            <router-link to="/"
                class="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {{ $t('notFound.goBack') }}
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Optional: Log 404 errors or handle analytics
onMounted(() => {
    console.warn(`404 Error: Page ${router.currentRoute.value.fullPath} not found`)
})
</script>