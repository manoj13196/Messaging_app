import axios from "axios";
import type { AuthProvider, OnErrorResponse } from "@refinedev/core";

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
            return { success: true, redirectTo: "/users" };
        } catch (error) {
            return Promise.reject(new Error("Login failed"));
        }
    },

    logout: async () => {
        localStorage.removeItem("token");
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
