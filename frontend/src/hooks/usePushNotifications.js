import { useEffect } from "react";
import axios from "axios";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_REACT_APP_VAPID_PUBLIC_KEY;
const BACKEND_BASEURL =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://127.0.0.1:8000/api";

function urlBase64ToUint8Array(base64String) {
  if (!base64String) {
    console.error("VAPID public key is undefined. Check your .env file.");
    return;
  }
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function usePushNotifications() {
  useEffect(() => {
    const subscribe = async () => {
      try {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
          console.warn("Push messaging is not supported on this browser.");
          return;
        }

        const reg = await navigator.serviceWorker.register(
          "/service-worker.js"
        );
        console.log("Service Worker registered:", reg);

        let subscription = await reg.pushManager.getSubscription();

        if (subscription === null) {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            console.warn("Notification permission was not granted.");
            return;
          }

          subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("User is not logged in. Aborting subscription save.");
          return;
        }

        const response = await axios.post(
          `${BACKEND_BASEURL}/notifications/save-subscription/`,
          subscription,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("push Subscription:", response.data);
      } catch (err) {
        console.error("Failing Backend Base URL:", BACKEND_BASEURL);
        console.error("Push subscribe failed:", err);
      }
    };

    subscribe();
  }, []);
}
