import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Button,
  Select,
  Modal,
  Form,
  Space,
  Avatar,
  Checkbox,
  notification,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Badge } from '../../../components/badge';
import { useDispatch } from 'react-redux';
import { TaskList, ChangeTask } from '../../../redux/slices/workerSlice';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const TasksList = () => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [isCompleteTaskOpen, setIsCompleteTaskOpen] = useState(false);
  const [form] = Form.useForm();
  const [tasks, settask] = useState([])


  const fetchTaskList = async(statusFilter)=>{
  console.log('statusFilter: ', statusFilter);
      let {payload} = await dispatch(TaskList(statusFilter))
      settask( payload?.data?.data)
  }

  useEffect(()=>{
    let taskLists = async()=>{
      await fetchTaskList()
    } 
    taskLists()
  },[statusFilter, isCompleteTaskOpen])
  

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch =
      task.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
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
    form.validateFields().then(async(values) => {
      values = {...values, _id: selectedTask?._id, status: "completed"}
      const {payload} = await dispatch(ChangeTask(values))
      if(payload?.data?.status){
        notification.success({
          message: "Task Completed",
          placement: "topRight"
        })
      }else{
        notification.error({
          message: "Try After Sometime!",
          placement: "topRight"
        })
      }
      setIsCompleteTaskOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
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
      key: 'serviceDate',
      responsive: ['md'],
      render: (record) => (
        <div>
          {record.date}
          <div className="text-xs text-gray-900">{moment(record.serviceDate).format('YYYY-MM-DD')}</div>
        </div>
      ),
    },
    {
      title: 'Worker',
      dataIndex: ['Worker', 0, 'name'],
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
            <Button type="default" size="small" onClick={() => handleCompleteTask(record)}>
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 relative">
          <SearchOutlined className="absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <FilterOutlined className="text-gray-400" />
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            className="w-full sm:w-[180px]"
          >
            <Option value="all">All Statuses</Option>
            <Option value="assigned">Assigned</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredTasks}
          rowKey="id"
          pagination={false}
          bordered
          className="rounded-md min-w-[720px]"
        />
      </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Task ID</h3>
                  <p>{selectedTask._id}</p>
                </div>
                <div>
                  <h3 className="font-medium">Booking ID</h3>
                  <p>{selectedTask._id}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Client</h3>
                <p>{selectedTask.clientName}</p>
              </div>
              <div>
                <h3 className="font-medium">Service Address</h3>
                <p>{selectedTask.propertyAddress}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Service Type</h3>
                  <p>{selectedTask.service} cleaning</p>
                </div>
                <div>
                  <h3 className="font-medium">Amount</h3>
                  <p>{selectedTask.amount}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Date</h3>
                  <p>{moment(selectedTask.serviceDate).format('YYYY-MM-DD')}</p>
                </div>
                <div>
                  <h3 className="font-medium">Time</h3>
                  <p>{selectedTask.serviceTime}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Worker</h3>
                  <p>{selectedTask.Worker[0].name}</p>
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
                  {selectedTask.worker  ? selectedTask.Worker
                    .split(' ')
                    .map((n) => n[0])
                    .join('') : ''}
                </Avatar>
                <div>
                  <p className="font-medium">{selectedTask.Worker[0].name}</p>
                  <p className="text-sm text-gray-500">Worker assigned to this task</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Task ID</h3>
                  <p>{selectedTask._id}</p>
                </div>
                <div>
                  <h3 className="font-medium">Client</h3>
                  <p>{selectedTask.clientName}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Form.Item name="generateInvoice" valuePropName="checked" initialValue={false}>
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
