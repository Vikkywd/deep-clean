import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button, Dropdown, Avatar, Space } from 'antd';
import {HomeOutlined, CalendarOutlined,  UserOutlined, ImportOutlined, FileTextOutlined,  BarChartOutlined, SettingOutlined,  LogoutOutlined,  MenuOutlined} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './dasboard.css'
const { Header, Sider, Content, Footer } = Layout;

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <HomeOutlined />,
      path: '/dashboard',
    },
    {
      key: 'bookings',
      label: 'Bookings',
      icon: <CalendarOutlined />,
      path: '/dashboard/bookings',
    },
    {
      key: 'workers',
      label: 'Workers',
      icon: <UserOutlined />,
      path: '/dashboard/workers',
    },
    {
      key: 'tasks',
      label: 'Tasks',
      icon: <FileTextOutlined />,
      path: '/dashboard/tasks',
    },
    {
      key: 'invoices',
      label: 'Bills',
      icon: <FileTextOutlined />,
      path: '/dashboard/invoices',
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: <BarChartOutlined />,
      path: '/dashboard/reports',
    },
    {
      key: 'enquire',
      label: 'Enquire',
      icon: <ImportOutlined />,
      path: '/dashboard/enquire',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      path: '/dashboard/settings',
    },
    
  ];

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          label: (
            <Link to="/dashboard/profile" onClick={() => navigate('/dashboard/profile')}>
              Profile
            </Link>
          ),
        },
        {
          key: 'settings',
          label: (
            <Link to="/dashboard/settings" onClick={() => navigate('/dashboard/settings')}>
              Settings
            </Link>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          label: (
            <Space>
              <LogoutOutlined />
              Log out
            </Space>
          ),
          onClick: () => navigate('/logout'),
        },
      ]}
      className="rounded-lg shadow-lg bg-white/90 backdrop-blur-sm"
    />
  );

  const selectedKey = routes.find((route) => route.path === location.pathname)?.key || 'dashboard';

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
     
      <Header className="wow-header sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="md:hidden text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Menu"
          />
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <FileTextOutlined className="text-2xl text-green-500" />
            <span className="hidden sm:inline">CleanPro Admin</span>
          </div>
        </div>
        <Dropdown overlay={dropdownMenu} placement="bottomRight">
          <Button type="text" className="rounded-full p-0 hover:bg-green-100">
            <Avatar src="/placeholder-user.jpg" alt="User" size="large" className="border-2 border-green-200">
              AD
            </Avatar>
          </Button>
        </Dropdown>
      </Header>

      <Layout>
        <Drawer
          placement="left"
          onClose={() => setIsSidebarOpen(false)}
          open={isSidebarOpen}
          width={256}
          bodyStyle={{ padding: 0 }}
          className="wow-drawer md:hidden"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            className="h-full"
            items={routes.map((route) => ({
              key: route.key,
              icon: route.icon,
              label: (
                <Link
                  to={route.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(route.path);
                    setIsSidebarOpen(false);
                  }}
                >
                  {route.label}
                </Link>
              ),
            }))}
          />
        </Drawer>

        <Sider
          width={256}
          className="wow-sider hidden md:block"
          style={{ height: 'calc(100vh - 64px)', position: 'sticky', top: 64 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            className="h-full animate-slide-up"
            items={routes.map((route) => ({
              key: route.key,
              icon: route.icon,
              label: (
                <Link
                  to={route.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(route.path);
                  }}
                >
                  {route.label}
                </Link>
              ),
            }))}
          />
        </Sider>

        <Layout>
          <Content className="wow-content p-4 md:p-6 animate-fade-in">
            {children}
          </Content>
          
          <Footer className="wow-footer text-center py-4">
            Deep Cleaning ©{new Date().getFullYear()} Created by Vikram
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;