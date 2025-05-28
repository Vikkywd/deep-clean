import React, { useEffect, useRef, useState } from 'react';
import { Table, Input, Button, Select, Modal, Space, notification } from 'antd';
import { SearchOutlined, FilterOutlined, DownloadOutlined, PrinterOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Badge } from '../../../components/badge';
import { useDispatch } from 'react-redux';
import { TaskNotPending } from '../../../redux/slices/workerSlice';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Option } = Select;

const Invoice = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const printRef = useRef();
  const buttonsRef = useRef();


  useEffect(() => {
    const fetchInvoices = async () => {
      const { payload } = await dispatch(TaskNotPending());
      setInvoices(payload?.data?.data || []);
    };
    fetchInvoices();
  }, [dispatch]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice._id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailsOpen(true);
  };


  const handleDownload = () => {
    if (!printRef.current || !buttonsRef.current) return;

    buttonsRef.current.style.display = 'none';  // Hide buttons

    html2canvas(printRef.current, {
      scale: 3,                // Increase scale for higher quality image
      useCORS: true,           // In case of external images
      scrollY: -window.scrollY // Avoid scroll offset issues
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format:[650, 760],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${selectedInvoice?._id}.pdf`);

      buttonsRef.current.style.display = 'flex'; // Show buttons back
    }).catch(() => {
      buttonsRef.current.style.display = 'flex'; // Show buttons if error
    });
  };


  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Invoice_${selectedInvoice?._id}`,
  });

  const paymentLink = (invoice) => {
    const url = `http://localhost:5173/payment/${invoice._id}`;
    navigator.clipboard.writeText(url).then(() => {
      notification.success({
        message: "Payment link copied to clipboard!",
        placement: 'topRight'
      });
    }).catch(() => {
      notification.error({
        message: "Failed to copy the link!",
        placement: 'topRight'
      });
    });
  };

  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      responsive: ['md'],
      render:(text,record)=>text.map(t=>t + ' cleaning')
    },
    {
      title: 'Date',
      dataIndex: 'serviceDate',
      key: 'serviceDate',
      responsive: ['md'],
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text)=> `$ ${text}`
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => (
        <Badge variant={
          status === 'paid' ? 'success' :
            status === 'pending' ? 'outline' : 'destructive'
        }>
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
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleViewInvoice(record)} />
          {/* <Button type="text" icon={<DownloadOutlined />} onClick={handleDownload} /> */}
          <Button type="text" icon={<LinkOutlined />} onClick={() => paymentLink(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-2xl font-bold">Invoices</h2>
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
            onChange={setStatusFilter}
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
        rowKey="_id"
        pagination={false}
        bordered
        className="rounded-md"
      />

      <Modal
        title={null}
        open={isInvoiceDetailsOpen}
        onCancel={() => setIsInvoiceDetailsOpen(false)}
        footer={null}
        width={760}
        destroyOnClose
      >
        {selectedInvoice && (
          <div ref={printRef} className="space-y-8 p-4 text-gray-800 dark:text-gray-100">
            {/* Invoice Header */}
            <div className="flex justify-between border-b pb-6">
              <div>
                <h3 className="text-2xl font-bold">CleanPro Services</h3>
                <p className="text-sm text-gray-500">123 Cleaning Street</p>
                <p className="text-sm text-gray-500">Sparkle City, SC</p>
                <p className="text-sm text-gray-500">contact@cleanpro.example.com</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold">INVOICE</h3>
                <p className="text-sm font-medium">#{selectedInvoice._id}</p>
                <p className="text-sm text-gray-500">Date: {moment(selectedInvoice.serviceDate).format('YYYY-MM-DD')}</p>
                <div className="mt-2">
                  <Badge variant={
                    selectedInvoice.status === 'paid' ? 'success' :
                      selectedInvoice.status === 'pending' ? 'outline' : 'destructive'
                  }>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontWeight: '600',
                    }}>
                      {selectedInvoice.paymentStatus}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Bill To</h4>
              <p>{selectedInvoice.clientName}</p>
              <p>{selectedInvoice.phone}</p>
            </div>

            {/* Service Items */}

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
                  render: (val, record) => {
                    if (record.description === 'Total') {
                      return <strong>{val}</strong>;  // Bold only the total row
                    }
                    return `$${val}`;  // Normal rendering for others
                  },
                }
              ]}
              dataSource={[
                {
                  key: '1',
                  description: `${selectedInvoice.service.map(e => `${e} cleaning`).join(', ')}`,
                  amount: selectedInvoice.amount,
                },
                {
                  key: '2',
                  description: <strong>Total</strong>,
                  amount: selectedInvoice.amount,
                },
              ]}
              pagination={false}
              bordered
            />

            {/* Payment Info */}
            <div className="border-b pb-4">
              <h4 className="font-semibold">Payment Information</h4>
              <p><strong>Method:</strong> {selectedInvoice.paymentMethod}</p>
              <p><strong>Status:</strong> {
                selectedInvoice.status === 'paid' ? 'Paid in full' :
                  selectedInvoice.status === 'pending' ? 'Payment pending' : 'Overdue'
              }</p>
            </div>

            {/* Footer Note */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t">
              <p>Thank you for your business!</p>
              <p>
                Questions? Contact us at <a href="mailto:support@cleanpro.example.com" className="underline text-blue-600">support@cleanpro.example.com</a>
              </p>
            </div>

            {/* Modal Footer Actions */}
            <div ref={buttonsRef} className="flex justify-between pt-6">
              <Space>
                <Button onClick={handleDownload} icon={<DownloadOutlined />}>Download</Button>
                <Button onClick={() => setTimeout(() => { handlePrint() }, 1000)} icon={<PrinterOutlined />}>Print</Button>
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
