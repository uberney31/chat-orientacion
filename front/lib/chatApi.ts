/**
 * API client para conectarse al backend Google ADK
 * Maneja la comunicación con el agente de orientación profesional
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'orientational_agent';

/**
 * Extrae el texto de un evento de Google ADK
 * El content puede ser string o un objeto {parts: [{text: "..."}], role: "..."}
 */
export function extractTextFromContent(content: any): string | null {
  if (!content) return null;
  
  // Si ya es string, retornarlo
  if (typeof content === 'string') return content;
  
  // Si es objeto con parts, extraer el texto
  if (typeof content === 'object' && 'parts' in content) {
    const parts = content.parts;
    if (Array.isArray(parts) && parts.length > 0 && parts[0].text) {
      return parts[0].text;
    }
  }
  
  return null;
}

export interface Session {
  id: string;
  app_name: string;
  user_id: string;
  state: Record<string, any>;
  events: Event[];
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  type?: string;
  content?: string | {
    parts: Array<{ text: string }>;
    role: string;
  };
  timestamp?: string;
  metadata?: Record<string, any>;
  author?: string;
  invocationId?: string;
  partial?: boolean;
  usageMetadata?: Record<string, any>;
  actions?: Record<string, any>;
}

export interface RunAgentRequest {
  app_name: string;
  user_id: string;
  session_id: string;
  new_message: {
    role: 'user';
    parts: Array<{ text: string }>;
  };
  state_delta?: Record<string, any>;
}

/**
 * Crea una nueva sesión de chat
 */
export async function createSession(userId: string): Promise<Session> {
  const response = await fetch(
    `${API_URL}/apps/${APP_NAME}/users/${userId}/sessions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al crear la sesión');
  }

  return response.json();
}

/**
 * Obtiene una sesión existente con su historial
 */
export async function getSession(
  userId: string,
  sessionId: string
): Promise<Session> {
  const response = await fetch(
    `${API_URL}/apps/${APP_NAME}/users/${userId}/sessions/${sessionId}`
  );

  if (!response.ok) {
    throw new Error('Error al obtener la sesión');
  }

  return response.json();
}

/**
 * Lista todas las sesiones de un usuario
 */
export async function listSessions(userId: string): Promise<Session[]> {
  const response = await fetch(
    `${API_URL}/apps/${APP_NAME}/users/${userId}/sessions`
  );

  if (!response.ok) {
    throw new Error('Error al listar las sesiones');
  }

  return response.json();
}

/**
 * Elimina una sesión
 */
export async function deleteSession(
  userId: string,
  sessionId: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/apps/${APP_NAME}/users/${userId}/sessions/${sessionId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Error al eliminar la sesión');
  }
}

/**
 * Envía un mensaje al agente y obtiene la respuesta
 */
export async function sendMessage(
  userId: string,
  sessionId: string,
  message: string
): Promise<Event[]> {
  const response = await fetch(`${API_URL}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_name: APP_NAME,
      user_id: userId,
      session_id: sessionId,
      new_message: {
        role: 'user',
        parts: [{ text: message }],
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Error al enviar el mensaje');
  }

  return response.json();
}

/**
 * Envía un mensaje al agente con streaming (Server-Sent Events)
 * Retorna un EventSource para recibir eventos en tiempo real
 */
export async function sendMessageStreaming(
  userId: string,
  sessionId: string,
  message: string,
  onEvent: (event: Event) => void,
  onError?: (error: Error) => void,
  onComplete?: () => void
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/run_sse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_name: APP_NAME,
        user_id: userId,
        session_id: sessionId,
        new_message: {
          role: 'user',
          parts: [{ text: message }],
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No se pudo obtener el stream');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete?.();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          console.log('SSE data recibida:', data); // Debug
          try {
            const event = JSON.parse(data) as Event;
            console.log('Evento parseado:', event); // Debug
            onEvent(event);
          } catch (e) {
            console.error('Error parsing SSE event:', e, 'Data:', data);
          }
        } else if (line.trim()) {
          console.log('SSE línea no-data:', line); // Debug
        }
      }
    }
  } catch (error) {
    onError?.(error as Error);
  }
}

