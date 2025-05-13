import React from 'react';
// import 'antd/dist/antd.min.css';
import './LandingPage.css';
import Header from './Components/Header';
import { HeroSection } from './Components/HeroSection';
import { ServicesSection } from './Components/ServiceSection';
import { AboutSection } from './Components/AboutSection';
import { TestimonialsSection } from './Components/Testionmial';
import { PricingSection } from './Components/PricingSection';
import { ContactSection } from './Components/ContactSection';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Footer } from './Components/Footer';


const LandingPage = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
    <Header />

    <Content style={{ flex: 1, padding: 0 }}>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
    </Content>
    <Footer />
  </Layout>
  );
};

export default LandingPage;
