import { defineStore } from "pinia";
import { toast } from "~/components/ui/toast";
import {
  createNewConversation,
  deleteConversationById,
  findConversationById,
} from "~/services/api/chat/api";
import type { ICharacter, IConversation } from "~/services/api/chat/type";

type ConversationState = {
  histories: IConversation[];
  conv?: IConversation;
  convID?: string;
  currentMessage: string;
  currentCharacter?: ICharacter;
  newChat: boolean;
  refreshListMessageFlag: boolean;
};

export const useConversationStore = defineStore("conversations", {
  state: (): ConversationState => ({
    histories: [],
    conv: undefined,
    convID: undefined,
    currentMessage: "",
    currentCharacter: undefined,
    newChat: false,
    refreshListMessageFlag: false,
  }),
  actions: {
    setCurrentCharacter(char?: ICharacter) {
      this.currentCharacter = char;
    },
    async newConversation(char_id: string) {
      const conv = await createNewConversation(char_id);
      if (conv) {
        this.change(conv, true);
      }
    },

    resetConv() {
      this.conv = undefined;
    },
    setCurrentMessage(content: string) {
      this.currentMessage = content;
    },
    updateCurrentChat() {
      if (!this.conv) return;
      this.histories = this.histories.filter(
        (item) => item.id !== this.conv?.id
      );
      this.histories.unshift(this.conv);
    },
    setConvID(id: string) {
      this.convID = id;
    },

    async init(conv?: IConversation, conv_id?: string) {
      if (conv_id) {
        conv = await findConversationById(conv_id);
      }

      return this.change(conv);
    },
    change(conv?: IConversation, refreshListMessage?: boolean) {
      window.document.title = conv?.name || "New Chat";

      if (!conv) {
        this.convID = "";
        this.conv = { char: this.currentCharacter, name: "New Chat" } as any;
        return;
      }

      this.conv = conv;
      this.convID = conv.id;

      if (this.conv.character) {
        this.setCurrentCharacter(this.conv.character);
      }
      if (refreshListMessage)
        this.refreshListMessageFlag = !this.refreshListMessageFlag;
    },
    async delete(deleteItem: IConversation) {
      const app = useAppSetting();
      app.changeLoading(true);
      const rs = await deleteConversationById(deleteItem.id);
      if (rs) {
        this.histories = this.histories.filter(
          (item) => item.id !== deleteItem.id
        );
        if (deleteItem.id === this.conv?.id) {
          this.conv && window.history.replaceState({}, "", `/c`);
          this.conv = undefined;
        }
      } else {
        toast({
          description: "Delete conversation failer",
          duration: 3000,
        });
      }
      setTimeout(() => app.changeLoading(false), 300);
    },
  },
});
