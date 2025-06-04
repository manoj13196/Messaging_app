// src/pages/register.tsx
import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email: values.email,
        name: values.name,       // send name here
        password: values.password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed", error);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <Typography.Title level={2}>Register</Typography.Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>

      <Button type="link" onClick={() => navigate("/login")} block>
        Already have an account? Login
      </Button>
    </div>
  );
};
