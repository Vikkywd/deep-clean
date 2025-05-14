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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Skilled Professionals with Advanced Equipment
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Our team consists of trained and experienced cleaning professionals who take pride in delivering
                exceptional results.
              </p>

              {/* List of Features */}
               <ul className="grid gap-2">
              {features.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircleOutlined className="h-5 w-5 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
