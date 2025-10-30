'use client';

import { Message } from '@/store/useChatStore';
import { cn } from '@/lib/utils';
import { User, Bot, AlertCircle } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

/**
 * Componente para mostrar un mensaje individual en el chat
 * Diferencia entre mensajes del usuario, asistente y sistema
 */
export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser && "bg-blue-500",
          isAssistant && "bg-indigo-500",
          isSystem && "bg-yellow-500"
        )}
      >
        {isUser && <User className="w-5 h-5 text-white" />}
        {isAssistant && <Bot className="w-5 h-5 text-white" />}
        {isSystem && <AlertCircle className="w-5 h-5 text-white" />}
      </div>

      {/* Mensaje */}
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[75%]",
          isUser && "items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm",
            isUser && "bg-blue-500 text-white rounded-tr-sm",
            isAssistant && "glass rounded-tl-sm",
            isSystem && "bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700"
          )}
        >
          {/* Contenido del mensaje con soporte para saltos de línea */}
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-gray-500 dark:text-gray-400 px-1">
          {new Date(message.timestamp).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}

