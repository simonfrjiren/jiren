import { toast } from "~/components/ui/toast";
import Fetch from "..";
import type { IAuthLimit, IUserProfile } from "./type";
import { ofetch } from "ofetch";

export async function loginWithProvider(
  provider: "solana",
  params: any
): Promise<IAuthLimit> {
  try {
    const { data } = await Fetch.post<{ data: IAuthLimit }>(`@api/auth/login`, {
      data: params,
      provider,
    });
    return data.data;
  } catch (error: any) {
    console.error("loginByProject er", error.response);
    toast({
      description: error.response.data.message,
    });
    return { access_token: "", id: "" };
  }
}

export async function getUserInfo(): Promise<IUserProfile> {
  try {
    const { data } = await Fetch.get<{ data: IUserProfile }>(
      `@api/users/profile`
    );

    return data.data;
  } catch (error) {
    console.log("getUserInfo er", error);
    return { name: "" } as IUserProfile;
  }
}

export async function fetchUserByUsername(
  username: string
): Promise<IUserProfile> {
  try {
    const { data } = await Fetch.get<{ data: IUserProfile }>(
      `@api/users/${username}`
    );

    return data.data;
  } catch (error) {
    console.log("getUserInfo er", error);
    return { name: "" } as IUserProfile;
  }
}

export async function postUpdateUserProfile(body: {
  avatar_url?: string;
  name?: string;
  username?: string;
}): Promise<IUserProfile | undefined> {
  try {
    const { data } = await Fetch.put<{ data: IUserProfile }>(
      `@api/users/profile`,
      body
    );
    return data.data;
  } catch (error: any) {
    console.error("postUpdateUserProfile er", error.response);

    return undefined;
  }
}

export async function getSubscriptionPrice() {
  try {
    const { data } = await Fetch.get<{
      data: { extra_balance: number; price: number };
    }>(`@api/subscriptions/price`);

    return data.data;
  } catch (error) {
    console.log("getSubscriptionPrice er", error);
    return { price: 0, extra_balance: 0 };
  }
}

export async function payToJoinSubscription() {
  try {
    const { data } = await Fetch.post<{
      data: { status: "pending"; tx_signature: string };
    }>(`@api/subscriptions/buy`, {});
    return data;
  } catch (error: any) {
    console.error("payToJoinSubscription er", error.response.status);

    return null;
  }
}

export async function postUploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await ofetch(
      `${AppConfig.env.API_BASE_URL}/upload-image`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return data?.url;
  } catch (error: any) {
    console.error("postUploadImage er", error.response.status);

    return "";
  }
}
