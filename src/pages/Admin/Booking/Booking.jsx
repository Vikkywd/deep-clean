import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Modal } from 'antd';
import { SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge'; 
import BookingForm from './BookingForm';
import { useDispatch, useSelector } from 'react-redux';
import { AllBooking } from '../../../redux/slices/bookingSlice';


const { Option } = Select;



const BookingsPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [bookings, setBookingData] =  useState([]);
  const [bookingStatus, setBookingStatus] = useState('')



  const allBooking = async()=>{
      const {payload} =  await dispatch(AllBooking(bookingStatus))
      let allBookData =  payload?.data?.data
      return allBookData;
      // const bookings = useSelector(state=>state.booking.allBookings);
  }
  useEffect( ()=>{
    setBookingStatus('pending');
    const fetchBookings = async () => {
      const allData = await allBooking(bookingStatus); 
      setBookingData(allData || []); 
    }
    fetchBookings()
  },[bookingStatus])


  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch =
      booking?.clientName.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      booking?._id.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      booking?.propertyAddress.toLowerCase().includes(searchQuery?.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
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
      dataIndex: 'propertyAddress',
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
      key: 'serviceDate',
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



  

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Bookings</h2>
          <p className="text-sm sm:text-base text-gray-500">Manage client bookings and service requests</p>
        </div>
        <Button type="primary" onClick={() => setIsNewBookingOpen(true)}>
          <PlusOutlined className="mr-2" />
          New Booking
        </Button>
      </div>

      <Modal
        title="Create New Booking"
        open={isNewBookingOpen}
        onCancel={() => setIsNewBookingOpen(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: 600 }}
      >
      <BookingForm  onClose={() => setIsNewBookingOpen(false)}/>
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
          <Select value={statusFilter} onChange={setStatusFilter} className="w-[180px]">
            <Option value="all">All Statuses</Option>
            <Option value="pending">Pending</Option>
            <Option value="assigned">Assigned</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="id"
          pagination={false}
          bordered
          className="rounded-md min-w-[700px]"
        />
      </div>
    </div>
  );
};

export default BookingsPage;
