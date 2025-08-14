import { useEffect, useRef } from "react";

export default function useNotificationWebSocket(onMessage) {
  const ws = useRef(null);

  useEffect(() => {
    const WS_URL =
      import.meta.env.VITE_REACT_APP_VITE_WS_URL ||
      "ws://localhost:8000/ws/jobs/notifications/";

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Hi i am websocket data:", data)
        onMessage(data.content);
      } catch (e) {
        console.error("Invalid WS message:", event.data);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = (e) => {
      console.log("WebSocket closed:", e.reason);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log("WebSocket cleanup");
      }
    };
  }, [onMessage]);
}
