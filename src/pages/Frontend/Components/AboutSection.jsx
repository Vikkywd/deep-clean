'use client'

import React from 'react'
import { Row, Col, Typography, List, Space, Tag, Image } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import skilledWorker from '../../../images/skilledWorker.jpeg'

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
          {/* Left Column (Text) */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Tag color="green" style={{ width: 'fit-content' }}>
                About Us
              </Tag>
              <Title level={2} style={{ fontSize: '1.5rem' }}>
                Skilled Professionals with Advanced Equipment
              </Title>
              <Paragraph type="secondary" style={{ fontSize: '1rem' }}>
                Our team consists of trained and experienced cleaning professionals who take pride in delivering
                exceptional results.
              </Paragraph>

              {/* List of Features */}
              <List
                dataSource={features}
                split={false}
                style={{ padding: 0, margin: 0 }}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      padding: '4px 0',
                      margin: 0,
                      border: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      <Text style={{ marginLeft: 10 }}>{item}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Space>
          </Col>

          {/* Right Column (Image) */}
          <Col xs={24} lg={12} style={{ textAlign: 'center' }}>
            <Image
              src={skilledWorker}
              alt="Our cleaning equipment"
              width="100%"
              height="auto"
              style={{
                borderRadius: 12,
                objectFit: 'cover',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Col>
        </Row>
      </div>
    </section>
  )
}
