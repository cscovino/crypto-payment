import { useEffect, useState } from 'react';

enum ReadyState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}

export default function useWebSocket<T>(wsURL: string) {
  const [message, setMessage] = useState<T>();

  useEffect(() => {
    const socket = new WebSocket(wsURL);
    const handleEventMessage = (event: WebSocketEventMap['message']) => {
      setMessage(JSON.parse(event.data));
    };
    socket.addEventListener('message', handleEventMessage);
    return () => {
      socket.removeEventListener('message', handleEventMessage);
      if (socket.readyState === ReadyState.OPEN) {
        socket.close();
      }
    };
  }, []);

  return message;
}
