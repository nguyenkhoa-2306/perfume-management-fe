import React, { useEffect, useState } from "react";
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

  // ✅ Trạng thái hiển thị header
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Cuộn xuống => ẩn header
        setIsVisible(false);
      } else {
        // Cuộn lên => hiện header
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <div
      className={`w-full bg-[#bfae9f] shadow-md fixed z-50 top-0 px-10 flex items-center justify-between h-16 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
              className="text-white hover:text-gray-200 mb-0 cursor-pointer flex items-center gap-2"
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
