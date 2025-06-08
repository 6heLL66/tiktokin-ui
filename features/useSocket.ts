import { useEffect, useRef } from "react";

interface SocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

interface UseSocketOptions {
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  onMessage?: (message: SocketMessage) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
}

export const useSocket = (options: UseSocketOptions = {}) => {
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    try {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_API_URL}/ws/stream`);
      
      ws.onopen = (event) => {
        options.onOpen?.(event);
      };

      ws.onmessage = (event) => {
        const message: SocketMessage = {
          type: 'message',
          data: JSON.parse(event.data),
          timestamp: Date.now()
        };
        options.onMessage?.(message);
      };

      ws.onclose = (event) => {
        options.onClose?.(event);
      };

      ws.onerror = (event) => {
        options.onError?.(event);
      };

    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    connect,
    disconnect,
  };
};
