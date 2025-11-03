import { getUserInfo } from "~/services/api/auth/api";

const requiredAuthLayouts = ["conversation", "default", "home"];

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (
    !to.meta.layout ||
    to.meta.guest ||
    !requiredAuthLayouts.includes(to.meta.layout)
  )
    return;
  const { setAccessToken, getAccessToken, setUser, getUser } = useAuthStore();
  const app = useAppSetting();
  const conversation = useConversationStore();
  let userInfo = getUser();

  if (getAccessToken()) {
    try {
      userInfo = await getUserInfo();

      setUser(userInfo);
    } catch (error) {
      localStorage.removeItem("access_token");

      return navigateTo({
        path: "/auth/login",
        query: { redirect: to.fullPath },
      });
    }
  } else if (to.name !== "index") {
    return navigateTo({
      path: "/auth/login",
      query: { redirect: to.fullPath },
    });
  }
  if (to.meta.layout === "home") return;
  if (!userInfo.username && !to.path.startsWith("/user/edit"))
    return navigateTo(`/user/edit?redirect=${to.fullPath}`);
  if (to.path.startsWith("/auth/login")) {
    return navigateTo("/");
  }

  if (to.meta.layout) {
    app.init().then(() => console.log("app.init completed"));
    const route = useRoute();
    conversation
      .init(undefined, route.params.conv_id as string)
      .then(() => console.log("conversation.init completed"));
    useSolana()
      .init(true)
      .then(() => console.log("solana.init completed"));
  }
});
