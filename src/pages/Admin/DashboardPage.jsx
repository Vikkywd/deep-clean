import React, { useState } from 'react';
import {
  Card,
  Table,
  Tabs,
  Button,
  Space,
  Statistic,
  Row,
  Col,
  Avatar,
} from 'antd';
import {
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../components/badge';
import 'tailwindcss/tailwind.css';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Bookings',
      value: '128',
      icon: <CalendarOutlined className="text-gray-500" />,
      change: '+14%',
      trend: 'up',
    },
    {
      title: 'Active Workers',
      value: '12',
      icon: <UserOutlined className="text-gray-500" />,
      change: '+2',
      trend: 'up',
    },
    {
      title: 'Pending Tasks',
      value: '23',
      icon: <UserOutlined className="text-gray-500" />,
      change: '-5',
      trend: 'down',
    },
    {
      title: 'Revenue (Monthly)',
      value: '$12,450',
      icon: <DollarOutlined className="text-gray-500" />,
      change: '+18%',
      trend: 'up',
    },
  ];

  const recentBookings = [
    {
      id: 'B-1001',
      client: 'John Smith',
      service: 'Deep Cleaning',
      date: '2025-05-14',
      status: 'pending',
      amount: '$120',
    },
    {
      id: 'B-1002',
      client: 'Sarah Johnson',
      service: 'Regular Cleaning',
      date: '2025-05-14',
      status: 'assigned',
      amount: '$85',
    },
    {
      id: 'B-1003',
      client: 'Michael Brown',
      service: 'Window Cleaning',
      date: '2025-05-13',
      status: 'completed',
      amount: '$95',
    },
    {
      id: 'B-1004',
      client: 'Emily Davis',
      service: 'Deep Cleaning',
      date: '2025-05-13',
      status: 'completed',
      amount: '$150',
    },
    {
      id: 'B-1005',
      client: 'Robert Wilson',
      service: 'Carpet Cleaning',
      date: '2025-05-12',
      status: 'completed',
      amount: '$200',
    },
  ];

  const topWorkers = [
    {
      name: 'David Miller',
      tasks: 24,
      rating: 4.9,
      earnings: '$2,450',
    },
    {
      name: 'Lisa Chen',
      tasks: 22,
      rating: 4.8,
      earnings: '$2,310',
    },
    {
      name: 'James Wilson',
      tasks: 19,
      rating: 4.7,
      earnings: '$1,980',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          variant={
            status === 'completed'
              ? 'success'
              : status === 'assigned'
              ? 'outline'
              : 'secondary'
          }
        >
          {status}
        </Badge>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
    },
  ];

  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: (
        <>
          <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <Statistic
                    title={
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {stat.title}
                        </span>
                        {stat.icon}
                      </div>
                    }
                    value={stat.value}
                    valueStyle={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                    }}
                    suffix={
                      <span
                        className={`text-xs ${
                          stat.trend === 'up'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {stat.change} from last month
                      </span>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} lg={16}>
              <Card title="Recent Bookings">
                <Table
                  columns={columns}
                  dataSource={recentBookings}
                  pagination={false}
                  rowKey="id"
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    type="link"
                    onClick={() => navigate('/dashboard/bookings')}
                  >
                    View all bookings
                    <RightOutlined className="ml-1" />
                  </Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Top Performing Workers">
                <div className="space-y-4">
                  {topWorkers.map((worker, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar
                          icon={<UserOutlined />}
                          className="bg-blue-100 text-blue-600"
                        />
                        <div>
                          <p className="text-sm font-medium">{worker.name}</p>
                          <p className="text-xs text-gray-500">
                            {worker.tasks} tasks completed
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">{worker.earnings}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="mr-1 text-green-500">✓</span>
                          {worker.rating}/5
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    type="link"
                    onClick={() => navigate('/dashboard/workers')}
                  >
                    View all workers
                    <RightOutlined className="ml-1" />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: 'analytics',
      label: 'Analytics',
      children: (
        <Card title="Analytics">
          <div className="h-[300px] flex items-center justify-center border rounded-md">
            <p className="text-gray-500">Analytics charts will be displayed here</p>
          </div>
        </Card>
      ),
    },
    {
      key: 'reports',
      label: 'Reports',
      children: (
        <Card title="Reports">
          <div className="h-[300px] flex items-center justify-center border rounded-md">
            <p className="text-gray-500">Reports will be displayed here</p>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-gray-500">
            Overview of your cleaning service business
          </p>
        </div>
        <Button type="primary" onClick={() => navigate('/dashboard/bookings')}>
          <CalendarOutlined className="mr-2" />
          New Booking
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </div>
  );
};

export default DashboardPage;
