import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer style={{ 
      background: 'linear-gradient(to bottom, #1e293b, #0f172a)', 
      color: 'white', 
      padding: '5rem 0 2rem',
      position: 'relative'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(4, 1fr)', 
          gap: '2.5rem' 
        }}>
          {/* About Column */}
          <div className="space-y-6">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '800', 
                fontFamily: "'Caveat', cursive", 
                color: 'var(--accent-color)',
                marginBottom: '1.5rem',
                cursor: 'pointer'
              }}>
                Gurukul Vidya Niketan
              </h3>
            </Link>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '0.95rem' }}>
              Empowering students with a perfect blend of modern innovation and traditional values. We foster excellence in every child through holistic education.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" className="social-icon" style={socialIconStyle}><Facebook size={20} /></a>
              <a href="#" className="social-icon" style={socialIconStyle}><Instagram size={20} /></a>
              <a href="#" className="social-icon" style={socialIconStyle}><Youtube size={20} /></a>
              <a href="#" className="social-icon" style={socialIconStyle}><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={columnTitleStyle}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', spaceY: '0.8rem' }}>
              <li style={listLinkStyle}><ArrowRight size={14} style={{ color: 'var(--accent-color)' }} /> <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>Our Story</Link></li>
              <li style={listLinkStyle}><ArrowRight size={14} style={{ color: 'var(--accent-color)' }} /> <Link to="/staff" style={{ color: 'inherit', textDecoration: 'none' }}>Staff Team</Link></li>
              <li style={listLinkStyle}><ArrowRight size={14} style={{ color: 'var(--accent-color)' }} /> <Link to="/admissions" style={{ color: 'inherit', textDecoration: 'none' }}>Admissions</Link></li>
              <li style={listLinkStyle}><ArrowRight size={14} style={{ color: 'var(--accent-color)' }} /> <Link to="/events" style={{ color: 'inherit', textDecoration: 'none' }}>Events</Link></li>
              <li style={listLinkStyle}><ArrowRight size={14} style={{ color: 'var(--accent-color)' }} /> <Link to="/testimonials" style={{ color: 'inherit', textDecoration: 'none' }}>Success Stories</Link></li>
              <li style={listLinkStyle}><ArrowRight size={14} style={{ color: 'var(--accent-color)' }} /> <Link to="/contact-us" style={{ color: 'inherit', textDecoration: 'none' }}>Get in Touch</Link></li>
            </ul>
          </div>

          {/* Academic Paths Column */}
          <div>
            <h4 style={columnTitleStyle}>Academic Paths</h4>
            <ul style={{ listStyle: 'none', spaceY: '0.8rem' }}>
              <li style={listLinkStyle}><div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%' }} /> Primary Wing</li>
              <li style={listLinkStyle}><div style={{ width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%' }} /> Secondary Wing</li>
              <li style={listLinkStyle}><div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }} /> Sports Academy</li>
              <li style={listLinkStyle}><div style={{ width: '6px', height: '6px', background: '#f59e0b', borderRadius: '50%' }} /> Tech Labs</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={columnTitleStyle}>Visit Us</h4>
            <div className="space-y-4">
              <div style={contactBlockStyle}>
                <MapPin size={20} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>vitthal parth apt, Kranti Nagar, Makhmalabad Road, Panchavati, Nashik 422003</p>
              </div>
              <div style={contactBlockStyle}>
                <Phone size={20} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href="tel:+919850798962" style={{ color: '#94a3b8', fontSize: '0.95rem', textDecoration: 'none' }}>+91 98507 98962</a>
                  <a href="tel:+919890633963" style={{ color: '#94a3b8', fontSize: '0.95rem', textDecoration: 'none' }}>+91 98906 33963</a>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>Ph: 0253-2313962</p>
                </div>
              </div>
              <div style={contactBlockStyle}>
                <Mail size={20} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                <a href="mailto:officialsanskarschool@gmail.com" style={{ color: '#94a3b8', fontSize: '0.95rem', textDecoration: 'none' }}>officialsanskarschool@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '4rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid rgba(148, 163, 184, 0.1)', 
          textAlign: 'center' 
        }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Gurukul Vidya Niketan. All rights reserved. | 
            <Link to="/privacy" style={{ color: '#94a3b8', marginLeft: '10px', textDecoration: 'none' }}>Privacy Policy</Link> | 
            <Link to="/terms" style={{ color: '#94a3b8', marginLeft: '10px', textDecoration: 'none' }}>Terms & Conditions</Link> | 
            <Link to="/sitemap" style={{ color: '#94a3b8', marginLeft: '10px', textDecoration: 'none' }}>SiteMap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Internal styles for premium look
const socialIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'white',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
};

const columnTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: 'white',
  marginBottom: '1.5rem',
  position: 'relative'
};

const listLinkStyle = {
  color: '#94a3b8',
  fontSize: '0.95rem',
  marginBottom: '0.8rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  transition: 'color 0.2s ease',
  cursor: 'pointer'
};

const contactBlockStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-start',
  marginBottom: '1.2rem'
};

export default Footer;
