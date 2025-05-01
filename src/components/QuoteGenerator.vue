<template>
  <div class="min-h-screen bg-slate-50 py-12">
    <div class="container mx-auto px-6 max-w-7xl">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-slate-800 mb-12 text-center">
        {{ $t('slogan') }}
      </h1>

      <!-- Large Screen Layout -->
      <div class="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:grid-rows-[auto_1fr] gap-6">

        <!-- Section 1: Controls -->
        <div class="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 class="text-xl font-bold text-slate-700 mb-8">
            {{ $t('instructions.1') }}
          </h2>

          <!-- Orientation Selection -->
          <div class="mb-8">
            <label class="block text-sm font-medium text-slate-600 mb-2">
              {{ $t('orientation') }}
            </label>
            <select v-model="selectedOrientation"
              class="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 focus:outline-none">
              <option value="horizontal">{{ $t('landscape') }}</option>
              <option value="vertical">{{ $t('portrait') }}</option>
            </select>
          </div>

          <!-- Quote Type Selection -->
          <div class="mb-8">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="userOwnQuote"
                class="w-5 h-5 rounded border-slate-300 text-slate-600 focus:ring-slate-400">
              <span class="ml-3 text-sm font-medium text-slate-600">
                {{ $t('useYourOwnQuote') }}
              </span>
            </label>
          </div>

          <!-- Custom Quote Inputs -->
          <div v-if="userOwnQuote" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2">
                {{ $t('yourQuote') }}
              </label>
              <input v-model="userQuoteInput" type="text"
                class="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 focus:outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2">
                {{ $t('authorName') }}
              </label>
              <input v-model="authorNameInput" type="text"
                class="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 focus:outline-none">
            </div>
          </div>

          <!-- Generate Button -->
          <button @click="generateQuoteAndImage"
            class="w-full h-12 mt-8 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            {{ $t('generate') }}
          </button>
        </div>

        <!-- Section 2: Preview -->
        <div class="bg-white rounded-2xl border border-slate-200 p-8 row-span-2">
          <h2 class="text-xl font-bold text-slate-700 mb-8">
            {{ $t('instructions.2') }}
          </h2>
          <div class="relative h-[calc(100%-4rem)] flex items-center justify-center">
            <!-- Loading State -->
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/80">
              <div class="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin">
              </div>
            </div>

            <!-- Preview Content -->
            <div v-show="!loading" class="w-full h-full flex items-center justify-center">
              <div class="preview-container w-full h-full flex items-center justify-center bg-slate-50 rounded-lg">
                <canvas ref="canvasRefLarge" style="max-width: 100%; max-height: 100%; object-fit: contain;"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Download -->
        <div class="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 class="text-xl font-bold text-slate-700 mb-8">
            {{ $t('instructions.3') }}
          </h2>
          <button @click="downloadImage" :disabled="!imageGenerated" :class="{
            'bg-green-600 hover:bg-green-700': imageGenerated,
            'bg-slate-200 cursor-not-allowed': !imageGenerated
          }"
            class="w-full h-12 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
            {{ $t('download') }}
          </button>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="lg:hidden space-y-6">
        <!-- Mobile sections mirror the desktop styling -->
        <!-- Section 1 -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 class="text-xl font-bold text-slate-700 mb-8">
            {{ $t('instructions.1') }}
          </h2>

          <!-- Orientation Selection -->
          <div class="mb-8">
            <label class="block text-sm font-medium text-slate-600 mb-2">
              {{ $t('orientation') }}
            </label>
            <select v-model="selectedOrientation"
              class="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 focus:outline-none">
              <option value="horizontal">{{ $t('landscape') }}</option>
              <option value="vertical">{{ $t('portrait') }}</option>
            </select>
          </div>

          <!-- Quote Type Selection -->
          <div class="mb-8">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="userOwnQuote"
                class="w-5 h-5 rounded border-slate-300 text-slate-600 focus:ring-slate-400">
              <span class="ml-3 text-sm font-medium text-slate-600">
                {{ $t('useYourOwnQuote') }}
              </span>
            </label>
          </div>

          <!-- Custom Quote Inputs -->
          <div v-if="userOwnQuote" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2">
                {{ $t('yourQuote') }}
              </label>
              <input v-model="userQuoteInput" type="text"
                class="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 focus:outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-2">
                {{ $t('authorName') }}
              </label>
              <input v-model="authorNameInput" type="text"
                class="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 focus:outline-none">
            </div>
          </div>

          <!-- Generate Button -->
          <button @click="generateQuoteAndImage"
            class="w-full h-12 mt-8 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            {{ $t('generate') }}
          </button>
        </div>

        <!-- Section 2 -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 class="text-xl font-bold text-slate-700 mb-6">
            {{ $t('instructions.2') }}
          </h2>
          <div class="relative h-64 flex items-center justify-center">
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/80">
              <div class="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin">
              </div>
            </div>
            <div v-show="!loading" class="w-full h-full flex items-center justify-center">
              <div class="preview-container w-full h-full flex items-center justify-center bg-slate-50 rounded-lg">
                <canvas ref="canvasRefMobile" style="max-width: 100%; max-height: 100%; object-fit: contain;"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3 -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 class="text-xl font-bold text-slate-700 mb-6">
            {{ $t('instructions.3') }}
          </h2>
          <button @click="downloadImage" :disabled="!imageGenerated" :class="{
            'bg-green-600 hover:bg-green-700': imageGenerated,
            'bg-slate-200 cursor-not-allowed': !imageGenerated
          }"
            class="w-full h-12 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
            {{ $t('download') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'isomorphic-fetch';
import { ref, computed, onMounted, nextTick } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import OpenAI from "openai";
import { useToast } from 'vue-toastification';
import { createClient } from 'pexels';

// use pexel api
const client = createClient(import.meta.env.VITE_img_api2);

const { t } = useI18n();

const toast = useToast();

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_gpt_api,
  dangerouslyAllowBrowser: true,
  fetch: window.fetch.bind(window) // Use browser's native fetch
});

const { locale } = useI18n(); // Access the current language
const currentLanguage = locale; // reactive reference

const selectedOrientation = ref('horizontal');
const loading = ref(false);
let ratio = "landscape";

const userOwnQuote = ref(false); // Checkbox state
const userQuoteInput = ref(''); // User's own quote input
const authorNameInput = ref(''); // Author name input
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
    // Check if user provided their own quote
    if (userOwnQuote.value) {
      quoteText.value = userQuoteInput.value || 'Default quote text';
      quoteAuthor.value = authorNameInput.value || 'Anonymous';
    }
    else {
      // Fetch quote using api
      const quoteResponse = await axios.get(
        // enable for deployed website, disable for local host testing //
        // 'https://zenquotes.io/api/quotes'

        // disable for deployed website, enable for local host testing //
        // 'https://api.allorigins.win/raw?url=https://zenquotes.io/api/quotes'

        // alt quote api
        // `https://api.allorigins.win/raw?url=https://stoic.tekloon.net/stoic-quote&_=${new Date().getTime()}`

        // local quote api
        `/quotes.json`
      );

      // StoicQuotes API data
      // const quoteData = quoteResponse.data.data;
      // console.log('Quote Object Data:', quoteData);

      // Local Quotes Data
      const quotes = quoteResponse.data;
      console.log(quotes);
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quoteData = quotes[randomIndex];
      console.log(quoteData);

      // Ensure the author is not empty
      if (quoteData.author == "") {
        quoteData.author = "Anonymous";
      }

      // console.log("current langauge is: ", currentLanguage);

      // Translate the quote into the language selected by user
      if (currentLanguage.value === 'zh') {
        // console.log('Chinese selected');

        // Using chatgpt to translate
        // const translatedResult = await translateQuote(quoteData.quote, quoteData.author, 'Chinese');
        // console.log("Translated Result: ", translatedResult);
        // quoteText.value = translatedResult[0];
        // quoteAuthor.value = translatedResult[1];

        // Using local data
        if (quoteData.author_cn == "") { // in case the author name is missing
          quoteData.author_cn = "无名氏";
        }
        else {
          quoteText.value = quoteData.content_cn;
          quoteAuthor.value = quoteData.author_cn;
        }

      }
      else {// quotes are in English language

        // StoicQuotes API
        // quoteText.value = quoteData.quote;
        // quoteAuthor.value = quoteData.author;

        // Local quotes
        quoteText.value = quoteData.content;
        quoteAuthor.value = quoteData.author;
      }
    }

    // Fetch image

    // wallhaven api url
    const wallhavenUrl = `https://wallhaven.cc/api/v1/search?apikey=${import.meta.env.VITE_img_api}&q=id%3A37&categories=100&sorting=random&ratios=${ratio}&purity=100&page=1&seed=${Math.random()}`;

    // wall haven image url
    // const imageResponse = await axios.get(
    //   // enable for deployed website, disable for local host testing //
    //   // wallhavenUrl

    //   // disable for deployed website, enable for local host testing //
    //   // `https://api.allorigins.win/raw?url=${encodeURIComponent(wallhavenUrl)}`


    // )
    // const imageData = imageResponse.data.data[0];
    // if (!imageData || !imageData.path) {
    //   throw new Error("No image data received.");
    // }
    // let imageUrl = imageData.path;

    // a google image for quick testing
    // imageUrl = "https://static.vecteezy.com/system/resources/previews/040/890/255/non_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg";

    // wallhaven image
    // imageUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;


    // pexel api url
    const imageRes = await axios.get(`https://api.pexels.com/v1/search?query=scene&orientation=${ratio}&per_page=20&page=${Math.floor(Math.random() * 5) + 1}`, {
      headers: {
        Authorization: import.meta.env.VITE_img_api2
      }
    });
    const imageData = imageRes.data;
    console.log(imageData);
    if (!imageData.photos || imageData.photos.length === 0) {
      throw new Error('No images found');
    }
    const randomIndex = Math.floor(Math.random() * imageData.photos.length);
    const imageUrl = imageData.photos[randomIndex].src.large;

    console.log("Image URL:", imageUrl);

    // Paint quote image
    await createCompositeImage(imageUrl, quoteText.value, quoteAuthor.value, true);
    await createCompositeImage(imageUrl, quoteText.value, quoteAuthor.value, false);
    // Mark Image generated
    imageGenerated.value = true;
    // Finish loading
    loading.value = false;
    toast.success(t('toast.success'));

  } catch (error) {
    console.error("Error generating quote or image:", error);
    loading.value = false;
    toast.error(t('toast.fail'));
  }

  // Translate quote and author using ChatGPT API
  async function translateQuote(quote, author, language) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `
                  Translate the following "${quote}&${author}' into ${language}, return one response only, straightly in the same format but do not include double quotation marks.
                  `,
            },
          ],
          temperature: 0.1,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_gpt_api}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data.choices[0].message.content;
      // console.log(result);
      // console.log(result.split('&'));
      return result.split('&');
    } catch (error) {
      throw error;
    }
  }

  // paint the image on a canva
  async function createCompositeImage(imageUrl, quote, author, isMobile = false) {
    const canvas = isMobile ? canvasRefMobile.value : canvasRefLarge.value;
    const ctx = canvas.getContext('2d');

    // Create a new Image object
    const img = new Image();
    img.crossOrigin = "anonymous";
    const maxWidth = 1280;
    const maxHeight = 720;

    // Wait for image to load
    await new Promise((resolve) => {
      img.onload = () => {
        // Calculate aspect ratio and resize image
        const aspectRatio = img.width / img.height;
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

        // Set canvas size and draw image
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Add overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text configuration
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';

        // Calculate font sizes based on canvas dimensions
        const quoteFontSize = Math.min(canvas.height * 0.05, canvas.width * 0.04);
        const authorFontSize = quoteFontSize * 0.6;

        const isChinese = /[\u4e00-\u9fa5]/.test(quote);
        const maxWidthText = canvas.width * 0.8;

        // Set initial font for measurement
        ctx.font = `bold ${quoteFontSize}px Arial`;

        // Function to wrap text
        function wrapText(text, maxWidth, isChinese) {
          const lines = [];
          if (isChinese) {
            let currentLine = '';
            for (const char of text) {
              const testLine = currentLine + char;
              const metrics = ctx.measureText(testLine);

              if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = char;
              } else {
                currentLine = testLine;
              }
            }
            if (currentLine) {
              lines.push(currentLine);
            }
          } else {
            const words = text.split(' ');
            let currentLine = '';

            for (const word of words) {
              const testLine = currentLine ? `${currentLine} ${word}` : word;
              const metrics = ctx.measureText(testLine);

              if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            }
            if (currentLine) {
              lines.push(currentLine);
            }
          }
          return lines;
        }

        // Wrap the quote text
        const lines = wrapText(quote, maxWidthText, isChinese);

        // Calculate vertical positioning
        const lineHeight = quoteFontSize * 1.5;
        const totalTextHeight = (lines.length * lineHeight) + (authorFontSize * 2);
        let startY = (canvas.height - totalTextHeight) / 2;

        // Draw quote lines
        ctx.font = `bold ${quoteFontSize}px Arial`;
        lines.forEach((line, i) => {
          ctx.fillText(line.trim(), canvas.width / 2, startY + (i * lineHeight));
        });

        // Draw author
        startY += lines.length * lineHeight + authorFontSize;
        ctx.font = `italic ${authorFontSize}px Arial`;
        ctx.fillText(`― ${author}`, canvas.width / 2, startY);

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
