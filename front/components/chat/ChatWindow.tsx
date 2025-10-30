'use client';

import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Send, Loader2 } from 'lucide-react';
import {
  createSession,
  sendMessageStreaming,
  extractTextFromContent,
  Event as ChatEvent,
} from '@/lib/chatApi';

/**
 * Ventana principal del chat
 * Muestra el historial de mensajes y el input para enviar mensajes
 */
export function ChatWindow() {
  const {
    isOpen,
    messages,
    isLoading,
    sessionId,
    userId,
    addMessage,
    setLoading,
    setSessionId,
    setUserId,
    closeChat,
  } = useChatStore();

  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Actualizar userId cuando el usuario de Firebase cambie
  useEffect(() => {
    if (user && user.uid !== userId) {
      setUserId(user.uid);
    }
  }, [user, userId, setUserId]);

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Crear sesión al abrir el chat por primera vez
  useEffect(() => {
    if (isOpen && !sessionId) {
      initializeSession();
    }
  }, [isOpen, sessionId]);

  // Enfocar el input cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const initializeSession = async () => {
    try {
      setLoading(true);
      const session = await createSession(userId);
      setSessionId(session.id);
      
      // Mensaje de bienvenida
      addMessage({
        role: 'assistant',
        content:
          '¡Hola! Soy tu orientador profesional virtual. Estoy aquí para ayudarte a descubrir tu carrera ideal. ¿En qué puedo ayudarte hoy?',
      });
    } catch (error) {
      console.error('Error al crear sesión:', error);
      addMessage({
        role: 'system',
        content: 'Error al conectar con el servidor. Por favor, intenta de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || !sessionId || isLoading) return;

    // Limpiar input
    setInputValue('');

    // Agregar mensaje del usuario
    addMessage({
      role: 'user',
      content: message,
    });

    // Mostrar loading
    setLoading(true);

    try {
      // Enviar mensaje con streaming
      await sendMessageStreaming(
        userId,
        sessionId,
        message,
        (event: ChatEvent) => {
          // Debug: ver todos los eventos que llegan
          console.log('Evento recibido:', event);
          
          // Extraer el texto del content
          const text = extractTextFromContent(event.content);
          
          if (text) {
            addMessage({
              role: 'assistant',
              content: text,
            });
          }
        },
        (error) => {
          console.error('Error en streaming:', error);
          addMessage({
            role: 'system',
            content: 'Error al recibir respuesta. Por favor, intenta de nuevo.',
          });
        },
        () => {
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      addMessage({
        role: 'system',
        content: 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
      });
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter para enviar, Shift+Enter para nueva línea
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Cerrar con backdrop en mobile
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeChat();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop para mobile */}
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Ventana de chat */}
      <div
        id="chat-window"
        role="dialog"
        aria-label="Chat de orientación profesional"
        className={cn(
          "fixed z-40",
          "bottom-24 right-6",
          "w-[calc(100vw-3rem)] md:w-96",
          "h-[32rem] max-h-[calc(100vh-10rem)]",
          "glass rounded-2xl shadow-2xl",
          "flex flex-col",
          "animate-slide-up"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-2xl">
          <h3 className="font-semibold text-lg">Orientador Profesional</h3>
          <p className="text-sm text-blue-100">Siempre aquí para ayudarte</p>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <p className="text-sm">Escribe un mensaje para comenzar</p>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Escribiendo...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className={cn(
                "flex-1 resize-none rounded-lg",
                "border border-gray-300 dark:border-gray-600",
                "bg-white dark:bg-gray-800",
                "px-3 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder:text-gray-400",
                "max-h-24"
              )}
              rows={1}
              disabled={isLoading}
              aria-label="Escribe tu mensaje"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
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
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Presiona Enter para enviar, Shift+Enter para nueva línea
          </p>
        </div>
      </div>
    </>
  );
}

