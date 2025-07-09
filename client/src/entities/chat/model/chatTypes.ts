export type ChatPreview = {
  id: number;
  parentId: number;
  specialistId: number;
  // если родитель загружен с включением user
  parent?: { userId: number; user: { name: string } };
  // если специалист загружен с включением user
  specialist?: { userId: number; user: { name: string } };
  messages?: ChatMessage[];
};

export type ChatMessage = {
  id: number;
  chatId: number;
  text: string;
  senderRole: 'parent' | 'specialist';
  sender: {
    id: number;
    name: string;
    role: 'parent' | 'specialist';
  };
  createdAt: string;
  senderName?: string;
};

export type ChatContextT = {
  connect: (chatId: number) => void;
  sendMessage: (payload: { chatId: number; text: string }) => void;
};

export type ChatState = {
  messages: ChatMessage[];
  activeChat: ChatPreview | null;
  myChats: ChatPreview[], // список всех чатов пользователя
  error: string | null;
  loading: boolean;
};