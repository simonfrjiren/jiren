<template>
  <div class="">
    <header class="relative flex gap-8">
      <nuxt-link class="py-2 p-3 flex gap-2 items-center" to="/">
        <img class="w-8 h-8" :src="`/icon.svg?v=${VERSION}`" alt="" />
        <span>Jiren</span>
      </nuxt-link>
      <div class="container flex gap-4">
        <a class="py-3" target="_blank" href="#">Github</a>
        <a class="py-3" target="_blank" href="#">Docs</a>
        <a class="py-3" target="_blank" href="https://x.com/Jiren_AI">X</a>
      </div>
    </header>
    <slot />
    <footer>
      <div class="container">
        <div>Copyright © 2025 Jiren AI</div>
        <span>.</span>
        <a
            href="https://gai-labs.gitbook.io/jiren.so/legal/privacy-policy"
            target="_blank"
        >
          Privacy
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

header {
  background: #FF5A51;
}

header .wrapper {
  @apply flex items-center gap-4;

  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
}

footer {
  @apply py-24;
}

footer .container {
  @apply flex justify-center items-center gap-1 text-xs;

  color: #99A1AF;
}

body {
  background-image: url("/bg-top.png?v=2"), url("/bg-bottom.png?v=2");
  background-position: center top, center bottom;
  background-repeat: no-repeat, no-repeat;
  background-size: contain, contain;
}
</style>
<script setup lang="ts">
import {VERSION} from "@/constants";
</script>
