import React, { useState } from 'react';
import { Table, Input, Button, Select, Modal, Form, Space, Avatar, Checkbox } from 'antd';
import { SearchOutlined, FilterOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge';

const { Option } = Select;
const { TextArea } = Input;

const TasksList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [isCompleteTaskOpen, setIsCompleteTaskOpen] = useState(false);
  const [form] = Form.useForm();

  // Mock data for tasks
  const tasks = [
    {
      id: 'T-1001',
      bookingId: 'B-1001',
      client: 'John Smith',
      address: '123 Main St, Anytown',
      service: 'Deep Cleaning',
      date: '2025-05-14',
      time: '09:00 AM',
      worker: 'David Miller',
      status: 'assigned',
      amount: '$120',
    },
    {
      id: 'T-1002',
      bookingId: 'B-1002',
      client: 'Sarah Johnson',
      address: '456 Oak Ave, Somewhere',
      service: 'Regular Cleaning',
      date: '2025-05-14',
      time: '01:00 PM',
      worker: 'Lisa Chen',
      status: 'in-progress',
      amount: '$85',
    },
    {
      id: 'T-1003',
      bookingId: 'B-1003',
      client: 'Michael Brown',
      address: '789 Pine Rd, Elsewhere',
      service: 'Window Cleaning',
      date: '2025-05-13',
      time: '10:30 AM',
      worker: 'James Wilson',
      status: 'completed',
      amount: '$95',
    },
    {
      id: 'T-1004',
      bookingId: 'B-1004',
      client: 'Emily Davis',
      address: '101 Maple Dr, Nowhere',
      service: 'Deep Cleaning',
      date: '2025-05-13',
      time: '02:00 PM',
      worker: 'Maria Rodriguez',
      status: 'completed',
      amount: '$150',
    },
    {
      id: 'T-1005',
      bookingId: 'B-1005',
      client: 'Robert Wilson',
      address: '202 Cedar Ln, Anywhere',
      service: 'Carpet Cleaning',
      date: '2025-05-12',
      time: '11:00 AM',
      worker: 'Jennifer Lee',
      status: 'completed',
      amount: '$200',
    },
    {
      id: 'T-1006',
      bookingId: 'B-1006',
      client: 'Jennifer Lee',
      address: '303 Birch Blvd, Someplace',
      service: 'Regular Cleaning',
      date: '2025-05-15',
      time: '09:30 AM',
      worker: 'Unassigned',
      status: 'unassigned',
      amount: '$90',
    },
    {
      id: 'T-1007',
      bookingId: 'B-1007',
      client: 'David Miller',
      address: '404 Elm St, Othertown',
      service: 'Move-out Cleaning',
      date: '2025-05-16',
      time: '10:00 AM',
      worker: 'Unassigned',
      status: 'unassigned',
      amount: '$250',
    },
  ];

  // Mock data for workers to assign
  const workers = [
    { id: 'W-1001', name: 'David Miller' },
    { id: 'W-1002', name: 'Lisa Chen' },
    { id: 'W-1003', name: 'James Wilson' },
    { id: 'W-1004', name: 'Maria Rodriguez' },
    { id: 'W-1005', name: 'Robert Johnson' },
    { id: 'W-1006', name: 'Jennifer Lee' },
  ];

  // Filter tasks based on search query and status filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleCompleteTask = (task) => {
    setSelectedTask(task);
    setIsCompleteTaskOpen(true);
  };

  const handleAssignWorker = () => {
    form.validateFields().then((values) => {
      console.log('Assigned Worker:', values);
      setIsTaskDetailsOpen(false);
      form.resetFields();
    });
  };

  const handleMarkComplete = () => {
    form.validateFields().then((values) => {
      console.log('Completed Task:', values);
      setIsCompleteTaskOpen(false);
      form.resetFields();
    });
  };

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
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div className="text-xs text-gray-500 md:hidden">{record.service}</div>
          <div className="text-xs text-gray-500 md:hidden">
            {record.date} at {record.time}
          </div>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      responsive: ['md'],
    },
    {
      title: 'Date & Time',
      key: 'dateTime',
      responsive: ['md'],
      render: (record) => (
        <div>
          {record.date}
          <div className="text-xs text-gray-500">{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Worker',
      dataIndex: 'worker',
      key: 'worker',
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
              : status === 'in-progress'
                ? 'default'
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
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (record) => (
        <Space>
          <Button type="link" size="small" onClick={() => handleViewTask(record)}>
            View
          </Button>
          {record.status !== 'completed' && (
            <Button
              type="default"
              size="small"
              onClick={() => handleCompleteTask(record)}
            >
              Complete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
        <p className="text-gray-500">Manage and assign cleaning tasks to your workers</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 relative">
          <SearchOutlined className="absolute left-2.5 top-2.5 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterOutlined className="text-gray-400" />
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            className="w-[180px]"
          >
            <Option value="all">All Statuses</Option>
            <Option value="unassigned">Unassigned</Option>
            <Option value="assigned">Assigned</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        pagination={false}
        bordered
        className="rounded-md"
      />

      {/* Task Details Modal */}
      <Modal
        title="Task Details"
        open={isTaskDetailsOpen}
        onCancel={() => setIsTaskDetailsOpen(false)}
        footer={null}
        width={600}
      >
        {selectedTask && (
          <Form form={form} layout="vertical" onFinish={handleAssignWorker}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Task ID</h3>
                  <p>{selectedTask.id}</p>
                </div>
                <div>
                  <h3 className="font-medium">Booking ID</h3>
                  <p>{selectedTask.bookingId}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Client</h3>
                <p>{selectedTask.client}</p>
              </div>
              <div>
                <h3 className="font-medium">Service Address</h3>
                <p>{selectedTask.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Service Type</h3>
                  <p>{selectedTask.service}</p>
                </div>
                <div>
                  <h3 className="font-medium">Amount</h3>
                  <p>{selectedTask.amount}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Date</h3>
                  <p>{selectedTask.date}</p>
                </div>
                <div>
                  <h3 className="font-medium">Time</h3>
                  <p>{selectedTask.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Worker</h3>
                  <p>{selectedTask.worker}</p>
                </div>
                <div>
                  <h3 className="font-medium">Status</h3>
                  <Badge
                    variant={
                      selectedTask.status === 'completed'
                        ? 'success'
                        : selectedTask.status === 'in-progress'
                          ? 'default'
                          : selectedTask.status === 'assigned'
                            ? 'outline'
                            : 'secondary'
                    }
                  >
                    {selectedTask.status}
                  </Badge>
                </div>
              </div>
              {selectedTask.status === 'unassigned' && (
                <Form.Item
                  name="worker"
                  label="Assign Worker"
                  rules={[{ required: true, message: 'Please select a worker' }]}
                >
                  <Select placeholder="Select worker">
                    {workers.map((worker) => (
                      <Option key={worker.id} value={worker.id}>
                        {worker.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setIsTaskDetailsOpen(false)}>Close</Button>
              {selectedTask.status === 'unassigned' && (
                <Button type="primary" htmlType="submit">
                  Assign Worker
                </Button>
              )}
            </div>
          </Form>
        )}
      </Modal>

      {/* Complete Task Modal */}
      <Modal
        title="Complete Task"
        open={isCompleteTaskOpen}
        onCancel={() => setIsCompleteTaskOpen(false)}
        footer={null}
        width={600}
      >
        {selectedTask && (
          <Form form={form} layout="vertical" onFinish={handleMarkComplete}>
            <div className="grid gap-4">
              <div className="flex items-center space-x-4">
                <Avatar src="/placeholder-user.jpg">
                  {selectedTask.worker
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar>
                <div>
                  <p className="font-medium">{selectedTask.worker}</p>
                  <p className="text-sm text-gray-500">Worker assigned to this task</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Task ID</h3>
                  <p>{selectedTask.id}</p>
                </div>
                <div>
                  <h3 className="font-medium">Client</h3>
                  <p>{selectedTask.client}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Service</h3>
                  <p>{selectedTask.service}</p>
                </div>
                <div>
                  <h3 className="font-medium">Amount Due</h3>
                  <p className="font-bold">{selectedTask.amount}</p>
                </div>
              </div>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: 'Please select a payment method' }]}
                initialValue="cash"
              >
                <Select placeholder="Select payment method">
                  <Option value="cash">Cash</Option>
                  <Option value="credit">Credit Card</Option>
                  <Option value="bank">Bank Transfer</Option>
                  <Option value="online">Online Payment</Option>
                </Select>
              </Form.Item>
              <Form.Item name="completionNotes" label="Completion Notes">
                <TextArea placeholder="Enter any notes about the completed service" rows={4} />
              </Form.Item>
              <Form.Item
                name="generateInvoice"
                valuePropName="checked"
                initialValue={false}
              >
                <Checkbox>Generate invoice for client</Checkbox>
              </Form.Item>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setIsCompleteTaskOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                <CheckCircleOutlined className="mr-2" />
                Mark as Completed
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TasksList;