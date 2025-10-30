import React from "react";
import { Typography } from "antd";
import LoginForm from "../components/ui/LoginForm";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row min-w-screen">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center text-white text-5xl flex items-center justify-center text-center px-10"
          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
        >
          Explore the world of Fragrances
        </div>

        {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-80 flex flex-col items-center justify-center text-center text-white px-10">
          <h1 className="text-4xl font-bold mb-3 drop-shadow-lg">
            Welcome to PerfumeHub
          </h1>
          <p className="text-lg text-gray-100">Discover your signature scent</p>
        </div> */}
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <div className="text-center mb-8">
            <Title level={2} className="!text-3xl !font-bold !text-gray-800">
              Sign In
            </Title>
            <Text className="!text-gray-500">
              Welcome back! Please enter your details
            </Text>
          </div>

          {/* Import the form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
