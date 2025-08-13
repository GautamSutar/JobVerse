import { useEffect } from "react";
import axios from "axios";

const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY; // or VITE_ for Vite

export const usePushNotifications = () => {
  useEffect(() => {
    const subscribe = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      if ("serviceWorker" in navigator && "PushManager" in window) {
        const reg = await navigator.serviceWorker.register(
          "/notifications_Services/serviceWorker.js"
        );

        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        await axios.post("/api/notifications/save-subscription/", sub, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      }
    };

    subscribe();
  }, []);
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
