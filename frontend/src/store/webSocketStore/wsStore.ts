import { create } from "zustand";
const wsUrl = import.meta.env.VITE_WS_URL;
interface WSMessage {
  type: string;
  question?: any;
  reason: string;
}

interface WSStore {
  socket: WebSocket | null;
  isConnected: boolean;
  lastMessage: WSMessage | null;
  connect: (sessionId: string) => void;
  disconnect: () => void;
  sendMessage: (message: object) => void;
}

export const useWSStore = create<WSStore>((set, get) => ({
  socket: null,
  isConnected: false,
  lastMessage: null,

  connect: (sessionId: string) => {
    if (get().socket) {
      return;
    }
    const socket = new WebSocket(`${wsUrl}ws/test/${sessionId}/`);
    socket.onopen = () => {
      console.log("Websocket Connected");
      set({ isConnected: true });
    };

    socket.onmessage = (event) => {
      console.log("Message Received");
      const data: WSMessage = JSON.parse(event.data);
      set({ lastMessage: data });
    };

    socket.onclose = () => {
      console.log("Websocket is disconnected");
      set({ socket: null, isConnected: false });
    };
    socket.onerror = (error) => {
      console.log("WebSocket Connection Error: ", error);
      set({ socket: null, isConnected: false });
    };
    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  },
  sendMessage: (lastMessage: object) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.log("Can not send message ");
    }
  },
}));
