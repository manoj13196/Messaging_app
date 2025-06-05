import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, List, Typography } from "antd";
import { socket } from "../socket"; // Import our socket client

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const Chat = () => {
  const { userId } = useParams(); // Recipient user ID from URL
  const [messages, setMessages] = useState<any[]>([]); // Chat messages state
  const [newMessage, setNewMessage] = useState(""); // Controlled input for message

  const token = localStorage.getItem("token");

  const user_pay= localStorage.getItem("pay");
  console.log(user_pay)
  // 1. Fetch old messages on mount or when userId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/messages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, []);

  // 2. Socket connection lifecycle
  useEffect(() => {
    if (!token) return; // If not logged in, do nothing

    // Connect socket (remember, autoConnect was false)
    socket.connect();

    // Join current user's room for private messages
    // (server-side will get userId from token)
    socket.emit("join_room", { userId });

    // Listen for real-time incoming messages
    socket.on(`receive_message_${user_pay}`, (message) => {
      // Append new message to state
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup: disconnect and remove listeners when unmount or userId changes
    return () => {
      socket.off(`receive_message_${user_pay}`);
      socket.disconnect();
    };
  }, []);

  // 3. Sending message handler
  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent empty messages
console.log(newMessage,userId)
    // Emit message via websocket
    socket.emit("send_message", {
      content: newMessage,
      to: userId, // recipient ID
    });

    // Optimistic UI update (optional): add message locally immediately
    setMessages((prev) => [
      ...prev,
      { content: newMessage, sender: { email: "You" } },
    ]);
    setNewMessage("");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 700, margin: "0 auto" }}>
      <Typography.Title level={3}>Chat with User {userId}</Typography.Title>

      <List
        bordered
        dataSource={messages}
        style={{ marginBottom: "1rem", maxHeight: 300, overflowY: "auto" }}
        renderItem={(msg: any) => (
          <List.Item>
            <b>{msg.sender?.email || "You"}:</b> {msg.content}
          </List.Item>
        )}
      />

      <Input.TextArea
        rows={2}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <Button
        type="primary"
        onClick={sendMessage}
        style={{ marginTop: "1rem" }}
      >
        Send
      </Button>
    </div>
  );
};
