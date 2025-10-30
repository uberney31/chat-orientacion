import { create } from 'zustand';
import { auth } from '@/lib/firebase';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatState {
  // Estado del chat
  isOpen: boolean;
  messages: Message[];
  isConnected: boolean;
  isLoading: boolean;
  
  // Información de sesión
  sessionId: string | null;
  userId: string;
  
  // Acciones
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setMessages: (messages: Message[]) => void;
  setConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;
  setSessionId: (sessionId: string) => void;
  setUserId: (userId: string) => void;
  clearMessages: () => void;
}

// Generar un userId único por dispositivo o usar Firebase UID
const getUserId = (): string => {
  if (typeof window === 'undefined') return 'server-user';
  
  // Intentar obtener el usuario de Firebase primero
  const firebaseUser = auth.currentUser;
  if (firebaseUser) {
    return firebaseUser.uid;
  }
  
  // Fallback: generar ID único si no está autenticado
  let userId = localStorage.getItem('chat_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem('chat_user_id', userId);
  }
  return userId;
};

export const useChatStore = create<ChatState>((set) => ({
  // Estado inicial
  isOpen: false,
  messages: [],
  isConnected: false,
  isLoading: false,
  sessionId: null,
  userId: getUserId(),
  
  // Acciones
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  
  openChat: () => set({ isOpen: true }),
  
  closeChat: () => set({ isOpen: false }),
  
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...message,
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        timestamp: new Date(),
      },
    ],
  })),
  
  setMessages: (messages) => set({ messages }),
  
  setConnected: (connected) => set({ isConnected: connected }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setSessionId: (sessionId) => set({ sessionId }),
  
  setUserId: (userId) => set({ userId }),
  
  clearMessages: () => set({ messages: [], sessionId: null }),
}));

