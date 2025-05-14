import { Button, Form, Input, Select, DatePicker, Typography, Row, Col } from 'antd';
import 'tailwindcss/tailwind.css';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const BookingForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Booking Submitted:', values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8 animate-fade-in">
          <Title level={2} className="text-4xl font-extrabold text-gray-900 tracking-tight">
             Booking Form
          </Title>
          <Paragraph className="text-lg text-gray-600 mt-2">
            Seamlessly manage cleaning service bookings
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="animate-slide-up"
        >
          <Row gutter={24}>
            {/* Left Column */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the client’s name' }]}
              >
                <Input placeholder="John Doe" className="rounded-xl py-3 px-4" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter the client’s email' },
                  { type: 'email', message: 'Enter a valid email address' },
                ]}
              >
                <Input placeholder="john.doe@example.com" className="rounded-xl py-3 px-4" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please enter the client’s phone number' }]}
              >
                <Input placeholder="(555) 123-4567" className="rounded-xl py-3 px-4" />
              </Form.Item>

              <Form.Item
                label="Preferred Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker className="w-full rounded-xl py-3 px-4" />
              </Form.Item>
            </Col>

            {/* Right Column */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Property Address"
                name="address"
                rules={[{ required: true, message: 'Please enter the property address' }]}
              >
                <Input placeholder="123 Main St, City, State, ZIP" className="rounded-xl py-3 px-4" />
              </Form.Item>

              <Form.Item
                label="Property Type"
                name="propertyType"
                rules={[{ required: true, message: 'Please select property type' }]}
              >
                <Select placeholder="Select property type" className="rounded-xl">
                  <Select.Option value="apartment">Apartment</Select.Option>
                  <Select.Option value="house">House</Select.Option>
                  <Select.Option value="condo">Condo</Select.Option>
                  <Select.Option value="office">Office</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Square Footage (approximate)"
                name="squareFootage"
                rules={[{ required: true, message: 'Please enter square footage' }]}
              >
                <Input
                  type="number"
                  placeholder="1000"
                  className="rounded-xl py-3 px-4"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Special Instructions"
                name="specialInstructions"
              >
                <TextArea
                  rows={4}
                  placeholder="Any specific areas or special instructions..."
                  className="rounded-xl py-3 px-4"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl transition-transform hover:scale-105"
                >
                  Submit Booking
                </Button>
              </Form.Item>

              <Paragraph className="text-center text-sm text-gray-500">
                All bookings are subject to admin approval and availability.
              </Paragraph>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
