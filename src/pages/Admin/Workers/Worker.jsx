import React, { useState } from 'react';
import { Card, Input, Button, Modal, Form, Select, Space, Avatar, Rate } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge'; 
import 'tailwindcss/tailwind.css';

const { Option } = Select;

const WorkersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewWorkerOpen, setIsNewWorkerOpen] = useState(false);
  const [form] = Form.useForm();

  // Mock data for workers
  const workers = [
    {
      id: 'W-1001',
      name: 'David Miller',
      email: 'david.miller@example.com',
      phone: '(555) 123-4567',
      specialties: ['Deep Cleaning', 'Window Cleaning'],
      rating: 4.9,
      status: 'active',
      tasksCompleted: 245,
      joinDate: '2023-01-15',
    },
    {
      id: 'W-1002',
      name: 'Lisa Chen',
      email: 'lisa.chen@example.com',
      phone: '(555) 234-5678',
      specialties: ['Regular Cleaning', 'Move-out Cleaning'],
      rating: 4.8,
      status: 'active',
      tasksCompleted: 198,
      joinDate: '2023-02-20',
    },
    {
      id: 'W-1003',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      phone: '(555) 345-6789',
      specialties: ['Carpet Cleaning', 'Deep Cleaning'],
      rating: 4.7,
      status: 'active',
      tasksCompleted: 176,
      joinDate: '2023-03-10',
    },
    {
      id: 'W-1004',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '(555) 456-7890',
      specialties: ['Regular Cleaning', 'Window Cleaning'],
      rating: 4.6,
      status: 'active',
      tasksCompleted: 152,
      joinDate: '2023-04-05',
    },
    {
      id: 'W-1005',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '(555) 567-8901',
      specialties: ['Deep Cleaning', 'Move-out Cleaning'],
      rating: 4.5,
      status: 'inactive',
      tasksCompleted: 120,
      joinDate: '2023-05-15',
    },
    {
      id: 'W-1006',
      name: 'Jennifer Lee',
      email: 'jennifer.lee@example.com',
      phone: '(555) 678-9012',
      specialties: ['Regular Cleaning', 'Carpet Cleaning'],
      rating: 4.9,
      status: 'active',
      tasksCompleted: 135,
      joinDate: '2023-06-20',
    },
  ];

  // Filter workers based on search query
  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddWorker = () => {
    form.validateFields().then((values) => {
      console.log('New Worker:', values);
      setIsNewWorkerOpen(false);
      form.resetFields();
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workers</h2>
          <p className="text-gray-500">Manage your cleaning service professionals</p>
        </div>
        <Button type="primary" onClick={() => setIsNewWorkerOpen(true)}>
          <PlusOutlined className="mr-2" />
          Add Worker
        </Button>
      </div>

      <Modal
        title="Add New Worker"
        open={isNewWorkerOpen}
        onCancel={() => setIsNewWorkerOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAddWorker}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter full name' }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="email@example.com" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="(555) 123-4567" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
              initialValue="active"
            >
              <Select placeholder="Select status">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            name="specialties"
            label="Specialties"
            rules={[{ required: true, message: 'Please select at least one specialty' }]}
          >
            <Select mode="multiple" placeholder="Select specialties">
              <Option value="regular">Regular Cleaning</Option>
              <Option value="deep">Deep Cleaning</Option>
              <Option value="window">Window Cleaning</Option>
              <Option value="carpet">Carpet Cleaning</Option>
              <Option value="moveout">Move-out Cleaning</Option>
            </Select>
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsNewWorkerOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Worker
            </Button>
          </div>
        </Form>
      </Modal>

      <div className="relative">
        <SearchOutlined className="absolute left-2.5 top-2.5 text-gray-400" />
        <Input
          placeholder="Search workers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 w-full md:w-1/3 rounded-lg"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkers.map((worker) => (
          <Card
            key={worker.id}
            className="shadow-md hover:shadow-lg transition-shadow"
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar src="/placeholder-user.jpg">
                    {worker.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </Avatar>
                  <div>
                    <div className="text-base font-semibold">{worker.name}</div>
                    <div className="text-sm text-gray-500">{worker.email}</div>
                  </div>
                </div>
                <Badge variant={worker.status === 'active' ? 'success' : 'secondary'}>
                  {worker.status}
                </Badge>
              </div>
            }
          >
            <div className="p-4">
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="font-medium">ID:</span> {worker.id}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {worker.phone}
                </div>
                <div>
                  <span className="font-medium">Specialties:</span> {worker.specialties.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Tasks Completed:</span> {worker.tasksCompleted}
                </div>
                <div>
                  <span className="font-medium">Joined:</span> {worker.joinDate}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-1">Rating:</span>
                  <Rate disabled allowHalf value={worker.rating} className="text-sm" />
                </div>
              </div>
            </div>
            <div className="flex justify-between p-4 pt-0">
              <Button type="default">View Details</Button>
              <Button type="primary">Assign Task</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkersPage;