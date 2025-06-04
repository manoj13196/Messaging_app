import { useEffect, useState } from "react";
import axios from "axios";
import { List, Typography, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

interface User {
  id: string;
  email: string;
}

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode JWT payload to get current user info
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUser({ id: payload.sub, email: payload.email });
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get<User[]>(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  if (loading) return <Spin size="large" />;

  // Filter out current user from users list
  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      <Typography.Title level={2} style={{color:"white"}}>Users</Typography.Title>
      <List
        bordered
        dataSource={filteredUsers}

        renderItem={(user) => (
          <List.Item onClick={() => handleUserClick(user.id)} style={{ cursor: "pointer", color:"white" }}>
            {user.email}
          </List.Item>
        )}
      />
    </div>
  );
};
