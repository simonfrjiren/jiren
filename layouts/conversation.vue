<script setup lang="ts"></script>

<template>
  <div class="relative overflow-hidden w-screen h-screen">
    <main class="flex flex-col w-full h-full">
      <PartialsMobileHeader />
      <section class="flex-1 flex flex-row overflow-hidden w-full h-full">
        <PartialsChatLeftSection />
        <div class="h-full flex-1">
          <slot />
        </div>
      </section>
    </main>
  </div>
</template>
