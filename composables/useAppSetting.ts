import { defineStore } from "pinia";
import {
  fetchListRecentCharacter,
  fetchPublicListCharacter,
} from "~/services/api/chat/api";
import type {
  ICharacter,
  IConversation,
  ISectionCharacter,
} from "~/services/api/chat/type";

export const useAppSetting = defineStore("appSetting", {
  state: () => ({
    showLoading: false,
    loadAppDone: false,
    explores: [] as ISectionCharacter[],
    characters: [] as ICharacter[],
    channels: [] as IConversation[],
    recentCharacters: [] as ICharacter[],
  }),
  actions: {
    saveLoadApp() {
      this.loadAppDone = true;
    },

    changeLoading(value: boolean) {
      this.showLoading = value;
    },
    async init() {
      if (this.recentCharacters.length) return;
      const [explores, recents] = await Promise.all([
        fetchPublicListCharacter(),
        fetchListRecentCharacter(),
      ]);

      this.explores = explores;
      this.characters = this.explores.reduce(
        // @ts-ignore
        (acc: ICharacter[], cur: ISectionCharacter) => {
          return [...acc, ...cur.items];
        },
        []
      );

      this.recentCharacters = recents;
    },
  },
});
