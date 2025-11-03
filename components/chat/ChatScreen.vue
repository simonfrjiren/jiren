<script setup lang="ts">
definePageMeta({
  layout: "conversation",
});
</script>

<template>
  <section class="flex flex-1 h-full">
    <PartialsChatMainSection />
    <div class="w-[0px] h-full lg:w-[288px] overflow-hidden">
      <PartialsRightSection />
    </div>
  </section>
</template>
