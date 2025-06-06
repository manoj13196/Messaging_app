import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, List, Typography } from "antd";
import { socket } from "../socket"; 

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const Chat = () => {
  const { userId } = useParams(); 
  const [messages, setMessages] = useState<any[]>([]); 
  const [newMessage, setNewMessage] = useState(""); 

  const token = localStorage.getItem("token");

  const user_pay= localStorage.getItem("pay");
  console.log(user_pay)
  
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

  
  useEffect(() => {
    if (!token) return; 

    
    socket.connect();

  
    socket.emit("join_room", { userId });

    socket.on(`receive_message_${user_pay}`, (message) => {

      setMessages((prev) => [...prev, message]);
    });

    
    return () => {
      socket.off(`receive_message_${user_pay}`);
      socket.disconnect();
    };
  }, []);


  const sendMessage = () => {
    if (!newMessage.trim()) return; 
console.log(newMessage,userId)
 
    socket.emit("send_message", {
      content: newMessage,
      to: userId, 
    });


    setMessages((prev) => [
      ...prev,
      { content: newMessage, sender: { email: "You" } },
    ]);
    setNewMessage("");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 700, margin: "0 auto" }}>
      <Typography.Title level={3}>Chat with User {userId}...😊</Typography.Title>

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
