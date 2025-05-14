import React, { useState } from 'react';
import { 
  Steps, 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  TimePicker, 
  Card, 
  Divider, 
  Avatar,
  Row, 
  Col 
} from 'antd';
import { 
  HomeOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import { FaBroom, FaMapMarkerAlt } from 'react-icons/fa';

const { Step } = Steps;
const { Option } = Select;

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    { title: 'Service', icon: <FaBroom /> },
    { title: 'Time', icon: <CalendarOutlined /> },
    { title: 'Details', icon: <UserOutlined /> },
  ];

  const services = [
    { name: 'Deep Cleaning', emoji: '🧹', price: '$150' },
    { name: 'Move-In/Move-Out', emoji: '🚚', price: '$200' },
    { name: 'Carpet Cleaning', emoji: '🧽', price: '$120' },
  ];

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handlePrev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = ()=>{
    const datas = form.getFieldsValue(); 
    console.log('datas: <<<<<>>>>', datas);
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Card 
        title={
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              size={64} 
              icon={<HomeOutlined />} 
              style={{ backgroundColor: '#1890ff', marginBottom: '10px' }} 
            />
            <h1 style={{ margin: '0', color: '#1890ff' }}>Book a Deep Cleaning</h1>
            <p>Get your property sparkling clean in 3 easy steps!</p>
          </div>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <Steps current={currentStep} style={{ marginBottom: '30px' }}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        <Form 
        form={form} 
        onFinish={handleSubmit}
        layout="vertical"
        >
          {/* STEP 1: Service Selection */}
          {currentStep === 0 && (
            <div style={{ textAlign: 'center' }}>
              <h3>Select a Service</h3>
              <Row gutter={16} style={{ marginTop: '20px' }}>
                {services.map((service) => (
                  <Col span={8} key={service.name}>
                    <Card
                      hoverable
                      onClick={() => form.setFieldsValue({ service: service.name })}
                      style={{
                        border: form.getFieldValue('service') === service.name 
                          ? '2px solid #1890ff' 
                          : '1px solid #f0f0f0',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ fontSize: '24px' }}>{service.emoji}</div>
                      <h4>{service.name}</h4>
                      <p>{service.price}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {currentStep === 1 && (
            <>
              <h3>When do you need us?</h3>
              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <DatePicker 
                  style={{ width: '100%' }} 
                  suffixIcon={<CalendarOutlined />} 
                />
              </Form.Item>
              <Form.Item name="time" label="Time Slot" rules={[{ required: true }]}>
                <TimePicker.RangePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="location" label="Property Address">
                <Input 
                  prefix={<FaMapMarkerAlt />} 
                  placeholder="Enter your address" 
                />
              </Form.Item>
            </>
          )}

          {/* STEP 3: User Details */}
          {currentStep === 2 && (
            <>
              <h3>Your Information</h3>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input placeholder="John Doe" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                <Input placeholder="john@example.com" />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input placeholder="+1 (123) 456-7890" />
              </Form.Item>
              <Form.Item name="notes" label="Special Instructions">
                <Input.TextArea placeholder="e.g., 'Focus on kitchen grease'" />
              </Form.Item>
            </>
          )}

          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {currentStep > 0 && (
              <Button onClick={handlePrev}>Back</Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button 
               htmlType='submit'
                type="primary" 
                icon={<CheckCircleOutlined />} 
                style={{ background: '#52c41a', borderColor: '#52c41a' }}
              >
                Confirm Booking
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default BookingForm;