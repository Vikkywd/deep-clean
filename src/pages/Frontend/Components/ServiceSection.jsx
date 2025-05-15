'use client'

import React from 'react'
import { Card, Col, Row, Typography, Badge } from 'antd'
import carpetClean from '../../../images/carpet.jpeg'
import moveInOut from '../../../images/moveInOut.jpeg'
import commercialClean from '../../../images/commercialClean.jpeg'
import windowClean from '../../../images/window.jpeg'
import deepClean from '../../../images/deepclean.jpeg'
import residencialClean from '../../../images/residencialClean.jpeg'

const { Title, Text, Paragraph } = Typography

const services = [
  {
    title: 'Residential Cleaning',
    description: 'Complete home cleaning services including kitchens, bathrooms, living areas, and bedrooms.',
    image: residencialClean,
  },
  {
    title: 'Commercial Cleaning',
    description: 'Professional cleaning for offices, retail spaces, and commercial properties.',
    image: commercialClean,
  },
  {
    title: 'Deep Cleaning',
    description: 'Thorough cleaning of hard-to-reach areas and detailed attention to all surfaces.',
    image: deepClean,
  },
  {
    title: 'Move In/Out Cleaning',
    description: "Comprehensive cleaning services for when you're moving in or out of a property.",
    image: moveInOut,
  },
  {
    title: 'Window Cleaning',
    description: 'Professional window cleaning for crystal clear results inside and out.',
    image: windowClean,
  },
  {
    title: 'Carpet Cleaning',
    description: 'Deep carpet cleaning using professional equipment and eco-friendly products.',
    image: carpetClean,
  },
]

function ServiceCard({ title, description, image }) {
  return (
    <Col xs={24} sm={12} lg={8}>
      <Card
        hoverable
        variant
        className="shadow-sm"
        style={{ borderRadius: 12, textAlign: 'center' }}
        // style={{ padding: 24 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }} id="services">
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
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Comprehensive Cleaning Solutions</h2>
          {/* <Title level={2}>Comprehensive Cleaning Solutions</Title> */}
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
