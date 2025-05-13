'use client'

import React from 'react'
import { Card, Col, Row, Typography, Badge } from 'antd'

const { Title, Text, Paragraph } = Typography

const services = [
  {
    title: 'Residential Cleaning',
    description: 'Complete home cleaning services including kitchens, bathrooms, living areas, and bedrooms.',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    title: 'Commercial Cleaning',
    description: 'Professional cleaning for offices, retail spaces, and commercial properties.',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    title: 'Deep Cleaning',
    description: 'Thorough cleaning of hard-to-reach areas and detailed attention to all surfaces.',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    title: 'Move In/Out Cleaning',
    description: "Comprehensive cleaning services for when you're moving in or out of a property.",
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    title: 'Window Cleaning',
    description: 'Professional window cleaning for crystal clear results inside and out.',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    title: 'Carpet Cleaning',
    description: 'Deep carpet cleaning using professional equipment and eco-friendly products.',
    image: '/placeholder.svg?height=100&width=100',
  },
]

function ServiceCard({ title, description, image }) {
  return (
    <Col xs={24} sm={12} lg={8}>
      <Card
        hoverable
        bordered
        className="shadow-sm"
        style={{ borderRadius: 12, textAlign: 'center' }}
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div
            style={{
              backgroundColor: '#d1fae5',
              padding: 12,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={image || '/placeholder.svg'}
              alt={title}
              width={48}
              height={48}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
        </div>
        <Title level={4}>{title}</Title>
        <Paragraph type="secondary">{description}</Paragraph>
      </Card>
    </Col>
  )
}

export function ServicesSection() {
  return (
    <section id="services" style={{ padding: '80px 0', backgroundColor: '#fff' }}>
      <div className="container mx-auto px-4">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Badge
            count="Our Services"
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
          <Title level={2}>Comprehensive Cleaning Solutions</Title>
          <Text style={{ color: '#6b7280', fontSize: 16 }}>
            We offer a wide range of professional cleaning services tailored to your specific needs.
          </Text>
        </div>
        <Row gutter={[24, 24]} justify="center">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </Row>
      </div>
    </section>
  )
}
