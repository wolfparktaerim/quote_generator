<template>
    <div class="container mx-auto px-4 py-8 max-w-7xl">
        <h1 class="text-3xl font-extrabold text-black mb-4">Generate a Random Inspirational Quote with a Random
            Background for Free!
        </h1>

        <!-- Large Screen Layout -->
        <div class="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:grid-rows-[auto_1fr] gap-6">
            <!-- Section 1 -->
            <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                <h2 class="text-xl font-extrabold text-black mb-4">Step 1: Choose Your Settings and Press 'Generate'
                </h2>
                <!-- Drop-down for Picture Orientation -->
                <label for="orientation" class="block text-gray-700 font-semibold mb-2">Orientation:</label>
                <select id="orientation" v-model="selectedOrientation"
                    class="p-3 rounded-lg text-gray-700 border border-gray-300 bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4">
                    <option value="horizontal">Landscape</option>
                    <option value="vertical">Portrait</option>
                </select>
                <button @click="generateQuoteAndImage"
                    class="bg-blue-600 text-white px-6 py-3 rounded-xl w-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Generate
                </button>
            </div>

            <!-- Section 2 -->
            <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center row-span-2 relative">
                <h2 class="text-xl font-extrabold text-black mb-4">Step 2: View Your Quote Image</h2>
                <div class="h-full flex items-center justify-center relative">

                    <div v-show="loading">
                        <div class="loader"></div>
                    </div>

                    <div v-show="!loading" class="content">
                        <!-- Preview container -->
                        <div class="preview-container">
                            <canvas ref="canvasRefLarge" style="max-width: 100%; height: auto;"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3 -->
            <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                <h2 class="text-xl font-extrabold text-black mb-4">Step 3: Press 'Download' to Get Your Image</h2>
                <button @click="downloadImage" :disabled="!imageGenerated" :class="{
                    'bg-green-600 hover:bg-green-700': imageGenerated,
                    'bg-gray-400 cursor-not-allowed': !imageGenerated
                }"
                    class="text-white px-6 py-3 rounded-xl w-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 mt-4">
                    Download
                </button>
            </div>
        </div>

        <!-- Mobile Screen Layout -->
        <div class="lg:hidden space-y-6">
            <!-- Section 1 -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-3xl font-extrabold text-black mb-4">Step 1: Choose Your Settings</h2>
                <label for="orientation-mobile" class="block text-gray-700 font-semibold mb-2">Orientation:</label>
                <select id="orientation-mobile" v-model="selectedOrientation"
                    class="p-3 rounded-lg text-gray-700 border border-gray-300 bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4">
                    <option value="horizontal">Landscape</option>
                    <option value="vertical">Portrait</option>
                </select>
                <button @click="generateQuoteAndImage"
                    class="bg-blue-600 text-white px-6 py-3 rounded-xl w-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Generate
                </button>
            </div>

            <!-- Section 2 -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-3xl font-extrabold text-black mb-4">Step 2: View Your Quote Image</h2>
                <div class="h-full flex items-center justify-center relative">

                    <div v-show="loading" class="loading-overlay">
                        <div class="loader"></div>
                    </div>

                    <div v-show="!loading" class="content">
                        <!-- Preview container -->
                        <div class="preview-container">
                            <canvas ref="canvasRefMobile" style="max-width: 100%; height: auto;"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3 -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-3xl font-extrabold text-black mb-4">Step 3: Press 'Download' to Get Your Image</h2>
                <button @click="downloadImage" :disabled="!imageGenerated" :class="{
                    'bg-green-600 hover:bg-green-700': imageGenerated,
                    'bg-gray-400 cursor-not-allowed': !imageGenerated
                }"
                    class="text-white px-6 py-3 rounded-xl w-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 mt-4">
                    Download
                </button>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import axios from 'axios';

const selectedOrientation = ref('horizontal');
const loading = ref(false);
let ratio = "landscape";
const quoteText = ref('');
const quoteAuthor = ref('');
const canvasRefLarge = ref(null);
const canvasRefMobile = ref(null);
const imageGenerated = ref(false); // To track if the image is generated

async function generateQuoteAndImage() {

    loading.value = true; // Start loading
    imageGenerated.value = false;

    if (selectedOrientation.value === 'horizontal') {
        ratio = "landscape";
    } else {
        ratio = "portrait";
    }

    try {
        // Fetch quote
        const quoteResponse = await axios.get(
            // enable for deployed website, disable for local host testing //
            // 'https://zenquotes.io/api/quotes'

            // disable for deployed website, enable for local host testing //  
            'https://api.allorigins.win/raw?url=https://zenquotes.io/api/quotes'
        );
        let random = Math.ceil(Math.random() * 50);
        const quoteData = quoteResponse.data[random];
        console.log('Quote Object Data:', quoteData);
        quoteText.value = quoteData.q;
        quoteAuthor.value = quoteData.a;

        // Fetch image
        const wallhavenUrl = `https://wallhaven.cc/api/v1/search?apikey=${import.meta.env.VITE_img_api}&q=id%3A37&categories=100&sorting=random&ratios=${ratio}&purity=100&page=1&seed=${Math.random()}`;
        const imageResponse = await axios.get(
            // enable for deployed website, disable for local host testing // 
            wallhavenUrl

            // disable for deployed website, enable for local host testing // 
            // `https://api.allorigins.win/raw?url=${encodeURIComponent(wallhavenUrl)}`
        )
        const imageData = imageResponse.data.data[0];
        if (!imageData || !imageData.path) {
            throw new Error("No image data received.");
        }

        let imageUrl = imageData.path;

        // disable for deployed website, enable for local host testing //
        // imageUrl = "https://static.vecteezy.com/system/resources/previews/040/890/255/non_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg";
        // imageUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;

        console.log("Image URL:", imageUrl);

        await createCompositeImage(imageUrl, quoteText.value, quoteAuthor.value, true);
        await createCompositeImage(imageUrl, quoteText.value, quoteAuthor.value, false);
        // Mark Image generated
        imageGenerated.value = true;
        // Finish loading
        loading.value = false;

    } catch (error) {
        console.error("Error generating quote or image:", error);
        loading.value = false;
    }

    async function createCompositeImage(imageUrl, quote, author, isMobile = false) {

        const canvas = isMobile ? canvasRefMobile.value : canvasRefLarge.value;
        const ctx = canvas.getContext('2d');

        // Create a new Image object
        const img = new Image();
        img.crossOrigin = "anonymous"; // Enable cross-origin image loading
        const maxWidth = 1280;  // Max width for resizing
        const maxHeight = 720;  // Max height for resizing

        // Wait for image to load
        await new Promise((resolve) => {
            img.onload = () => {
                // Calculate aspect ratio
                const aspectRatio = img.width / img.height;

                // Set the new width and height based on the max width and height
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    width = maxWidth;
                    height = width / aspectRatio;
                }
                if (height > maxHeight) {
                    height = maxHeight;
                    width = height * aspectRatio;
                }


                // Set canvas size to match resized image
                canvas.width = width;
                canvas.height = height;

                // Draw the resized image on the canvas
                ctx.drawImage(img, 0, 0, width, height);

                // Add a semi-transparent overlay for better text readability
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Configure text style
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';

                // Draw the quote with word wrapping
                const maxWidthText = canvas.width * 0.8; // 80% of canvas width
                const words = quote.split(' ');
                let lines = [];
                let currentLine = '';

                // Word wrap the quote
                ctx.font = `bold ${canvas.height * 0.04}px Arial`;
                words.forEach(word => {
                    const testLine = currentLine + word + ' ';
                    if (ctx.measureText(testLine).width > maxWidthText) {
                        lines.push(currentLine);
                        currentLine = word + ' ';
                    } else {
                        currentLine = testLine;
                    }
                });
                lines.push(currentLine);

                // Draw the quote lines
                const lineHeight = canvas.height * 0.05;
                const startY = (canvas.height - (lines.length * lineHeight)) / 2;
                lines.forEach((line, i) => {
                    ctx.fillText(line, canvas.width / 2, startY + (i * lineHeight));
                });

                // Draw the author
                ctx.font = `italic ${canvas.height * 0.03}px Arial`;
                ctx.fillText(`― ${author}`, canvas.width * 0.55, startY + (lines.length * lineHeight) + lineHeight);

                resolve();
            };
            img.src = imageUrl;
        });
    }

}

// Add the download image function here
function downloadImage() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const canvas = isMobile ? canvasRefMobile.value : canvasRefLarge.value;
    const imageUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'quote_image.png';
    link.click();
}
</script>

<style scoped>
/* Loading Spinner */
.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.preview-container {
    max-width: 800px;
    width: 100%;
    margin-bottom: 20px;
    min-height: 200px;
}
</style>