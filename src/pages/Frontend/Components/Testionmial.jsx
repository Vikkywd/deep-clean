'use client'

import React from 'react'
import { Card, Col, Row, Typography, Avatar, Badge } from 'antd'
import { StarFilled, UserOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content:
      'The team at SparkleClean transformed my home. Their attention to detail is impressive, and they were professional from start to finish.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Office Manager',
    content:
      'We’ve been using their commercial cleaning services for our office for over a year now. Consistent quality and reliability every time.',
    rating: 5,
  },
  {
    name: 'Emma Williams',
    role: 'Property Manager',
    content:
      'Their move-out cleaning services have saved me countless hours. Tenants are always impressed with how clean the properties are.',
    rating: 5,
  },
]

function TestimonialCard({ name, role, content, rating }) {
  return (
    <Col xs={24} sm={12} lg={8}>
      <Card bordered className="shadow-sm" style={{ borderRadius: 12, height: '100%' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {Array.from({ length: rating }, (_, i) => (
            <StarFilled key={i} style={{ color: '#facc15', fontSize: 16 }} />
          ))}
        </div>
        <Paragraph style={{ color: '#6b7280' }}>"{content}"</Paragraph>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 16, gap: 12 }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <Text strong>{name}</Text>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{role}</div>
          </div>
        </div>
      </Card>
    </Col>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: '80px 0', backgroundColor: '#fff' }}>
      <div className="container mx-auto px-4">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Badge
            count="Testimonials"
            style={{
              backgroundColor: '#bbf7d0',
              color: '#065f46',
              fontWeight: 500,
              fontSize: 13,
              padding: '0 12px',
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
           <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Clients Say</h2>
          <Text style={{ color: '#6b7280', fontSize: 16 }}>
            Don’t just take our word for it. Here’s what our satisfied customers have to say.
          </Text>
        </div>
        <Row gutter={[24, 24]} justify="center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Row>
      </div>
    </section>
  )
}
