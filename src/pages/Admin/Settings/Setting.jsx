import React, { useState } from 'react';
import { Card, Tabs, Input, Button, Select, Switch, Avatar, Space, Tag, Form } from 'antd';
import { UserOutlined, HomeOutlined, PhoneOutlined, MailOutlined, SaveOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data for settings
  const profileData = {
    name: 'Admin User',
    email: 'admin@cleanpro.example.com',
    phone: '(555) 123-4567',
    role: 'Administrator',
    avatar: '/placeholder-user.jpg',
  };

  const businessData = {
    name: 'CleanPro Services',
    address: '123 Cleaning Street, Suite 100',
    city: 'Sparkle City',
    state: 'SC',
    zip: '12345',
    phone: '(555) 987-6543',
    email: 'contact@cleanpro.example.com',
    website: 'www.cleanpro.example.com',
    taxId: '12-3456789',
  };

  const serviceTypes = [
    {
      id: 1,
      name: 'Regular Cleaning',
      price: '$85',
      duration: '2 hours',
      description: 'Standard cleaning service for homes and apartments',
    },
    {
      id: 2,
      name: 'Deep Cleaning',
      price: '$135',
      duration: '3.5 hours',
      description: 'Thorough cleaning including hard-to-reach areas and appliances',
    },
    {
      id: 3,
      name: 'Move-out Cleaning',
      price: '$250',
      duration: '5 hours',
      description: 'Complete cleaning for moving out of a property',
    },
    {
      id: 4,
      name: 'Window Cleaning',
      price: '$95',
      duration: '2.5 hours',
      description: 'Interior and exterior window cleaning',
    },
    {
      id: 5,
      name: 'Carpet Cleaning',
      price: '$200',
      duration: '3 hours',
      description: 'Deep carpet cleaning and stain removal',
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-gray-500">Manage your account and business settings</p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="space-y-4">
        <TabPane tab="Profile" key="profile">
          <Card title="Profile Settings" description="Manage your personal information and account settings">
            <div className="space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex flex-col items-center gap-4">
                  <Avatar size={96} src={profileData.avatar} icon={<UserOutlined />} />
                  <Button type="default" size="small">
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Form.Item label="Full Name">
                      <Input prefix={<UserOutlined className="text-gray-400" />} defaultValue={profileData.name} />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input prefix={<MailOutlined className="text-gray-400" />} type="email" defaultValue={profileData.email} />
                    </Form.Item>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Form.Item label="Phone Number">
                      <Input prefix={<PhoneOutlined className="text-gray-400" />} defaultValue={profileData.phone} />
                    </Form.Item>
                    <Form.Item label="Role">
                      <Select defaultValue="admin">
                        <Option value="admin">Administrator</Option>
                        <Option value="manager">Manager</Option>
                        <Option value="staff">Staff</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Form.Item label="Bio">
                <TextArea rows={4} placeholder="Tell us about yourself" />
              </Form.Item>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Form.Item label="Current Password">
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label="New Password">
                    <Input.Password />
                  </Form.Item>
                </div>
                <Form.Item label="Confirm New Password">
                  <Input.Password />
                </Form.Item>
              </div>
              <Button type="primary">
                <SaveOutlined className="mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Business" key="business">
          <Card title="Business Information" description="Manage your business details and contact information">
            <div className="space-y-6">
              <Form.Item label="Business Name">
                <Input prefix={<HomeOutlined className="text-gray-400" />} defaultValue={businessData.name} />
              </Form.Item>
              <div className="grid gap-4 sm:grid-cols-2">
                <Form.Item label="Business Email">
                  <Input prefix={<MailOutlined className="text-gray-400" />} type="email" defaultValue={businessData.email} />
                </Form.Item>
                <Form.Item label="Business Phone">
                  <Input prefix={<PhoneOutlined className="text-gray-400" />} defaultValue={businessData.phone} />
                </Form.Item>
              </div>
              <Form.Item label="Street Address">
                <Input defaultValue={businessData.address} />
              </Form.Item>
              <div className="grid gap-4 sm:grid-cols-3">
                <Form.Item label="City">
                  <Input defaultValue={businessData.city} />
                </Form.Item>
                <Form.Item label="State">
                  <Input defaultValue={businessData.state} />
                </Form.Item>
                <Form.Item label="ZIP Code">
                  <Input defaultValue={businessData.zip} />
                </Form.Item>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Form.Item label="Website">
                  <Input defaultValue={businessData.website} />
                </Form.Item>
                <Form.Item label="Tax ID / EIN">
                  <Input defaultValue={businessData.taxId} />
                </Form.Item>
              </div>
              <Form.Item label="Business Description">
                <TextArea
                  rows={4}
                  defaultValue="Professional cleaning services for homes and businesses. We provide regular cleaning, deep cleaning, move-out cleaning, window cleaning, and carpet cleaning services."
                  placeholder="Describe your cleaning service business"
                />
              </Form.Item>
              <Button type="primary">
                <SaveOutlined className="mr-2" />
                Save Business Information
              </Button>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Services" key="services">
          <Card title="Service Configuration" description="Manage your service offerings, pricing, and descriptions">
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Available Services</h3>
                <Button type="default" size="small">
                  Add New Service
                </Button>
              </div>
              <div className="space-y-4">
                {serviceTypes.map((service) => (
                  <div key={service.id} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                      <Space>
                        <Tag color="blue">{service.duration}</Tag>
                        <Tag color="green">{service.price}</Tag>
                        <Button type="text" size="small">
                          Edit
                        </Button>
                      </Space>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pricing Strategy</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Form.Item label="Pricing Model">
                    <Select defaultValue="fixed">
                      <Option value="fixed">Fixed Price</Option>
                      <Option value="hourly">Hourly Rate</Option>
                      <Option value="square-foot">Per Square Foot</Option>
                      <Option value="custom">Custom Quote</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Discount Policy">
                    <Select defaultValue="recurring">
                      <Option value="none">No Discounts</Option>
                      <Option value="recurring">Recurring Client Discount</Option>
                      <Option value="seasonal">Seasonal Promotions</Option>
                      <Option value="referral">Referral Discount</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <Button type="primary">
                <SaveOutlined className="mr-2" />
                Save Service Settings
              </Button>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Notifications" key="notifications">
          <Card title="Notification Preferences" description="Configure how you receive notifications and alerts">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>New Booking Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Receive an email when a new booking is created</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Task Completion Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Receive an email when a task is marked as completed</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Payment Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Receive an email when a payment is processed</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SMS Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>New Booking Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Receive a text message when a new booking is created</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Urgent Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Receive a text message for urgent matters like cancellations</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Client Communications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Booking Confirmation Emails</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Send automatic booking confirmation emails to clients</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Service Reminder Emails</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Send reminder emails to clients 24 hours before scheduled service</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Feedback Request Emails</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Send feedback request emails after service completion</p>
                </div>
              </div>
              <Button type="primary">
                <SaveOutlined className="mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="System" key="system">
          <Card title="System Settings" description="Configure system preferences and integrations">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Appearance</h3>
                <Form.Item label="Theme Preference">
                  <Select defaultValue="light">
                    <Option value="light">Light</Option>
                    <Option value="dark">Dark</Option>
                    <Option value="system">System Default</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regional Settings</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Form.Item label="Date Format">
                    <Select defaultValue="mm-dd-yyyy">
                      <Option value="mm-dd-yyyy">MM/DD/YYYY</Option>
                      <Option value="dd-mm-yyyy">DD/MM/YYYY</Option>
                      <Option value="yyyy-mm-dd">YYYY/MM/DD</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Time Format">
                    <Select defaultValue="12h">
                      <Option value="12h">12-hour (AM/PM)</Option>
                      <Option value="24h">24-hour</Option>
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item label="Timezone">
                  <Select defaultValue="eastern">
                    <Option value="eastern">Eastern Time (ET)</Option>
                    <Option value="central">Central Time (CT)</Option>
                    <Option value="mountain">Mountain Time (MT)</Option>
                    <Option value="pacific">Pacific Time (PT)</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Integrations</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Stripe Integration</span>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Enable Stripe for processing credit card payments</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>PayPal Integration</span>
                    <Switch />
                  </div>
                  <p className="text-sm text-gray-500">Enable PayPal as a payment option for clients</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <Form.Item label="Data Retention Policy">
                  <Select defaultValue="1year">
                    <Option value="6months">6 Months</Option>
                    <Option value="1year">1 Year</Option>
                    <Option value="2years">2 Years</Option>
                    <Option value="3years">3 Years</Option>
                    <Option value="indefinite">Indefinite</Option>
                  </Select>
                  <p className="text-sm text-gray-500">How long to keep client data and booking history</p>
                </Form.Item>
                <div className="space-y-2">
                  <Button type="default">Export All Data</Button>
                  <p className="text-sm text-gray-500">Download a complete backup of all your business data</p>
                </div>
              </div>
              <Button type="primary">
                <SaveOutlined className="mr-2" />
                Save System Settings
              </Button>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SettingsPage;