<script setup lang="ts">
import { WalletReadyState } from "@solana/wallet-adapter-base";

const props = defineProps<{
  onChange: (address?: string) => void;
  logout?: boolean;
}>();

const { connected, wallets, address, readyState, selectWallet, disconnect } =
  useSolConnect();

const walletPhantom = computed(() => {
  return wallets.value[0];
});

watch(address, () => {
  console.log("address", address.value);
  if (address) {
    props.onChange(address.value);
  }
});

async function toggleSOLConnectWallet() {
  if (readyState.value === WalletReadyState.NotDetected) {
    window.open("https://phantom.app/download", "_black");
    return;
  }
  if (!walletPhantom.value) {
    return;
  }
  if (address.value && connected.value) {
    await disconnect();
  }
  selectWallet(walletPhantom.value.adapter.name);
}
</script>

<template>
  <button @click="toggleSOLConnectWallet">
    <slot />
  </button>
</template>
