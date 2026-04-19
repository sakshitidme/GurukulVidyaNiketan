import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, FileLock } from 'lucide-react';
import SEO from '../components/SEO';

const TermsConditions = () => {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh', padding: '120px 20px 80px' }}>
      <SEO 
        title="Terms & Conditions" 
        description="Terms and conditions for using the Gurukul Vidya Niketan website and services. Please read these terms carefully before using our portal."
        keywords="Gurukul Vidya Niketan terms, school website rules, portal usage terms, school legal information"
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
            <div style={{ display: 'inline-flex', padding: '1rem', background: '#fef2f2', borderRadius: '50%', color: '#ef4444', marginBottom: '1.5rem' }}>
              <FileText size={40} />
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem', fontFamily: "'Caveat', cursive" }}>Terms & Conditions</h1>
            <p style={{ color: '#64748b' }}>Last Updated: March 6, 2026</p>
          </div>

          <div className="space-y-8" style={{ color: '#445566', lineHeight: '1.8' }}>
            <section>
              <h2 style={sectionTitleStyle}>1. Acceptance of Terms</h2>
              <p>By accessing or using the Gurukul Vidhya Niketan website, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.</p>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>2. Educational Use Only</h2>
              <p>The information provided on this website is for general educational purposes and informational use only. We reserve the right to modify school policies, fees, and curricula at any time.</p>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>3. User Conduct</h2>
              <div style={ruleBoxStyle}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <p>Users must not use the website for any unlawful purpose.</p>
              </div>
              <div style={ruleBoxStyle}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <p>Downloading or modifying school portal content is strictly prohibited.</p>
              </div>
              <div style={ruleBoxStyle}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <p>Unauthorized access to student databases will result in legal action.</p>
              </div>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>4. Intellectual Property</h2>
              <p>All logos, text, curriculum designs, and media on this website are the property of Gurukul Vidhya Niketan and protected by copyright laws.</p>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>5. Limitation of Liability</h2>
              <div style={alertBoxStyle}>
                <AlertCircle size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <p style={{ fontSize: '0.9rem' }}>The school will not be liable for any indirect or consequential damages resulting from the use or inability to use the website portal.</p>
              </div>
            </section>

            <section>
              <h2 style={sectionTitleStyle}>6. Contact Information</h2>
              <p>For any legal inquiries regarding these terms, please contact our administration at:</p>
              <p>Email: <a href="mailto:legal@gurukul.edu" style={{ color: '#ef4444', textDecoration: 'none' }}>legal@gurukul.edu</a></p>
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
  borderLeft: '4px solid #ef4444',
  paddingLeft: '1rem'
};

const ruleBoxStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  background: '#f8fafc',
  padding: '1rem',
  marginBottom: '0.8rem',
  borderRadius: '0',
  fontSize: '0.95rem'
};

const alertBoxStyle = {
  background: '#fffbeb',
  border: '1px solid #fef3c7',
  padding: '1.5rem',
  borderRadius: '0',
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-start'
};

export default TermsConditions;
