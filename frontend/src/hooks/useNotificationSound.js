import { useCallback } from "react";

export default function useNotificationSound() {
  const playSound = useCallback(() => {
    const audio = new Audio("/notification.mp3");

    audio.play().catch((error) => {
      console.warn(
        "Audio playback was prevented by the browser. A user interaction is required for sound.",
        error
      );
    });
  }, []);

  return playSound;
}
