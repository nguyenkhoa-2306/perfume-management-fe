import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../services/authService";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { loginLocal } = useAuth();
  const nav = useNavigate();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    try {
      setLoading(true);
      const data = await login(email, password);
      loginLocal(data.member);
      message.success("Login successful!");
      nav("/");
    } catch (err: any) {
      message.error(
        err?.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="space-y-4">
      {/* Email */}
      <Form.Item
        label={<span className="text-gray-700 font-medium">Email</span>}
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Invalid email format!" },
        ]}
      >
        <Input
          size="large"
          prefix={<MailOutlined className="text-gray-400 mr-2" />}
          placeholder="Enter your email"
          className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
        />
      </Form.Item>

      {/* Password */}
      <Form.Item
        label={<span className="text-gray-700 font-medium">Password</span>}
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="text-gray-400 mr-2" />}
          placeholder="Enter your password"
          className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
        type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          icon={<LoginOutlined />}
          className="w-full h-12 font-semibold text-white rounded-lg hover:opacity-90 transition-all duration-300 border-0 shadow-md"
        >
          Sign in
        </Button>
      </Form.Item>

      {/* Register Link */}
      <p className="text-center text-gray-600 text-sm">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="inline-flex items-center text-purple-600 hover:text-pink-600 font-medium transition-colors"
        >
          <UserAddOutlined className="mr-1" /> Create account
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
