# 🧠 Jiren.AI — with x402 Integration

**Jiren.AI** is a modern AI web application built with **Nuxt 4**, designed for performance, scalability, and seamless on-chain payments through the **x402 protocol** (powered by **PayAI Network**).

---

## 🚀 Features

- ⚡ **Modern Nuxt App** — SSR, SEO-friendly, lightning-fast frontend.  
- 💰 **x402 Payments Integration** — On-chain payments via HTTP 402 “Payment Required”.  
- 🤖 **AI-Powered APIs** — Monetize AI endpoints or data access with pay-per-request billing.  
- 🔐 **No Accounts Needed** — Users or AI agents can pay directly using stablecoins (USDC, etc.) without OAuth or API keys.  
- 🪙 **Micro-Payments Ready** — Perfect for usage-based AI interactions.  

---

## 🧩 Project Structure

```bash
/
├─ pages/                    # Nuxt pages and routes
├─ services/api/chat/api.ts  # x402 integration in createCharacter402()
├─ server/api/               # API endpoints
├─ components/               # UI components
├─ utils/                    # Helper and network configuration
└─ README.md
```

---

## ⚙️ Setup

Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install
```

Run the development server:

```bash
# npm
npm run dev
```

Server runs at [http://localhost:3000](http://localhost:3000)

---

## 💼 x402 (PayAI Network) Integration

The x402 payment flow is implemented in  
`services/api/chat/api.ts` → **`createCharacter402()`**,  
which handles on-chain payment verification and resource access before character creation.

Example logic outline:

```ts
// services/api/chat/api.ts
import {createX402Client} from "x402-solana/client";
export async function createCharacter402(payload) {
    const headers: any = {
        "Content-Type": 'application/json',
        "Accept": 'application/json; indent=2',
    }
    const {wallets} = useSolConnect()
    const client = createX402Client({
      wallet: wallets.value[0].adapter,
      network: 'solana',
      rpcUrl: CONNECTION_CONFIG.mainnet
    });
    const response = await client.fetch(`${AppConfig.env.API_BASE_URL}/characters`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    return await response.json().then(x => x.data).catch((error: any) => null);
}
```

The backend returns a `402 Payment Required` response when a user or agent attempts to create a character that requires a fee:

```http
HTTP/1.1 402 Payment Required
X-Payment-Details: {
  "amount": "0.05",
  "currency": "USDC",
  "network": "solana",
  "payTo": "...",
  "extra": { "feePayer": "..." }
}
```

Once the payment is completed and verified,  
`createCharacter402()` resends the request and finalizes character creation.

---

## 🧠 Vision

**Jiren.AI** enables the **AI Agent Economy**, where users and autonomous agents can:

- Access AI models, APIs, or content on demand.  
- Pay per use directly with stablecoins on-chain.  
- Skip account creation, billing setup, or API key management.  

---

## 🧩 Tech Stack

| Layer | Technology                    |
|-------|-------------------------------|
| Frontend | Nuxt 4 (Vue 3 + Vite)         |
| Backend | Golang Server                 |
| Payments | x402 Protocol / PayAI Network |
| Blockchain | Solana / Base / Ethereum      |
| AI Engine | Jiren AI Core APIs            |

---

## 🌍 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

More deployment details: [Nuxt Deployment Docs](https://nuxt.com/docs/getting-started/deployment)

---

## 🪄 Example Payment Flow

1. User requests to create a new AI character.  
2. Server replies with `402 Payment Required` and on-chain payment details.  
3. Client handles the payment via `createCharacter402()` using the PayAI Network.  
4. Once the transaction is verified, the request is retried and the character is created.  
5. All automatic, trustless, and on-chain.  

---

## 📜 License

MIT © 2025 Jiren.AI
