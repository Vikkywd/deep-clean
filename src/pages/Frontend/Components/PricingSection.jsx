'use client'

import React from 'react'
import { Card, Col, Row, Typography, Badge, Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Text, Paragraph } = Typography

const pricingPlans = [
  {
    title: 'Basic Clean',
    price: '₹120',
    description: 'Perfect for regular maintenance cleaning',
    features: [
      'Dusting all accessible surfaces',
      'Vacuuming and mopping floors',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Emptying trash',
    ],
  },
  {
    title: 'Deep Clean',
    price: '₹220',
    description: 'Thorough cleaning for homes needing extra attention',
    features: [
      'All Basic Clean services',
      'Inside cabinet cleaning',
      'Interior window cleaning',
      'Baseboards and door frames',
      'Detailed appliance cleaning',
      'Light fixture cleaning',
    ],
    highlighted: true,
  },
  {
    title: 'Move In/Out',
    price: '₹320',
    description: 'Comprehensive cleaning for moving transitions',
    features: [
      'All Deep Clean services',
      'Inside oven and refrigerator',
      'Inside all cabinets and drawers',
      'Closet cleaning',
      'Wall spot cleaning',
      'Window track cleaning',
    ],
  },
]

const PricingPlan = ({ title, price, description, features, highlighted }) => (
   <Col xs={24} md={8}>
    <Badge.Ribbon
      text="Most Popular"
      color="green"
      style={{
        display: highlighted ? 'block' : 'none',
        fontWeight: 'bold',
        fontSize: 14,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Card
        bordered
        className="wow-card"
        style={{
          borderColor: highlighted ? '#16a34a' : '#d1d5db',
          borderRadius: 16,
          transition: 'all 0.4s ease',
          overflow: 'hidden',
          boxShadow: highlighted
            ? '0 12px 30px rgba(22, 163, 74, 0.2)'
            : '0 6px 20px rgba(0,0,0,0.05)',
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Title level={4} style={{ marginBottom: 12 }}>{title}</Title>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <Title level={2} style={{ marginBottom: 0 }}>{price}</Title>
          <Text type="secondary">/ per visit</Text>
        </div>
        <Paragraph type="secondary" style={{ marginTop: 8 }}>{description}</Paragraph>
        <ul style={{ marginTop: 16, paddingLeft: 20 }}>
          {features.map((feature, idx) => (
            <li key={idx} style={{
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <CheckCircleOutlined style={{ color: '#16a34a' }} />
              <Text>{feature}</Text>
            </li>
          ))}
        </ul>
        <Link href="#contact">
          <Button
            type={highlighted ? 'primary' : 'default'}
            style={{
              marginTop: 24,
              width: '100%',
              background: highlighted ? 'linear-gradient(90deg, #16a34a, #15803d)' : undefined,
              borderColor: highlighted ? '#15803d' : undefined,
              color: highlighted ? 'white' : undefined,
              fontWeight: 500,
              transition: 'all 0.3s ease',
              boxShadow: highlighted ? '0 8px 20px rgba(22,163,74,0.3)' : undefined,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(22,163,74,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = highlighted ? '0 8px 20px rgba(22,163,74,0.3)' : 'none';
            }}
          >
            Book Now
          </Button>
        </Link>
      </Card>
    </Badge.Ribbon>
  </Col>
  
)

export function PricingSection() {
  return (
    <section id="pricing" style={{ backgroundColor: '#f9fafb', padding: '80px 0' }}>
      <div className="container mx-auto px-4">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', backgroundColor: '#d1fae5', padding: '4px 12px', borderRadius: 6 }}>
            <Text style={{ color: '#065f46', fontWeight: 500 }}>Pricing</Text>
          </div>
          <Title level={2} style={{ marginTop: 16 }}>Transparent & Competitive Pricing</Title>
          <Text style={{ fontSize: 16, color: '#6b7280' }}>
            We offer flexible packages to suit your needs and budget.
          </Text>
        </div>
        <Row gutter={[24, 24]} justify="center">
          {pricingPlans.map((plan, idx) => (
            <PricingPlan key={idx} {...plan} />
          ))}
        </Row>
      </div>
    </section>
  )
}
