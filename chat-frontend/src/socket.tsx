import { io, Socket } from "socket.io-client";

// The backend WebSocket URL
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Get token from localStorage
const token = localStorage.getItem("token");

// Create the socket connection with JWT sent in headers
export const socket: Socket = io(API_URL, {
  auth: {
    token, // This is sent to backend as client.handshake.auth.token
  },
  transports: ["websocket"], 
  autoConnect: false, // We will connect manually when needed
});
