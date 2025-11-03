export interface IChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  completed: boolean;
  data: {
    observations?: IObservation[];
    actions?: any;
    reply_message?: IChatMessage;
  };
  created_at: string;
}

export type TAction = "agent_chat" | "url";

export interface IAction {
  label: string;
  type: TAction;
  params: any;
}

export interface IObservation {
  id: string;
  completed: boolean;
  tools: ITool[];
}

export interface ITool {
  id: string;
  name: string;
  inputs: any;
  outputs: string; // jsonstringify
}

export interface IConversation {
  id: string;
  name: string;
  is_readonly?: boolean;
  character: ICharacter;
  last_message?: IChatMessage;
}

export interface IAgent {
  id: string;
  name: string;
  description: string;
  avatar_url: string;
  metadata?: IAgentMetadata;
}

export interface IAgentMetadata {
  capabilities: { sub_title: string; title: string }[];
  suggested_messages: { message: string }[];
  socials: { icon_url: string; title: string; url: string }[];
}

export interface ISectionCharacter {
  name: string;
  items: ICharacter[];
}

export interface ICharacter {
  avatar_url: string;
  last_conversation_id: string;
  config: {
    example_prompts: [
      {
        assistant: string;
        user: string;
      }
    ];
  };
  conversations_count: number;
  creator: {
    avatar_url: string;
    id: string;
    name: string;
    username: string;
  };
  id: string;
  metadata: {
    description: string;
    greeting: string;
    tagline: string;
    tags: [string];
  };
  name: string;
  visibility: "public";
}
