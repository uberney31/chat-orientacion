'use client';

import { MessageCircle, X } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { ChatWindow } from './ChatWindow';
import { cn } from '@/lib/utils';

/**
 * Floating Action Button (FAB) para el chat
 * Botón flotante en la esquina inferior derecha que abre/cierra el chat
 */
export function ChatFab() {
  const { isOpen, toggleChat } = useChatStore();

  return (
    <>
      {/* Ventana de chat */}
      <ChatWindow />

      {/* Botón FAB */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "bg-gradient-to-r from-blue-500 to-indigo-600",
          "hover:from-blue-600 hover:to-indigo-700",
          "text-white shadow-lg hover:shadow-xl",
          "transition-all duration-300 ease-in-out",
          "focus:outline-none focus:ring-4 focus:ring-blue-300",
          "flex items-center justify-center",
          isOpen ? "scale-90" : "scale-100 hover:scale-110"
        )}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={isOpen}
        aria-controls="chat-window"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <MessageCircle className="w-6 h-6 transition-transform duration-200" />
        )}
      </button>
    </>
  );
}

