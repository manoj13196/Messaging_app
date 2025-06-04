
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <h1>👋 Welcome to the Chat App</h1>
      <p>Login or register to start chatting with others in real-time.</p>

      <div style={{ display: "flex", gap: "12px" }}>
        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button type="default" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
};
