import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Modal, Space, notification } from 'antd';
import { SearchOutlined, FilterOutlined, DownloadOutlined, PrinterOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge';
import { useDispatch } from 'react-redux';
import { TaskNotPending } from '../../../redux/slices/workerSlice';

const { Option } = Select;

const Invoice = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);
  // const [invoices, setInvoices] = useState([])
   const invoices = [
    {
      id: 'INV-1001',
      client: 'John Smith',
      email: 'john.smith@example.com',
      taskId: 'T-1003',
      service: 'Window Cleaning',
      date: '2025-05-13',
      amount: '95',
      status: 'paid',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-1002',
      client: 'Emily Davis',
      email: 'emily.davis@example.com',
      taskId: 'T-1004',
      service: 'Deep Cleaning',
      date: '2025-05-13',
      amount: '$150',
      status: 'paid',
      paymentMethod: 'Cash',
    },
    {
      id: 'INV-1003',
      client: 'Robert Wilson',
      email: 'robert.wilson@example.com',
      taskId: 'T-1005',
      service: 'Carpet Cleaning',
      date: '2025-05-12',
      amount: '200',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'INV-1004',
      client: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      taskId: 'T-1002',
      service: 'Regular Cleaning',
      date: '2025-05-14',
      amount: '85',
      status: 'pending',
      paymentMethod: 'Online Payment',
    },
    {
      id: 'INV-1005',
      client: 'Michael Brown',
      email: 'michael.brown@example.com',
      taskId: 'T-1008',
      service: 'Move-out Cleaning',
      date: '2025-05-10',
      amount: '250',
      status: 'overdue',
      paymentMethod: 'Credit Card',
    },
  ];

  let getInvoice = async()=>{
    let {payload} = await dispatch(TaskNotPending());
    console.log('payload: +++', payload?.data?.data);

  }

  useEffect(()=>{
    getInvoice()
  },[])


  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailsOpen(true);
  };

  const paymentLink = (invoice)=>{
    const url = `http://localhost:5173/payment/${invoice.id}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
      console.log('url: ', url);
      notification.success({
        message: "Payment link copied to clipboard!",
        placement: 'topRight'
      })
        // message.success('Payment link copied to clipboard!');
      }).catch((err) => {
      console.log('err: ', err);
        notification.error({
          message: "Failed!",
          placement: 'topRight'
        })      
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        message.success('Payment link copied to clipboard!');
      } catch (err) {
        message.error('Failed to copy the link.');
      }
      document.body.removeChild(textArea);
    }
  }

  const columns = [
    {
      title: 'Invoice ID',
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
          <div className="text-xs text-gray-500 md:hidden">{record.date}</div>
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      responsive: ['md'],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          variant={status === 'paid' ? 'success' : status === 'pending' ? 'outline' : 'destructive'}
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
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewInvoice(record)}
            aria-label="View"
          />
          <Button type="text" icon={<DownloadOutlined />} aria-label="Download" />
          <Button type="text" icon={<PrinterOutlined />} aria-label="Print" />
          <Button onClick={()=>paymentLink(record)} type="text" icon={<LinkOutlined  />} aria-label="Payment Link" />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
        <p className="text-gray-500">Manage and track client invoices and payments</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 relative">
          <SearchOutlined className="absolute left-2.5 top-2.5 text-gray-400" />
          <Input
            placeholder="Search invoices..."
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
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="overdue">Overdue</Option>
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredInvoices}
        rowKey="id"
        pagination={false}
        bordered
        className="rounded-md"
      />

      {/* Invoice Details Modal */}
      <Modal
        title={null}
        open={isInvoiceDetailsOpen}
        onCancel={() => setIsInvoiceDetailsOpen(false)}
        footer={null}
        width={760}
      >
        {selectedInvoice && (
          <div className="space-y-8 p-4 text-gray-800 dark:text-gray-100">
            {/* Header */}
            <div className="flex justify-between border-b pb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">CleanPro Services</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">123 Cleaning Street, Suite 100</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sparkle City, SC 12345</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">contact@cleanpro.example.com</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">INVOICE</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">#{selectedInvoice.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date: {selectedInvoice.date}</p>
                <div className="mt-2">
                  <Badge
                    variant={
                      selectedInvoice.status === 'paid'
                        ? 'success'
                        : selectedInvoice.status === 'pending'
                          ? 'outline'
                          : 'destructive'
                    }
                    className="capitalize"
                  >
                    {selectedInvoice.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Bill To - Enhanced Dark Look */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h4 className="text-base font-semibold text-gray-700 dark:text-gray-100 mb-2">Bill To</h4>
              <p className="text-sm text-gray-800 dark:text-gray-200">{selectedInvoice.client}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedInvoice.email}</p>
            </div>

            {/* Items Table */}
            <Table
              className="text-sm"
              columns={[
                {
                  title: <span className="text-gray-600 dark:text-gray-300 font-medium">Description</span>,
                  dataIndex: 'description',
                  key: 'description',
                },
                {
                  title: <span className="text-gray-600 dark:text-gray-300 font-medium">Amount</span>,
                  dataIndex: 'amount',
                  key: 'amount',
                  align: 'right',
                  render: (amount) => <span className="text-gray-800 dark:text-gray-200">${amount}</span>,
                },
              ]}
              dataSource={[
                {
                  key: 'service',
                  description: `${selectedInvoice.service} (Task ID: ${selectedInvoice.taskId})`,
                  amount: selectedInvoice.amount,
                },
                {
                  key: 'total',
                  description: <strong>Total</strong>,
                  amount: <strong className="text-gray-900 dark:text-white">{selectedInvoice.amount}</strong>,
                },
              ]}
              pagination={false}
              bordered
            />

            {/* Payment Info */}
            <div className="border-b pb-4">
              <h4 className="text-base font-semibold text-gray-700 dark:text-gray-100 mb-1">Payment Information:</h4>
              <p className="text-sm">
                <span className="font-medium">Method:</span> {selectedInvoice.paymentMethod}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                {selectedInvoice.status === 'paid'
                  ? 'Paid in full'
                  : selectedInvoice.status === 'pending'
                    ? 'Payment pending'
                    : 'Payment overdue'}
              </p>
            </div>

            {/* Footer Note */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4 border-t">
              <p>Thank you for your business!</p>
              <p>
                Questions? Contact us at{' '}
                <a href="mailto:support@cleanpro.example.com" className="underline text-blue-600 dark:text-blue-400">
                  support@cleanpro.example.com
                </a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <Space>
                <Button icon={<DownloadOutlined />}>Download</Button>
                <Button icon={<PrinterOutlined />}>Print</Button>
              </Space>
              <Button type="primary" onClick={() => setIsInvoiceDetailsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>



    </div>
  );
};

export default Invoice;