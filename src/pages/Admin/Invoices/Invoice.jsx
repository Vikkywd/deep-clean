import React, { useState } from 'react';
import { Table, Input, Button, Select, Modal, Space } from 'antd';
import { SearchOutlined, FilterOutlined, DownloadOutlined, PrinterOutlined, EyeOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge'; 

const { Option } = Select;

const Invoice = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);

  const invoices = [
    {
      id: 'INV-1001',
      client: 'John Smith',
      email: 'john.smith@example.com',
      taskId: 'T-1003',
      service: 'Window Cleaning',
      date: '2025-05-13',
      amount: '$95',
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
      amount: '$200',
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
      amount: '$85',
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
      amount: '$250',
      status: 'overdue',
      paymentMethod: 'Credit Card',
    },
  ];

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
        title="Invoice Details"
        open={isInvoiceDetailsOpen}
        onCancel={() => setIsInvoiceDetailsOpen(false)}
        footer={null}
        width={700}
      >
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold">CleanPro Services</h3>
                <p className="text-gray-500">123 Cleaning Street, Suite 100</p>
                <p className="text-gray-500">Sparkle City, SC 12345</p>
                <p className="text-gray-500">contact@cleanpro.example.com</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold">INVOICE</h3>
                <p className="font-medium">{selectedInvoice.id}</p>
                <p className="text-gray-500">Date: {selectedInvoice.date}</p>
                <Badge
                  variant={
                    selectedInvoice.status === 'paid'
                      ? 'success'
                      : selectedInvoice.status === 'pending'
                        ? 'outline'
                        : 'destructive'
                  }
                >
                  {selectedInvoice.status}
                </Badge>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium">Bill To:</h4>
              <p>{selectedInvoice.client}</p>
              <p>{selectedInvoice.email}</p>
            </div>

            <Table
              columns={[
                {
                  title: 'Description',
                  dataIndex: 'description',
                  key: 'description',
                },
                {
                  title: 'Amount',
                  dataIndex: 'amount',
                  key: 'amount',
                  align: 'right',
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
                  description: 'Total',
                  amount: <strong>{selectedInvoice.amount}</strong>,
                },
              ]}
              pagination={false}
              bordered
            />

            <div className="space-y-2">
              <h4 className="font-medium">Payment Information:</h4>
              <p>
                <span className="font-medium">Method:</span> {selectedInvoice.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                {selectedInvoice.status === 'paid'
                  ? 'Paid in full'
                  : selectedInvoice.status === 'pending'
                    ? 'Payment pending'
                    : 'Payment overdue'}
              </p>
            </div>

            <div className="border-t pt-4 text-center text-sm text-gray-500">
              <p>Thank you for your business!</p>
              <p>If you have any questions, please contact us at support@cleanpro.example.com</p>
            </div>

            <div className="flex justify-between">
              <Space>
                <Button type="default">
                  <DownloadOutlined className="mr-2" />
                  Download
                </Button>
                <Button type="default">
                  <PrinterOutlined className="mr-2" />
                  Print
                </Button>
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