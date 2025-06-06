import axios from "axios";
import type { AuthProvider, OnErrorResponse } from "@refinedev/core";
import { socket } from "../socket";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { access_token,payload } = response.data;
            console.log(response.data)

            if (!access_token) {
                return Promise.reject(new Error("No access token returned"));
            }

            localStorage.setItem("token", access_token);
            localStorage.setItem("pay", payload);

             (socket.auth as { [key: string]: any }).token = access_token;
        socket.connect();
            return { success: true, redirectTo: "/users"    };
        } catch (error) {
            return Promise.reject(new Error("Login failed"));
        }
    },

   logout: async () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("pay");
    localStorage.clear();

    // Also clear possible cookies (just in case)
    document.cookie = "pay=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Optionally disconnect WebSocket
    socket.disconnect();

    return { success: true, redirectTo: "/login" };
},


    check: async () => {
        const token = localStorage.getItem("token");
        if (token) {
            return { authenticated: true };
        }
        return Promise.reject({ authenticated: false });
    },

    getPermissions: async () => {
        return { success: true };
    },

    getIdentity: async () => {
        return { success: true };
    },
    onError: function (): Promise<OnErrorResponse> {
        throw new Error("Function not implemented.");
    }
};
