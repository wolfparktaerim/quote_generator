<template>
    <footer class="bg-gray-900 text-white py-6">
        <div class="container mx-auto text-center">
            <p class="text-sm mb-2">
                {{ $t('footer.copyright') }}
            </p>
            <p class="text-sm">
                {{ $t('footer.providedBy') }}
                <a href="https://wallhaven.cc/" target="_blank" class="text-indigo-400 hover:underline">
                    wallhaven API
                </a>
            </p>
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped></style>