import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Create the socket without token yet
export const socket: Socket = io(API_URL, {
  auth: {
    token: "", // blank for now
  },
  transports: ["websocket"],
  autoConnect: false,
});

// Create a helper function to set token before connect
export function connectSocketWithToken() {
  const token = localStorage.getItem("token");
  if (token) {
    (socket.auth as { [key: string]: any }).token = token;
    socket.connect();
  } else {
    console.warn("No token found for socket connection.");
  }
}

