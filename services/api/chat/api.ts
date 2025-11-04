import {toast} from "~/components/ui/toast";
import Fetch from "..";
import type {
  IAgent,
  ICharacter,
  IChatMessage,
  IConversation,
  ISectionCharacter,
} from "./type";
import {createX402Client} from "x402-solana/client";
import {CONNECTION_CONFIG} from "~/constants";

export async function createNewConversation(
  character_id: string
): Promise<any> {
  try {
    const {data} = await Fetch.post<{ data: any }>(`@api/conversations/new`, {
      character_id,
    });
    return data.data;
  } catch (error: any) {
    console.error("createNewConversation er", error.response.status);

    return null;
  }
}

export async function findConversationById(
  id: string
): Promise<IConversation | undefined> {
  try {
    const {data} = await Fetch.get<{ data: IConversation }>(
      `@api/conversations/${id}`
    );
    return data.data;
  } catch (error: any) {
    console.error("findConversationById er", error.response.status);

    return undefined;
  }
}

export async function fetchChatHistory(
  conv_id: string,
  params: {
    first_message_id?: string;
    last_message_id?: string;
  } = {}
): Promise<IChatMessage[]> {
  try {
    const {data} = await Fetch.get<{ data: IChatMessage[] }>(
      `@api/conversations/${conv_id}/history`,
      {
        params: {
          ...params,
          limit: 20,
        },
      }
    );
    return data.data;
  } catch (error: any) {
    console.error("fetchChatHistory er", error.response.status);

    return [];
  }
}


export const createCharacter402 = async (body: any) => {
  const headers: any = {
    "Content-Type": 'application/json',
    "Accept": 'application/json; indent=2',
  }
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
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

export async function fetchConversations(): Promise<IConversation[]> {
  try {
    const {data} = await Fetch.get<{ data: IConversation[] }>(
      `@api/conversations`
    );
    return data.data;
  } catch (error: any) {
    console.error("fetchConversations er", error.response.status);

    return [];
  }
}

export async function deleteConversationById(id: string): Promise<boolean> {
  try {
    const {data} = await Fetch.delete<{ data: IConversation }>(
      `@api/conversations/${id}`
    );
    return true;
  } catch (error: any) {
    console.error("findConversationById er", error.response.status);
    return false;
  }
}

export async function fetchPublicListCharacter(
  search?: string
): Promise<ISectionCharacter[]> {
  try {
    const {data} = await Fetch.get<{
      data: { sections: ISectionCharacter[] };
    }>(`@api/characters/explore`, {
      params: {
        limit: 100,
        search,
      },
    });

    return data.data.sections || [];
  } catch (error: any) {
    console.error("fetchPublicListCharacter er", error.response);

    return [];
  }
}

export async function fetchListRecentCharacter(): Promise<ICharacter[]> {
  try {
    const {data} = await Fetch.get<{ data: { items: any[] } }>(
      `@api/characters/recent`,
      {
        params: {
          limit: 100,
        },
      }
    );

    return data.data.items || [];
  } catch (error: any) {
    console.error("fetchListRecentCharacter er", error.response);

    return [];
  }
}

export async function fetchMyListCharacter(): Promise<ICharacter[]> {
  try {
    const {data} = await Fetch.get<{ data: { items: ICharacter[] } }>(
      `@api/characters/my-characters`,
      {
        params: {
          limit: 100,
        },
      }
    );

    return data.data.items || [];
  } catch (error: any) {
    console.error("fetchPublicListCharacter er", error.response);

    return [];
  }
}

export async function fetchListCharacterByUser(
  uid: string
): Promise<ICharacter[]> {
  try {
    const {data} = await Fetch.get<{ data: { items: ICharacter[] } }>(
      `@api/characters/by-creator`,
      {
        params: {
          creator_id: uid,
          limit: 100,
        },
      }
    );

    return data.data.items || [];
  } catch (error: any) {
    console.error("fetchPublicListCharacter er", error.response);

    return [];
  }
}

export async function fetchCharacterById(
  char_id: string
): Promise<ICharacter | null> {
  try {
    const {data} = await Fetch.get<{ data: ICharacter }>(
      `@api/characters/${char_id}`
    );
    return data.data;
  } catch (error: any) {
    console.error("fetchCharacterById er", error);

    return null;
  }
}

export async function fetchListAgents(): Promise<IAgent[]> {
  try {
    const {data} = await Fetch.get<{ data: IAgent[] }>(`@api/agents`);
    return data.data;
  } catch (error: any) {
    console.error("fetchListAgents er", error);

    return [];
  }
}

export async function postCreateCharacter(body: {
  avatar_url?: string;
  config?: {
    example_prompts: {
      assistant: string;
      user: string;
    }[];
    featured_score?: number;
  };
  metadata: {
    description?: string;
    greeting?: string;
    tagline: string;
    tags?: string[];
  };
  name: string;
  visibility: "public" | "private";
}): Promise<ICharacter | undefined> {
  try {
    const {data} = await Fetch.post<{ data: any }>(`@api/characters`, body);
    return data.data;
  } catch (error: any) {
    console.log("findDepositAction er", error.response._data);
    toast({
      description: error.response._data.message,
      duration: 3000,
    });
    return undefined;
  }
}

export async function putUpdateCharacter(
  id: string,
  body: {
    avatar_url?: string;
    config?: {
      example_prompts?: {
        assistant: string;
        user: string;
      }[];
      featured_score?: number;
    };
    metadata: {
      description?: string;
      greeting?: string;
      tagline: string;
      tags?: string[];
    };
    name: string;
    visibility: "public" | "private";
  }
): Promise<ICharacter | undefined> {
  try {
    const {data} = await Fetch.put<{ data: any }>(
      `@api/characters/${id}`,
      body
    );
    return data.data;
  } catch (error: any) {
    console.error("findDepositAction er", error.response);
    toast({
      description: error.response._data.message,
      duration: 3000,
    });
    return undefined;
  }
}

export async function deleteCharacter(id: string) {
  try {
    await Fetch.delete(`@api/characters/${id}`);
    return true;
  } catch (error: any) {
    console.error("deleteCharacter er", error.response);

    return false;
  }
}

export async function fetchHistoriesByCharacter(
  chid: string
): Promise<IConversation[]> {
  try {
    const {data} = await Fetch.get<{ data: { items: IConversation[] } }>(
      `@api/conversations/by-character`,
      {
        params: {
          character_id: chid,
          limit: 100,
        },
      }
    );
    return data.data.items || [];
  } catch (error: any) {
    console.error("fetchHistoriesByCharacter er", error);

    return [];
  }
}
