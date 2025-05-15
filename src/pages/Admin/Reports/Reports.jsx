import React, { useState } from 'react';
import { Card, Table, Tabs, Button, Select, DatePicker, Row, Col } from 'antd';
import { DownloadOutlined, BarChartOutlined, LineChartOutlined, FilterOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

const ReportsPage = () => {
  const [date, setDate] = useState(null);
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('financial');

  // Mock data for reports
  const financialSummary = {
    totalRevenue: '$12,450',
    pendingPayments: '$1,850',
    averageJobValue: '$145',
    monthlyGrowth: '+18%',
  };

  const operationalSummary = {
    totalBookings: '128',
    completedTasks: '105',
    cancellations: '8',
    averageRating: '4.8',
  };

  const topServices = [
    { name: 'Deep Cleaning', revenue: '$4,250', jobs: 32, percentage: '34%' },
    { name: 'Regular Cleaning', revenue: '$3,400', jobs: 40, percentage: '27%' },
    { name: 'Move-out Cleaning', revenue: '$2,500', jobs: 10, percentage: '20%' },
    { name: 'Window Cleaning', revenue: '$1,300', jobs: 15, percentage: '10%' },
    { name: 'Carpet Cleaning', revenue: '$1,000', jobs: 5, percentage: '8%' },
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: '$8,450' },
    { month: 'Feb', revenue: '$9,200' },
    { month: 'Mar', revenue: '$10,100' },
    { month: 'Apr', revenue: '$11,300' },
    { month: 'May', revenue: '$12,450' },
  ];

  const clientRetention = {
    newClients: '24',
    returningClients: '45',
    retentionRate: '78%',
    averageFrequency: '2.3 months',
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const columnsWorkerPerformance = [
    { title: 'Worker', dataIndex: 'worker', key: 'worker', render: (text) => <span className="font-medium">{text}</span> },
    { title: 'Tasks Assigned', dataIndex: 'tasksAssigned', key: 'tasksAssigned' },
    { title: 'Tasks Completed', dataIndex: 'tasksCompleted', key: 'tasksCompleted' },
    { title: 'Completion Rate', dataIndex: 'completionRate', key: 'completionRate' },
    { title: 'Avg. Time per Task', dataIndex: 'avgTime', key: 'avgTime' },
    { title: 'Client Rating', dataIndex: 'rating', key: 'rating' },
  ];

  const dataWorkerPerformance = [
    { key: '1', worker: 'David Miller', tasksAssigned: 28, tasksCompleted: 26, completionRate: '93%', avgTime: '2.5 hours', rating: '4.9' },
    { key: '2', worker: 'Lisa Chen', tasksAssigned: 25, tasksCompleted: 24, completionRate: '96%', avgTime: '2.3 hours', rating: '4.8' },
    { key: '3', worker: 'James Wilson', tasksAssigned: 22, tasksCompleted: 20, completionRate: '91%', avgTime: '2.7 hours', rating: '4.7' },
    { key: '4', worker: 'Maria Rodriguez', tasksAssigned: 20, tasksCompleted: 18, completionRate: '90%', avgTime: '2.4 hours', rating: '4.6' },
    { key: '5', worker: 'Jennifer Lee', tasksAssigned: 18, tasksCompleted: 17, completionRate: '94%', avgTime: '2.6 hours', rating: '4.9' },
  ];

  const columnsServicePerformance = [
    { title: 'Service Type', dataIndex: 'service', key: 'service', render: (text) => <span className="font-medium">{text}</span> },
    { title: 'Avg. Price', dataIndex: 'avgPrice', key: 'avgPrice' },
    { title: 'Avg. Duration', dataIndex: 'avgDuration', key: 'avgDuration' },
    { title: 'Profit Margin', dataIndex: 'profitMargin', key: 'profitMargin' },
    { title: 'Client Satisfaction', dataIndex: 'satisfaction', key: 'satisfaction' },
    { title: 'Rebooking Rate', dataIndex: 'rebookingRate', key: 'rebookingRate' },
  ];

  const dataServicePerformance = [
    { key: '1', service: 'Deep Cleaning', avgPrice: '$135', avgDuration: '3.5 hours', profitMargin: '42%', satisfaction: '4.8/5', rebookingRate: '68%' },
    { key: '2', service: 'Regular Cleaning', avgPrice: '$85', avgDuration: '2.0 hours', profitMargin: '38%', satisfaction: '4.7/5', rebookingRate: '82%' },
    { key: '3', service: 'Move-out Cleaning', avgPrice: '$250', avgDuration: '5.0 hours', profitMargin: '45%', satisfaction: '4.9/5', rebookingRate: '15%' },
    { key: '4', service: 'Window Cleaning', avgPrice: '$95', avgDuration: '2.5 hours', profitMargin: '40%', satisfaction: '4.6/5', rebookingRate: '55%' },
    { key: '5', service: 'Carpet Cleaning', avgPrice: '$200', avgDuration: '3.0 hours', profitMargin: '48%', satisfaction: '4.8/5', rebookingRate: '60%' },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-gray-500">Analyze your business performance and trends</p>
        </div>
        <Button type="default">
          <DownloadOutlined className="mr-2" />
          Export Reports
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Select value={reportType} onChange={setReportType} className="w-[180px]">
          <Option value="financial">Financial</Option>
          <Option value="operational">Operational</Option>
          <Option value="services">Services</Option>
          <Option value="clients">Client Analysis</Option>
        </Select>
        <div className="flex items-center gap-2">
          <FilterOutlined className="text-gray-400" />
          <Select value={dateRange} onChange={setDateRange} className="w-[180px]">
            <Option value="week">This Week</Option>
            <Option value="month">This Month</Option>
            <Option value="quarter">This Quarter</Option>
            <Option value="year">This Year</Option>
            <Option value="custom">Custom Range</Option>
          </Select>
        </div>
        {dateRange === 'custom' && (
          <DatePicker
            value={date}
            onChange={handleDateChange}
            placeholder="Pick a date"
            className="w-[240px]"
            format="YYYY-MM-DD"
          />
        )}
      </div>

      <Tabs activeKey={reportType} onChange={setReportType} className="space-y-4">
        <TabPane tab="Financial" key="financial">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Total Revenue</span>
                  <BarChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{financialSummary.totalRevenue}</div>
                <p className="text-xs text-green-500">{financialSummary.monthlyGrowth} from last month</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Pending Payments</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{financialSummary.pendingPayments}</div>
                <p className="text-xs text-gray-500">Across 15 invoices</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Average Job Value</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{financialSummary.averageJobValue}</div>
                <p className="text-xs text-green-500">+5% from last month</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Monthly Growth</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{financialSummary.monthlyGrowth}</div>
                <p className="text-xs text-gray-500">Compared to April</p>
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={14}>
              <Card title="Revenue Trend" description="Monthly revenue for the past 5 months">
                <div className="h-[300px] flex flex-col justify-center">
                  <div className="space-y-8">
                    {monthlyRevenue.map((month, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 text-sm">{month.month}</div>
                        <div className="flex-1">
                          <div
                            className="h-4 rounded bg-blue-500"
                            style={{ width: `${(parseInt(month.revenue.replace(/[^0-9]/g, '')) / 12450) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-20 text-right text-sm font-medium">{month.revenue}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={10}>
              <Card title="Revenue by Service" description="Distribution across service types">
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full space-y-4">
                    {topServices.map((service, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div>{service.name}</div>
                          <div className="font-medium">{service.percentage}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: service.percentage }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Operational" key="operational">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Total Bookings</span>
                  <BarChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{operationalSummary.totalBookings}</div>
                <p className="text-xs text-green-500">+14% from last month</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Completed Tasks</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{operationalSummary.completedTasks}</div>
                <p className="text-xs text-gray-500">82% completion rate</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Cancellations</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{operationalSummary.cancellations}</div>
                <p className="text-xs text-green-500">-2 from last month</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Average Rating</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{operationalSummary.averageRating}</div>
                <p className="text-xs text-green-500">+0.2 from last month</p>
              </Card>
            </Col>
          </Row>
          <Card title="Worker Performance" description="Efficiency and task completion by worker">
            <Table
              columns={columnsWorkerPerformance}
              dataSource={dataWorkerPerformance}
              pagination={false}
              rowKey="key"
            />
          </Card>
        </TabPane>
        <TabPane tab="Services" key="services">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Card title="Service Popularity" description="Most requested services by number of bookings">
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full space-y-4">
                    {topServices.map((service, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div>{service.name}</div>
                          <div className="font-medium">{service.jobs} jobs</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${(service.jobs / 40) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Service Revenue" description="Revenue generated by service type">
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full space-y-4">
                    {topServices.map((service, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div>{service.name}</div>
                          <div className="font-medium">{service.revenue}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: service.percentage }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Card title="Service Performance Analysis" description="Detailed metrics for each service type">
            <Table
              columns={columnsServicePerformance}
              dataSource={dataServicePerformance}
              pagination={false}
              rowKey="key"
            />
          </Card>
        </TabPane>
        <TabPane tab="Client Analysis" key="clients">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">New Clients</span>
                  <BarChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{clientRetention.newClients}</div>
                <p className="text-xs text-green-500">+5 from last month</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Returning Clients</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{clientRetention.returningClients}</div>
                <p className="text-xs text-gray-500">65% of total clients</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Retention Rate</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{clientRetention.retentionRate}</div>
                <p className="text-xs text-green-500">+3% from last month</p>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Avg. Booking Frequency</span>
                  <LineChartOutlined className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold">{clientRetention.averageFrequency}</div>
                <p className="text-xs text-gray-500">For recurring clients</p>
              </Card>
            </Col>
          </Row>
          <Card title="Client Acquisition Channels" description="How clients are finding your business">
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-full space-y-4">
                {[
                  { name: 'Website', percentage: '42%' },
                  { name: 'Referrals', percentage: '28%' },
                  { name: 'Social Media', percentage: '15%' },
                  { name: 'Google Search', percentage: '10%' },
                  { name: 'Other', percentage: '5%' },
                ].map((channel, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div>{channel.name}</div>
                      <div className="font-medium">{channel.percentage}</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: channel.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportsPage;