export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionLink?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  attachment?: { name: string; url: string };
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: ConversationParticipant[];
  lastMessage: {
    content: string;
    senderId: string;
    createdAt: string;
  };
  unreadCount: number;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}