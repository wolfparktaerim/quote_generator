<template>
    <Carousel />
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">

        <QuoteGenerator />
    </div>
    <Footer />
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
/* Add any additional scoped styles if needed */
</style>