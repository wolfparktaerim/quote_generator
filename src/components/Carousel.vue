<template>
    <div class="relative w-full flex flex-col md:flex-row h-auto md:h-96">


        <!-- Fixed Box Section -->
        <div
            class="w-full md:w-1/3 bg-gradient-to-r from-gray-900 to-black p-6 shadow-lg text-white font-serif flex items-center justify-center h-40 md:h-full">
            <div>
                <h1 class="text-3xl md:text-4xl font-extrabold text-center md:text-left">{{ $t('title') }}</h1>
                <p class="text-sm mt-2 text-center md:text-right">
                    by <span class="text-yellow-400">{{ $t('author') }}</span>
                </p>
            </div>
        </div>


        <!-- Carousel Section -->
        <div class="w-full md:w-2/3 relative overflow-hidden h-60 md:h-full">
            <!-- Images -->
            <div class="flex h-full transition-transform duration-500 ease-out"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div v-for="image in images" :key="image.id" class="w-full h-full flex-shrink-0">
                    <img :src="image.url" :alt="image.alt" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- Navigation Arrows -->
            <button @click="prev"
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75">
                ←
            </button>
            <button @click="next"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75">
                →
            </button>
        </div>


    </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const images = [
    {
        "url": "/samples_en/img (1).png",
        "alt": "Image 1"
    },
    {
        "url": "/samples_en/img (2).png",
        "alt": "Image 2"
    },
    {
        "url": "/samples_en/img (3).png",
        "alt": "Image 3"
    },
    {
        "url": "/samples_en/img (4).png",
        "alt": "Image 4"
    },
    {
        "url": "/samples_en/img (5).png",
        "alt": "Image 5"
    },
    {
        "url": "/samples_en/img (6).png",
        "alt": "Image 6"
    },
    {
        "url": "/samples_en/img (7).png",
        "alt": "Image 7"
    },
    {
        "url": "/samples_en/img (8).png",
        "alt": "Image 8"
    },
    {
        "url": "/samples_en/img (9).png",
        "alt": "Image 9"
    },
    {
        "url": "/samples_en/img (10).png",
        "alt": "Image 10"
    },
    {
        "url": "/samples_en/quote_image (5).png",
        "alt": "quote_image (5)"
    },
    {
        "url": "/samples_en/quote_image (7).png",
        "alt": "quote_image (7)"
    },
    {
        "url": "/samples_en/quote_image (19).png",
        "alt": "quote_image (19)"
    },
    {
        "url": "/samples_en/quote_image (13).png",
        "alt": "quote_image 13"
    },
    {
        "url": "/samples_en/quote_image (16).png",
        "alt": "quote_image 16"
    }
];
const currentIndex = ref(0)

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length
}

const prev = () => {
    currentIndex.value = currentIndex.value === 0
        ? images.length - 1
        : currentIndex.value - 1
}

// Auto advance slides every 5 seconds
let interval
onMounted(() => {
    interval = setInterval(next, 6000)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<style scoped>
/* Ensure responsiveness for smaller screens */
@media (max-width: 768px) {
    .fixed-box {
        width: 40%;
        /* Reduce width on smaller screens */
    }

    .text-3xl {
        font-size: 1.5rem;
        /* Adjust text size for smaller screens */
    }

    .text-sm {
        font-size: 0.75rem;
        /* Adjust text size for smaller screens */
    }
}
</style>