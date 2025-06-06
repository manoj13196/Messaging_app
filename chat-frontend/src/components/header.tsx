import { useEffect, useState } from "react";
import { Button, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

export const HeaderBar = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(payload.email);
      } catch {
        setUserEmail(null);
      }
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem("pay");
    localStorage.removeItem("token");
    localStorage.clear();
     socket.disconnect();
    
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Space>
        {userEmail && <Typography.Text>Logged in as: {userEmail}</Typography.Text>}     
      </Space>
      <Button onClick={handleLogout} danger>
          Logout
        </Button>
    </div>
  );
};
