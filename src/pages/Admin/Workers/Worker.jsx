import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Modal, Form, Select, Space, Avatar, Rate, notification, Table } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge';
import { useDispatch, useSelector } from 'react-redux';
import { AddWorker, WorkerList, AssignTask, WorkerTaskList } from '../../../redux/slices/workerSlice';
import { AllBooking } from '../../../redux/slices/bookingSlice';
import moment from 'moment';

const { Option } = Select;

const WorkersPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewWorkerOpen, setIsNewWorkerOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [assignForm] = Form.useForm();
  const [workerForm] = Form.useForm();
  const bookingList = useSelector(state => state.booking.allBookings);
  const [bookings, setBookings] = useState(bookingList  || []);

  const [workerTasks, setWorkerTasks] = useState([]);




  // Fetch workers
  const getWorkerList = async () => {
    const { payload } = await dispatch(WorkerList());
    setWorkers(payload?.data?.data || []);
  };

  // // Fetch bookings
  const getBookingList = async () => {
    const { payload } = await dispatch(AllBooking());
    const all = payload?.data?.data || [];
    setBookings(all.filter(b => b.status === 'assigned' || b.status === 'pending'));
  };

  useEffect(() => {
    getWorkerList();
    if(!bookingList.length){
    getBookingList();
    }
  }, []);

  // Filter workers
  
const filteredWorkers = workers
.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase()))
.map(w => ({
  ...w,
  clean: w.specialties.map(s => `${s} cleaning`).join(', ')
}));


  // Handle add worker
  const handleAddWorker = () => {
    workerForm.validateFields().then(async values => {
      const { payload } = await dispatch(AddWorker(values));
      if (payload?.data?.success) {
        notification.success({ message: 'Worker Added Successfully!' });
        workerForm.resetFields();
        setIsNewWorkerOpen(false);
        await getWorkerList();
      } else {
        notification.error({ message: 'Try Again!' });
      }
    });
  };

  // Open assign task modal
  const openAssignModal = (worker) => {
    setSelectedWorker(worker);
    setIsAssignModalOpen(true);
    selectedWorkerTask(worker._id)
  };

  const selectedWorkerTask = async (workerId) => {
    const { payload } = await dispatch(WorkerTaskList(workerId));
    setWorkerTasks(payload?.data?.data || [] )
  }

  // Handle assign task submit
  const handleAssignTask = () => {
    assignForm.validateFields().then(async values => {
      const payload = {
        workerEmail: selectedWorker.email,
        workerId: selectedWorker._id,
        bookingId: values.bookingId,
        status: "assigned"
      };
      const result = await dispatch(AssignTask(payload));
      if (result.payload?.data?.success) {
        notification.success({ message: 'Task assigned!' });
        setIsAssignModalOpen(false);
        assignForm.resetFields();
        await getBookingList();
        await getWorkerList();
      } else {
        notification.error({ message: 'Assignment failed!' });
      }
    });
  };

  // Columns for booking table
  const bookingColumns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    { title: 'Client', dataIndex: 'clientName', key: 'client' },
    {
      title: 'Date', dataIndex: 'serviceDate', key: 'serviceDate',
      render: date => moment(date).format('DD-MM-YYYY'),
    },
    { title: 'Time', dataIndex: 'serviceTime', key: 'serviceTime' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => <Badge variant={status === 'assigned' ? 'outline' : 'secondary'}>{status}</Badge> },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workers</h2>
          <p className="text-gray-500">Manage your cleaning service professionals</p>
        </div>
        <Button type="primary" onClick={() => setIsNewWorkerOpen(true)}>
          <PlusOutlined className="mr-2" /> Add Worker
        </Button>
      </div>

      {/* Add Worker Modal */}
      <Modal
        title="Add New Worker"
        open={isNewWorkerOpen}
        onCancel={() => setIsNewWorkerOpen(false)}
        footer={null}
      >
        <Form form={workerForm} layout="vertical" onFinish={handleAddWorker}>
          <Space direction="vertical" className="w-full">
            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}> <Input /> </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}> <Input /> </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}> <Input /> </Form.Item>
            <Form.Item name="status" label="Status" initialValue="active">
              <Select> <Option value="active">Active</Option> <Option value="inactive">Inactive</Option> </Select>
            </Form.Item>
            <Form.Item name="specialties" label="Specialties" rules={[{ required: true }]}>
              <Select mode="multiple">
                <Option value="regular">Regular Cleaning</Option>
                <Option value="deep">Deep Cleaning</Option>
                <Option value="window">Window Cleaning</Option>
                <Option value="carpet">Carpet Cleaning</Option>
                <Option value="moveout">Move-out Cleaning</Option>
              </Select>
            </Form.Item>
            <Space className="flex justify-end">
              <Button onClick={() => setIsNewWorkerOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Add Worker</Button>
            </Space>
          </Space>
        </Form>
      </Modal>

      {/* Assign Task Modal */}
      <Modal
        title={selectedWorker ? `Assign Task to ${selectedWorker.name}` : 'Assign Task'}
        open={isAssignModalOpen}
        onCancel={() => setIsAssignModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form form={assignForm} layout="vertical" onFinish={handleAssignTask}>
          <Form.Item name="bookingId" label="Select Booking" rules={[{ required: true }]}>
            <Select placeholder="Choose a booking">
              {bookings?.map(b => (
                <Option key={b._id} value={b._id}>
                  {b.clientName}&nbsp;(
                  {moment(b.serviceDate).format('DD-MM-YYYY')} – {b.serviceTime}
                  )
                </Option>))}
            </Select>
          </Form.Item>
          <Space className="flex justify-end">
            <Button onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Assign</Button>
          </Space>
        </Form>
        <Table
          columns={bookingColumns}
          dataSource={workerTasks}
          rowKey="_id"
          pagination={false}
          className="mt-4"
        />
      </Modal>

      {/* Search Input */}
      <div className="relative">
        <SearchOutlined className="absolute left-2.5 top-2.5 text-gray-400" />
        <Input
          placeholder="Search workers..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-8 w-full md:w-1/3 rounded-lg"
        />
      </div>

      {/* Workers Grid */}
      {bookings ?
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredWorkers.map(worker => (
        <Card
          key={worker._id}
          className="shadow-md hover:shadow-lg transition-shadow"
          title={
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>{worker.name.charAt(0)}</Avatar>
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
            <div className="text-sm space-y-1">
              <div><strong>ID:</strong> {worker._id}</div>
              <div><strong>Phone:</strong> {worker.phone}</div>
              <div><strong>Specialties:</strong> {worker.clean}</div>
              <div><strong>Tasks Completed:</strong> {worker.tasks_completed}</div>
              <div><strong>Joined:</strong> {worker.joined}</div>
              <div className="flex items-center"><strong>Rating:</strong><Rate disabled allowHalf value={worker.rating} className="ml-1" /></div>
            </div>
          </div>
          <div className="flex justify-between p-4 pt-0">
            <Button onClick={() => openAssignModal(worker)}>Assign Task</Button>
            <Button type="default">View Details</Button>
          </div>
        </Card>
      ))}
    </div> :
    <div>Loading...</div>
    }
      
    </div>
  );
};

export default WorkersPage;
