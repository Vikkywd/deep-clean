import React, { useState } from 'react';
import { Table, Input, Button, Select, Modal, Form, DatePicker, InputNumber, Space } from 'antd';
import { SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge'; 
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const BookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [form] = Form.useForm();

  // Mock data for bookings
  const bookings = [
    {
      id: 'B-1001',
      client: 'John Smith',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown',
      service: 'Deep Cleaning',
      date: '2025-05-14',
      time: '09:00 AM',
      status: 'pending',
      amount: '$120',
    },
    {
      id: 'B-1002',
      client: 'Sarah Johnson',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Somewhere',
      service: 'Regular Cleaning',
      date: '2025-05-14',
      time: '01:00 PM',
      status: 'assigned',
      amount: '$85',
    },
    {
      id: 'B-1003',
      client: 'Michael Brown',
      phone: '(555) 345-6789',
      address: '789 Pine Rd, Elsewhere',
      service: 'Window Cleaning',
      date: '2025-05-13',
      time: '10:30 AM',
      status: 'completed',
      amount: '$95',
    },
    {
      id: 'B-1004',
      client: 'Emily Davis',
      phone: '(555) 456-7890',
      address: '101 Maple Dr, Nowhere',
      service: 'Deep Cleaning',
      date: '2025-05-13',
      time: '02:00 PM',
      status: 'completed',
      amount: '$150',
    },
    {
      id: 'B-1005',
      client: 'Robert Wilson',
      phone: '(555) 567-8901',
      address: '202 Cedar Ln, Anywhere',
      service: 'Carpet Cleaning',
      date: '2025-05-12',
      time: '11:00 AM',
      status: 'completed',
      amount: '$200',
    },
    {
      id: 'B-1006',
      client: 'Jennifer Lee',
      phone: '(555) 678-9012',
      address: '303 Birch Blvd, Someplace',
      service: 'Regular Cleaning',
      date: '2025-05-15',
      time: '09:30 AM',
      status: 'pending',
      amount: '$90',
    },
    {
      id: 'B-1007',
      client: 'David Miller',
      phone: '(555) 789-0123',
      address: '404 Elm St, Othertown',
      service: 'Move-out Cleaning',
      date: '2025-05-16',
      time: '10:00 AM',
      status: 'pending',
      amount: '$250',
    },
  ];

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
          <div className="text-xs text-gray-500 md:hidden">{record.address}</div>
          <div className="text-xs text-gray-500 md:hidden">
            {record.date} at {record.time}
          </div>
        </div>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['md'],
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          variant={
            status === 'completed' ? 'success' : status === 'assigned' ? 'outline' : 'secondary'
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
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: () => (
        <Button type="link" size="small">
          View
        </Button>
      ),
    },
  ];

  const handleCreateBooking = () => {
    form.validateFields().then((values) => {
      console.log('New Booking:', values);
      setIsNewBookingOpen(false);
      form.resetFields();
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
          <p className="text-gray-500">Manage client bookings and service requests</p>
        </div>
        <Button type="primary" onClick={() => setIsNewBookingOpen(true)}>
          <PlusOutlined className="mr-2" />
          New Booking
        </Button>
      </div>

      <Modal
        title="Create New Booking"
        visible={isNewBookingOpen}
        onCancel={() => setIsNewBookingOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="clientName"
              label="Client Name"
              rules={[{ required: true, message: 'Please enter client name' }]}
            >
              <Input placeholder="Enter client name" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="(555) 123-4567" />
            </Form.Item>
          </div>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter service address' }]}
          >
            <Input placeholder="Enter service address" />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="service"
              label="Service Type"
              rules={[{ required: true, message: 'Please select a service' }]}
            >
              <Select placeholder="Select service">
                <Option value="regular">Regular Cleaning</Option>
                <Option value="deep">Deep Cleaning</Option>
                <Option value="window">Window Cleaning</Option>
                <Option value="carpet">Carpet Cleaning</Option>
                <Option value="moveout">Move-out Cleaning</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="serviceDate"
              label="Service Date"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker
                className="w-full"
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current < moment().startOf('day')}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="serviceTime"
              label="Service Time"
              rules={[{ required: true, message: 'Please select a time' }]}
            >
              <Select placeholder="Select time">
                <Option value="9am">9:00 AM</Option>
                <Option value="10am">10:00 AM</Option>
                <Option value="11am">11:00 AM</Option>
                <Option value="12pm">12:00 PM</Option>
                <Option value="1pm">1:00 PM</Option>
                <Option value="2pm">2:00 PM</Option>
                <Option value="3pm">3:00 PM</Option>
                <Option value="4pm">4:00 PM</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="amount"
              label="Amount ($)"
              rules={[{ required: true, message: 'Please enter amount' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                placeholder="0.00"
                className="w-full"
              />
            </Form.Item>
          </div>
          <Form.Item name="notes" label="Additional Notes">
            <TextArea placeholder="Enter any special instructions or requirements" rows={4} />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsNewBookingOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create Booking
            </Button>
          </div>
        </Form>
      </Modal>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 relative">
          <SearchOutlined className="absolute left-2.5 top-2.5 text-gray-400" />
          <Input
            placeholder="Search bookings..."
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
            <Option value="pending">Pending</Option>
            <Option value="assigned">Assigned</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredBookings}
        rowKey="id"
        pagination={false}
        bordered
        className="rounded-md"
      />
    </div>
  );
};

export default BookingsPage;