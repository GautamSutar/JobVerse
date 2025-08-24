import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
export const useHydrateAuth = () => {
    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        const stored = localStorage.getItem('auth_data');
        if (stored) {
            const parsed = JSON.parse(stored);
            login(parsed);
        }
    }, [login]);
}