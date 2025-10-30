import React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { member, logout, isAuthenticated } = useAuth();
  const nav = useNavigate();

  const userMenu = (
    <Menu
      items={[
        ...(member?.isAdmin
          ? [
              {
                key: "dashboard",
                icon: <DashboardOutlined />,
                label: "Dashboard",
                onClick: () => nav("/dashboard"),
              },
            ]
          : []),
        {
          key: "profile",
          icon: <UserOutlined />,
          label: "Profile",
          onClick: () => nav("/profile"),
        },
        { type: "divider" },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: <span className="text-red-500">Logout</span>,
          onClick: () => {
            logout();
            nav("/");
          },
        },
      ]}
    />
  );

  return (
    <div className="w-full bg-linear-to-r from-purple-600 to-pink-500  shadow-md bg-blend-screen opacity-90 top-0 z-50 px-10 flex items-center justify-between h-16">
      {/* Logo */}
      <p
        className="text-white text-3xl uppercase tracking-wider cursor-pointer mb-0 font-bold"
        onClick={() => nav("/")}
      >
        PerfumeHub
      </p>

      {/* Menu bên phải */}
      <Space size="large">
        {isAuthenticated ? (
          <Dropdown
            overlay={userMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <p
              className="text-white hover:text-gray-200 cursor-pointer flex items-center gap-2 mb-0"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                {member?.name}
                <DownOutlined />
              </Space>
            </p>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-3">
            <p
              className="text-white! hover:text-gray-200! mb-0 cursor-pointer flex items-center gap-2"
              onClick={() => nav("/login")}
            >
              <LoginOutlined />
              Login
            </p>
            <Button
              icon={<UserAddOutlined />}
              onClick={() => nav("/register")}
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-md font-medium"
            >
              Register
            </Button>
          </div>
        )}
      </Space>
    </div>
  );
};

export default Header;
