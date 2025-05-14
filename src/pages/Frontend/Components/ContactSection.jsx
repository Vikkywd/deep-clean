'use client'

import React from 'react'
import { Form, Input, Select, Button, Row, Col, Card, Typography, Space } from 'antd'
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input
const { Option } = Select

export function ContactSection() {
  return (
    <section id="contact" style={{ padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Row gutter={[48, 32]}>
          {/* Contact Info */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large">
              <div>
                <Text type="success" style={{ background: '#f6ffed', padding: '4px 12px', borderRadius: 8 }}>
                  Contact Us
                </Text>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get in Touch</h2>
                <Paragraph type="secondary">
                  Ready to experience the difference? Contact us today for a free quote or to schedule a cleaning.
                </Paragraph>
              </div>

              <Space direction="vertical" size="middle">
                <Space>
                  <PhoneOutlined style={{ color: '#52c41a' }} />
                  <Text>(555) 123-4567</Text>
                </Space>
                <Space>
                  <MailOutlined style={{ color: '#52c41a' }} />
                  <Text>info@sparkleclean.com</Text>
                </Space>
                <Space>
                  <EnvironmentOutlined style={{ color: '#52c41a' }} />
                  <Text>123 Cleaning Street, Sparkle City, SC 12345</Text>
                </Space>
              </Space>
            </Space>
          </Col>

          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <Card bordered>
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                      <Input placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                      <Input placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="john.doe@example.com" />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                  <Input placeholder="(555) 123-4567" />
                </Form.Item>

                <Form.Item label="Service Needed" name="service" rules={[{ required: true }]}>
                  <Select placeholder="Select a service">
                    <Option value="residential">Residential Cleaning</Option>
                    <Option value="commercial">Commercial Cleaning</Option>
                    <Option value="deep">Deep Cleaning</Option>
                    <Option value="move">Move In/Out Cleaning</Option>
                    <Option value="window">Window Cleaning</Option>
                    <Option value="carpet">Carpet Cleaning</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Message" name="message">
                  <TextArea rows={4} placeholder="Tell us about your cleaning needs..." />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  )
}
