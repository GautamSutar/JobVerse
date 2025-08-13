import { useEffect } from "react";

const useNotificationSound = () => {
  useEffect(() => {
    const audio = new Audio("/notification.mp3");

    const handleMessage = (event) => {
      if (event.data?.type === "NEW_NOTIFICATION") {
        const old = JSON.parse(localStorage.getItem("notifications")) || [];
        const updated = [event.data.payload, ...old];
        localStorage.setItem("notifications", JSON.stringify(updated));
      }

      if (event.data?.type === "PLAY_SOUND") {
        audio.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
      }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", handleMessage);
    }

    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener("message", handleMessage);
      }
    };
  }, []);
};

export default useNotificationSound;
