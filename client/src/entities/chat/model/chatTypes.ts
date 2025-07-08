export type ChatPreview = {
  id: number;
  parentId: number;
  specialistId: number;
  parent?: { userId: number; User: { name: string } };
  specialist?: { userId: number; User: { name: string } };
  messages?: ChatMessage[];
};

export type ChatMessage = {
  id: number;
  chatId: number;
  text: string;
  senderRole: 'parent' | 'specialist';
  createdAt: string;
};

export type ChatContextT = {
  connect: (chatId: number) => void;
  sendMessage: (payload: { chatId: number; text: string }) => void;
};
