// import React, { useState, } from 'react';
// import { Menu, Button, Dropdown } from 'antd';
// import {
//   TeamOutlined,
//   UserOutlined,
//   ProfileOutlined,
//   LogoutOutlined,
//   SettingOutlined,
//   MenuOutlined,
// } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import Avatar from 'antd/lib/avatar/avatar';


// const { SubMenu } = Menu;

// function Dashboard({ children, heading }) {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleCollapsed = () => {
//     setCollapsed((prevCollapsed) => !prevCollapsed);
//   };


//   const menu = (
//     <Menu>
//       <Menu.Item key='1' icon={<ProfileOutlined />}>
//         <Link to='/'>Profile</Link>
//       </Menu.Item>
//       <Menu.Item key='2' icon={<SettingOutlined />}>
//         <Link to='/'>Setting</Link>
//       </Menu.Item>
//       <Menu.Item
//         key='3'
//         icon={<LogoutOutlined />}
//         onClick={() => ""}
//       >
//         <Link to='/kkkk'>Logout</Link>
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <div className='flex min-h-screen'>
//       <div
//         className={`w-64 bg-gray-900 text-white ${collapsed ? 'collapsed' : ''
//           } md:overflow-y-auto`}
//       >
//         <div className='flex items-center justify-center py-4'>
//           {/* <Logo /> */} Deep clean
//         </div>
//         <Menu
//           theme='dark'
//           defaultOpenKeys={['13','21','Enquire List']}
//           defaultSelectedKeys={['21']}
//           mode='inline'
//           className='text-sm'
//         >

//           <SubMenu key={'1'} title='Enquire List' icon={<UserOutlined />}>
//             <Menu.Item key="1" icon={<UserOutlined />} >
//               <Link to="/dashboard">Enquire List</Link>
//             </Menu.Item>
//           </SubMenu>

//           <SubMenu key={'2'} title='Bookings' icon={<UserOutlined />}>

//             <Menu.Item key='21' icon={<UserOutlined />}>
//               <Link to='/customers'>
//                 All Bookings
//               </Link>
//             </Menu.Item>

//             <Menu.Item key='23' icon={<UserOutlined />}>
//               <Link to='/book'>Add Book</Link>
//             </Menu.Item>

//           </SubMenu>

//           <SubMenu key={'3'} title='Services' icon={<TeamOutlined />}>
//             <Menu.Item key='31' icon={<TeamOutlined />}>
//               <Link to='/add-category'>
//                 All Services
//               </Link>
//             </Menu.Item>

//             <Menu.Item key='32' icon={<TeamOutlined />}>
//               <Link to='/'>Add Service</Link>
//             </Menu.Item>
//           </SubMenu>

//           <SubMenu key={'4'} title='Task List' icon={<UserOutlined />}>
//             <Menu.Item key="41" icon={<UserOutlined />} >
//               <Link to="/tasks">Enquire List</Link>
//             </Menu.Item>
//           </SubMenu>

//         </Menu>
//       </div>

//       <div className='flex-1 min-h-screen bg-gray-100'>
//         <header className='bg-white shadow-md p-4 flex justify-between items-center'>
//           <Button
//             icon={<MenuOutlined />}
//             className='md:hidden'
//             onClick={toggleCollapsed}
//           />
//           <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{heading}</h2>
//           <Dropdown menu={menu}>
//             <Avatar size='large' src='../images/team_01.jpg' />
//           </Dropdown>
//         </header>

//         <div>
//           <main>{children}</main>
//         </div>

//         <footer className='text-center bg-white py-4'>
//           Deep Cleaning ©{new Date().getFullYear()} Created by vikram
//         </footer>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;




import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button, Dropdown, Avatar, Space } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

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
      label: 'Invoices',
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
          label: 'Profile',
        },
        {
          key: 'settings',
          label: 'Settings',
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
        },
      ]}
    />
  );

  const selectedKey = routes.find((route) => route.path === location.pathname)?.key || 'dashboard';

  return (
    <Layout className="min-h-screen">
      <Header
        className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 bg-white shadow-sm"
        style={{ height: 64, lineHeight: '64px' }}
      >
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Menu"
          />
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FileTextOutlined className="text-xl" />
            <span className="hidden sm:inline">CleanPro Admin</span>
          </div>
        </div>
        <Dropdown overlay={dropdownMenu} placement="bottomRight">
          <Button type="text" className="rounded-full p-0">
            <Avatar src="/placeholder-user.jpg" alt="User">
              AD
            </Avatar>
          </Button>
        </Dropdown>
      </Header>
      <Layout>
        <Drawer
          placement="left"
          onClose={() => setIsSidebarOpen(false)}
          visible={isSidebarOpen}
          width={256}
          bodyStyle={{ padding: 0 }}
          className="md:hidden"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            className="h-full bg-gray-50"
            items={routes.map((route) => ({
              key: route.key,
              icon: route.icon,
              label: (
                <a
                  href={route.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(route.path);
                    setIsSidebarOpen(false);
                  }}
                >
                  {route.label}
                </a>
              ),
            }))}
          />
        </Drawer>
        <Sider
          width={256}
          className="hidden md:block bg-gray-50"
          style={{ height: 'calc(100vh - 64px)', position: 'sticky', top: 64 }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            className="h-full border-r-0"
            items={routes.map((route) => ({
              key: route.key,
              icon: route.icon,
              label: (
                <a
                  href={route.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(route.path);
                  }}
                >
                  {route.label}
                </a>
              ),
            }))}
          />
        </Sider>
        <Content className="p-4 md:p-6 bg-gray-100">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;