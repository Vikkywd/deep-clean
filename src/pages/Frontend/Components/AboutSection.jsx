'use client'

import React from 'react'
import { Row, Col, Typography, List, Space, Tag, Image } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
// import Image from 'next/image'

const { Title, Paragraph, Text } = Typography

export function AboutSection() {
  const features = [
    'Fully trained and certified cleaning technicians',
    'Background-checked and insured staff',
    'State-of-the-art cleaning equipment',
    'Eco-friendly and safe cleaning products',
    'Attention to detail on every job',
  ]

  return (
    <section id="about" style={{ backgroundColor: '#fafafa', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Row gutter={[48, 32]} align="middle">
          {/* Text Section */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large">
              <Tag color="green" style={{ width: 'fit-content' }}>
                About Us
              </Tag>
              <Title level={2}>Skilled Professionals with Advanced Equipment</Title>
              <Paragraph type="secondary">
                Our team consists of trained and experienced cleaning professionals who take pride in delivering
                exceptional results.
              </Paragraph>

              <List
                dataSource={features}
                renderItem={(item) => (
                  <List.Item style={{ paddingLeft: 0, paddingRight: 0, border: 'none' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <Text>{item}</Text>
                  </List.Item>
                )}
              />
            </Space>
          </Col>

          {/* Image Section */}
          <Col xs={24} lg={12} style={{ textAlign: 'center' }}>
            <Image
              src="https://kzmp6v81cdn7jyceo19r.lite.vusercontent.net/placeholder.svg?height=550&width=550"
              alt="Our cleaning equipment"
              width={550}
              height={550}
              style={{ borderRadius: 12, objectFit: 'cover', maxWidth: '100%', height: 'auto' }}
            />
          </Col>
        </Row>
      </div>
    </section>
  )
}
