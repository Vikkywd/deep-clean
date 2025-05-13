'use client'

import React from 'react'
import { Card, Col, Row, Typography, Badge, Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Text, Paragraph } = Typography

const pricingPlans = [
  {
    title: 'Basic Clean',
    price: '$120',
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
    price: '$220',
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
    price: '$320',
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
      style={{ display: highlighted ? 'block' : 'none' }}
    >
      <Card
        bordered
        className={highlighted ? 'border-green-600 shadow-lg' : 'shadow-sm'}
        style={{ borderColor: highlighted ? '#16a34a' : undefined }}
        bodyStyle={{ padding: 24 }}
      >
        <Title level={4}>{title}</Title>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <Title level={2} style={{ marginBottom: 0 }}>{price}</Title>
          <Text type="secondary">/ per visit</Text>
        </div>
        <Paragraph type="secondary">{description}</Paragraph>
        <ul style={{ marginTop: 16, paddingLeft: 20 }}>
          {features.map((feature, idx) => (
            <li key={idx} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
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
              backgroundColor: highlighted ? '#16a34a' : undefined,
              borderColor: highlighted ? '#16a34a' : undefined,
              color: highlighted ? 'white' : undefined,
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
