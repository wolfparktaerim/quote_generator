<template>
    <!-- Main container with a subtle gradient background -->
    <div class="min-h-screen bg-slate-50">
        <!-- Hero Section with Carousel -->
        <section class="relative w-full mb-16">
            <Carousel />
        </section>

        <!-- Main Content Section -->
        <section class="relative -mt-16 z-10">
            <div class="container mx-auto px-4 md:px-6 lg:px-8">
                <!-- Quote Generator Section -->
                <div class="rounded-3xl overflow-hidden shadow-2xl">
                    <div class="bg-white">
                        <QuoteGenerator />
                    </div>
                </div>

                <!-- Features Section (Optional) -->
                <div class="mt-12 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('features.1') }}</h3>
                        <p class="text-slate-600">{{ $t('features.1-1') }}</p>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('features.2') }}</h3>
                        <p class="text-slate-600">{{ $t('features.2-1') }}</p>
                    </div>

                    <div class="bg-white p-8 rounded-2xl shadow-lg">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('features.3') }}</h3>
                        <p class="text-slate-600">{{ $t('features.3-1') }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer Section -->
        <Footer class="mt-auto" />
    </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue';
import Footer from "@/components/Footer.vue";
import QuoteGenerator from '@/components/QuoteGenerator.vue';


export default {
    name: "HomeView",

    components: {
        Carousel,
        QuoteGenerator,
        Footer,
    }
};
</script>

<style scoped>
html {
    scroll-behavior: smooth;
}

/* Optional: Add fade-in animation for features */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.grid>div {
    animation: fadeIn 0.6s ease-out forwards;
}

.grid>div:nth-child(2) {
    animation-delay: 0.2s;
}

.grid>div:nth-child(3) {
    animation-delay: 0.4s;
}
</style>