import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh', padding: '120px 20px 80px' }}>
      <SEO 
        title="Privacy Policy" 
        description="Our commitment to protecting your privacy at Gurukul Vidya Niketan. Learn how we handle and safeguard your personal information."
        keywords="Gurukul Vidya Niketan privacy policy, data protection, school privacy, student data safety"
      />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="matte-card" 
          style={{ padding: '3rem', borderRadius: '0', background: 'white' }}
        >
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: '#eff6ff', borderRadius: '50%', color: '#3b82f6', marginBottom: '1.5rem' }}>
              <Shield size={40} />
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem', fontFamily: "'Caveat', cursive" }}>Privacy Policy</h1>
            <p style={{ color: '#64748b' }}>Effective Date: March 6, 2026</p>
          </div>

          <div className="space-y-8" style={{ color: '#445566', lineHeight: '1.8' }}>
            <section>
              <h2 style={sectionTitleStyle}>1. Introduction</h2>
              <p>Gurukul Vidhya Niketan ("we," "us," or "our") is committed to protecting the privacy of our students, parents, and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>2. Information We Collect</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
                <div style={infoBlockStyle}>
                  <Lock size={20} style={{ color: '#3b82f6' }} />
                  <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Personal Data</h4>
                    <p style={{ fontSize: '0.9rem' }}>Names, email addresses, phone numbers, and address provided during admission queries.</p>
                  </div>
                </div>
                <div style={infoBlockStyle}>
                  <Eye size={20} style={{ color: '#10b981' }} />
                  <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Usage Data</h4>
                    <p style={{ fontSize: '0.9rem' }}>IP addresses, browser type, and pages visited on our school portal.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>3. How We Use Information</h2>
              <ul style={{ listStyle: 'none' }}>
                <li style={listItemStyle}>• To process school admissions and enrollment.</li>
                <li style={listItemStyle}>• To send school announcements and newsletters.</li>
                <li style={listItemStyle}>• To improve our educational portal and user experience.</li>
                <li style={listItemStyle}>• To comply with educational legal requirements.</li>
              </ul>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>4. Data Protection</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored in secured networks and is only accessible by a limited number of persons who have special access rights.</p>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>Email: <a href="mailto:privacy@gurukul.edu" style={{ color: '#3b82f6', textDecoration: 'none' }}>privacy@gurukul.edu</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const sectionTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '800',
  color: '#1e293b',
  marginBottom: '1rem',
  borderLeft: '4px solid #3b82f6',
  paddingLeft: '1rem'
};

const infoBlockStyle = {
  background: '#f8fafc',
  padding: '1.5rem',
  borderRadius: '0',
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-start'
};

const listItemStyle = {
  marginBottom: '0.5rem',
  paddingLeft: '0.5rem'
};

export default PrivacyPolicy;
