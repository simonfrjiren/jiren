<script setup lang="ts">
import {VERSION} from "@/constants";

definePageMeta({
  layout: "home",
});
</script>

<template>
  <div class="section">
    <div class="container h-32"></div>
  </div>
  <div class="section">
    <div class="container">
      <h1 class="text-3xl md:text-7xl">Build and deploy powerful AI agents. No code required.</h1>
    </div>
  </div>
  <div class="section">
    <div class="container h-10"></div>
  </div>
  <div class="section">
    <div class="container">
      <div class="text-left space-y-8">
        <div class="text-[#A1A1AA] md:text-xl font-light">
          x402 enabled. MCP hosted. Auto-gas optimized.
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container h-10"></div>
  </div>
  <div class="section">
    <div class="container">
      <div class="text-left space-y-8">
        <div class="flex">
          <NuxtLink to="/character/explore">
            <div class="btn">Get Started</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container h-10"></div>
  </div>
  <div id="s2" class="section">
    <div class="container">
      <div class="w-full center gap-10">
        <div class="w-full relative">
          <div
              class="hidden md:block absolute -top-10 -left-10 w-1/2 animation-top"
          >
            <img :src="`/animate-1.png?v=${VERSION}`" alt=""/>
          </div>
          <img class="w-full relative z-10" :src="`/screenshot.png?v=${VERSION}`" alt=""/>
          <div
              class="hidden md:block absolute -bottom-10 -right-10 w-1/2 animation-bottom"
          >
            <img :src="`/animate-2.png?v=${VERSION}`" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container h-32"></div>
  </div>
  <div class="section">
    <div class="container">
      <h2 class="text-3xl">Key features</h2>
    </div>
  </div>
  <div class="section">
    <div class="container h-10"></div>
  </div>
  <div class="section">
    <div class="container bg-white/6 text-[#99A1AF]">
      <div class="grid md:grid-cols-3 gap-2 p-2">
        <div class="px-2 border border-white/10 rounded-xl flex flex-col justify-between gap-8 overflow-hidden">
          <div class="p-4 flex gap-4">
            <div class="w-24">
              <img src="/home/4/1.svg" class="w-full" alt="">
            </div>
            <div class="flex-1">
              <div class="text-white uppercase">Deploying your agent</div>
              <div class="text-xs">Drag-and-drop interface to craft custom
                agents. Pre-built templates for DeFi sniping,
                alerts, and real-time analytics. </div>
            </div>
          </div>
          <img :src="`/home/4/s1.png`" class="w-full" alt="">
        </div>
        <div class="px-2 border border-white/10 rounded-xl flex flex-col justify-between gap-8 overflow-hidden">
          <div class="p-4 flex gap-4">
            <div class="w-24">
              <img src="/home/4/2.svg" class="w-full" alt="">
            </div>
            <div class="flex-1">
              <div class="text-white uppercase">No-Code Modules</div>
              <div class="text-xs">Toggle trade bots, price alerts, sentiment
                scanners, and on-chain explorers.
                Enable/disable with one click , zero coding</div>
            </div>
          </div>
          <img src="/home/4/s2.png" class="w-full" alt="">
        </div>
        <div class="px-2 border border-white/10 rounded-xl flex flex-col justify-between gap-8 overflow-hidden">
          <div class="p-4 flex gap-4">
            <div class="w-24">
              <img src="/home/3/3.svg" class="w-full" alt="">
            </div>
            <div class="flex-1">
              <div class="text-white uppercase">x402 Powered Economy</div>
              <div class="text-xs">Agents discover, authorize, and pay for
                services on-chain.
              </div>
            </div>
          </div>
          <img src="/home/4/s3.png" class="w-full" alt="">
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-2 p-2">
        <div class="px-2 border border-white/10 rounded-xl flex flex-col justify-between gap-8 overflow-hidden">
          <div class="p-4 flex gap-4">
            <div class="w-24">
              <img src="/home/4/4.svg" class="w-full" alt="">
            </div>
            <div class="flex-1">
              <div class="text-white uppercase">MCP hosting</div>
              <div class="text-xs">Run agents across Solana and more. Auto-gas optimization keeps
                costs low and speed high.</div>
            </div>
          </div>
          <img src="/home/4/s4.png" class="w-full" alt="">
        </div>
        <div class="px-2 border border-white/10 rounded-xl flex flex-col justify-between gap-8 overflow-hidden">
          <div class="p-4 flex gap-4">
            <div class="w-24">
              <img src="/home/4/5.svg" class="w-full" alt="">
            </div>
            <div class="flex-1">
              <div class="text-white uppercase">Secure & Scalable</div>
              <div class="text-xs">Enterprise-grade security with wallet connect. Scale from personal bots
                to DAO-level ops.</div>
            </div>
          </div>
          <img src="/home/4/s5.png" class="w-full" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container h-32"></div>
  </div>
  <div class="section">
    <div class="container">
      <h2 class="text-3xl">How It Works</h2>
    </div>
  </div>
  <div class="section">
    <div class="container h-10"></div>
  </div>
  <div class="section">
    <div class="container grid md:grid-cols-2 md:divide-x divide-white/10 text-[#99A1AF]">
      <div class="p-4 flex gap-4">
        <div class="w-24">
          <img src="/home/3/1.svg" class="w-full" alt="">
        </div>
        <div class="flex-1">
          <div class="text-white uppercase">Design or Speak Your Agent</div>
          <div class="text-xs">Voice: "Build a DeFi sniper for under 5% slippage." Or drag-drop templates for NFT hunts/token research.</div>
        </div>
      </div>
      <div class="p-4 flex gap-4">
        <div class="w-24">
          <img src="/home/3/2.svg" class="w-full" alt="">
        </div>
        <div class="flex-1">
          <div class="text-white uppercase">Configure & Integrate</div>
          <div class="text-xs">Toggle modules (trades, alerts, analytics). Connect wallets, chains, and chats—no code, just intent.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container h-4"></div>
  </div>
  <div class="section">
    <div class="container grid md:grid-cols-2 md:divide-x divide-white/10 text-[#99A1AF]">
      <div class="p-4 flex gap-4">
        <div class="w-24">
          <img src="/home/3/3.svg" class="w-full" alt="">
        </div>
        <div class="flex-1">
          <div class="text-white uppercase">Deploy & Command</div>
          <div class="text-xs">Launch in seconds. Speak trades like "Research top Solana memes" for instant swaps/proofs. x402 handles auth; MCP ensures uptime.  </div>
        </div>
      </div>
      <div class="p-4 flex gap-4">
        <div class="w-24">
          <img src="/home/3/4.svg" class="w-full" alt="">
        </div>
        <div class="flex-1">
          <div class="text-white uppercase">Monitor & Evolve</div>
          <div class="text-xs">Real-time dashboard with voice logs and metrics. Iterate via feedback—agents learn from your commands.</div>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="container h-32"></div>
  </div>
  <div class="section">
    <div class="container">
      <h2 class="text-3xl">The x402 Edge</h2>
    </div>
  </div>
  <div class="section">
    <div class="container h-10"></div>
  </div>
  <div class="section">
    <div class="container text-[#99A1AF]">
      <p>Jiren’s MCP server is powered by x402, enabling agents to seamlessly discover, authorize, and pay for services on-chain.</p>
      <br>
      <br>
      <p>The future of AI agents + x402 is here.</p>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.section {
  border-bottom: 1px solid #FFFFFF10;
}

.section .container {
  @apply border-x border-white/10 relative px-4 md:px-10;
}

.section .container:before {
  @apply absolute inset-y-0 inset-x-4 md:inset-x-10 border-x border-white/10;
  content: "";

}

.btn {
  cursor: pointer;
  display: flex;
  padding: 10px 24px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #FF3D33;
  box-shadow: 0px 1px 0px 0px rgba(165, 180, 252, 0.3) inset,
  0px 0px 4px 0px rgba(165, 180, 252, 0.3) inset,
  0px -4px 8px 0px rgba(165, 180, 252, 0.1) inset,
  0px 2px 0px 0px #FF3D33;
}

@keyframes moveLeft {
  0% {
    left: -40px;
    top: -40px;
  }
  25% {
    left: calc(50% + 40px);
    top: -40px;
  }
  50% {
    left: calc(50% + 40px);
    top: calc(50% + 60px);
  }
  100% {
    left: 50px;
    top: calc(50% + 60px);
  }
}

@keyframes moveRight {
  0% {
    right: -40px;
    bottom: -40px;
  }
  25% {
    right: calc(50% + 40px);
    bottom: -40px;
  }
  50% {
    right: calc(50% + 40px);
    bottom: calc(50% + 60px);
  }
  100% {
    right: 50px;
    bottom: calc(50% + 60px);
  }
}

.animation-top {
  animation: moveLeft 5s ease-in-out infinite;
}

.animation-bottom {
  animation: moveRight 5s ease-in-out infinite;
}
</style>
