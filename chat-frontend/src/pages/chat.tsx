import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, List, Typography } from "antd";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const Chat = () => {
  const { userId } = useParams(); // Get ID of the user you're chatting with
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/messages/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [userId]);

const sendMessage = async () => {
  try {
    const receiverId = Number(userId); // Convert userId from string to number

    const res = await axios.post(
      `${API_URL}/messages`,
      { receiverId, content: newMessage }, // Use receiverId here
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages((prev) => [...prev, res.data]);
    setNewMessage("");
  } catch (err) {
    console.error("Failed to send message", err);
  }
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
      <Button type="primary" onClick={sendMessage} style={{ marginTop: "1rem" }}>
        Send
      </Button>
    </div>
  );
};
