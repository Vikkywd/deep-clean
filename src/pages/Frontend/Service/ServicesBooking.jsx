import React, { useState } from 'react'
import { Button, Form, Input, Select, DatePicker, Typography, Layout } from 'antd'
import Header from '../Components/Header'
import { Footer } from '../Components/Footer'

const { TextArea } = Input
const { Title, Paragraph } = Typography

export function ServiceBooking() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Booking Submitted:', values)
    // Handle form submission here (e.g., send to backend)
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
    <Header/>
    <section id="booking" style={{ padding: '48px 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2}>Book This Service</Title>
          <Paragraph type="secondary">
            Schedule your cleaning appointment today
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input placeholder="john.doe@example.com" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="(555) 123-4567" />
          </Form.Item>

          <Form.Item
            label="Preferred Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Property Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input placeholder="123 Main St, City, State, ZIP" />
          </Form.Item>

          <Form.Item
            label="Property Type"
            name="propertyType"
            rules={[{ required: true, message: 'Please select property type' }]}
          >
            <Select placeholder="Select property type">
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
            <Input type="number" placeholder="1000" />
          </Form.Item>

          <Form.Item
            label="Special Instructions"
            name="specialInstructions"
          >
            <TextArea rows={4} placeholder="Any specific areas or special instructions..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Request Booking
            </Button>
          </Form.Item>

          <Paragraph style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>
            By submitting this form, you agree to our terms of service and privacy policy.
          </Paragraph>
        </Form>
      </div>
    </section>
    <Footer/>
    </Layout>

  )
}
