'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Componente de input para el chat
 * Maneja el envío de mensajes con Enter y Shift+Enter para nueva línea
 */
export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Escribe tu mensaje...',
}: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const message = value.trim();
    if (message && !disabled) {
      onSend(message);
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter para enviar, Shift+Enter para nueva línea
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex-1 resize-none rounded-lg",
          "border border-gray-300 dark:border-gray-600",
          "bg-white dark:bg-gray-800",
          "px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "placeholder:text-gray-400",
          "max-h-24",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        rows={1}
        aria-label={placeholder}
      />
      <button
        onClick={handleSend}
        disabled={!value.trim() || disabled}
        className={cn(
          "px-4 py-2 rounded-lg",
          "bg-blue-500 hover:bg-blue-600",
          "text-white font-medium",
          "transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Enviar mensaje"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

