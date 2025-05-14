import React, { useState, } from 'react';
import { Menu, Button, Dropdown } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';
import Item from 'antd/es/list/Item';


const { SubMenu } = Menu;

function Dashboard({ children, heading }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };


  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<ProfileOutlined />}>
        <Link to='/'>Profile</Link>
      </Menu.Item>
      <Menu.Item key='2' icon={<SettingOutlined />}>
        <Link to='/'>Setting</Link>
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<LogoutOutlined />}
        onClick={() => ""}
      >
        <Link to='/kkkk'>Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='flex min-h-screen'>
      <div
        className={`w-64 bg-gray-900 text-white ${collapsed ? 'collapsed' : ''
          } md:overflow-y-auto`}
      >
        <div className='flex items-center justify-center py-4'>
          {/* <Logo /> */} Deep clean
        </div>
        <Menu
          theme='dark'
          defaultOpenKeys={['13','21','Enquire List']}
          defaultSelectedKeys={['21']}
          mode='inline'
          className='text-sm'
        >

          <SubMenu key={'1'} title='Enquire List' icon={<UserOutlined />}>
            <Menu.Item key="1" icon={<UserOutlined />} >
              <Link to="/dashboard">Enquire List</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={'2'} title='Bookings' icon={<UserOutlined />}>

            <Menu.Item key='21' icon={<UserOutlined />}>
              <Link to='/customers'>
                All Bookings
              </Link>
            </Menu.Item>

            <Menu.Item key='23' icon={<UserOutlined />}>
              <Link to='/book'>Add Book</Link>
            </Menu.Item>

          </SubMenu>

          <SubMenu key={'3'} title='Services' icon={<TeamOutlined />}>
            <Menu.Item key='31' icon={<TeamOutlined />}>
              <Link to='/add-category'>
                All Services
              </Link>
            </Menu.Item>

            <Menu.Item key='32' icon={<TeamOutlined />}>
              <Link to='/'>Add Service</Link>
            </Menu.Item>
          </SubMenu>

        </Menu>
      </div>

      <div className='flex-1 min-h-screen bg-gray-100'>
        <header className='bg-white shadow-md p-4 flex justify-between items-center'>
          <Button
            icon={<MenuOutlined />}
            className='md:hidden'
            onClick={toggleCollapsed}
          />
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{heading}</h2>
          <Dropdown menu={menu}>
            <Avatar size='large' src='../images/team_01.jpg' />
          </Dropdown>
        </header>

        <div>
          <main>{children}</main>
        </div>

        <footer className='text-center bg-white py-4'>
          Deep Cleaning ©{new Date().getFullYear()} Created by vikram
        </footer>
      </div>

    </div>
  );
}

export default Dashboard;
