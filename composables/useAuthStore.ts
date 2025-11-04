import { defineStore } from "pinia";
import type { IUserProfile } from "~/services/api/auth/type";

const storageKey = "access_token";
export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref(localStorage.getItem(storageKey) || "");

  watch(
    () => accessToken.value,
    () => {
      if (accessToken.value) {
        localStorage.setItem(storageKey, accessToken.value);
      }
      if (!accessToken.value) {
        localStorage.removeItem(storageKey);
      }
    }
  );

  const user = ref<IUserProfile>({ name: "" } as IUserProfile);

  function logOut() {
    const { disconnect } = useSolConnect();
    setAccessToken("");
    setUser();
    window.location.href = "/auth/login";
    disconnect();
  }

  function setUser(userInfo?: IUserProfile) {
    user.value = userInfo || ({ name: "" } as IUserProfile);
  }

  function getUser(): IUserProfile {
    return user.value;
  }

  function setAccessToken(newToken: string) {
    accessToken.value = newToken;
    localStorage.setItem(storageKey, newToken);
  }

  return {
    getUser,
    setUser,
    getAccessToken() {
      return accessToken.value;
    },
    setAccessToken,
    logOut,
    user,
  };
});
