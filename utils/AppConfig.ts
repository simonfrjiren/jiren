export const AppConfig = {
  name: "SolyAI",
  env: {
    API_BASE_URL:
      //@ts-ignore
      import.meta.env.VITE_API_BASE_URL || "https://api.jiren.ai/v1",
  },
  link: {},
};
