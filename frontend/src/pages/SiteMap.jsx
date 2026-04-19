import React from 'react';
import { motion } from 'framer-motion';
import { Map, Home, Info, BookOpen, UserCheck, Phone, Shield, FileText, Layout } from 'lucide-react';
import SEO from '../components/SEO';

const SiteMap = () => {
  const sections = [
    {
      title: 'Main Navigation',
      icon: <Home size={24} style={{ color: '#3b82f6' }} />,
      links: [
        { name: 'Home Landing', path: '/' },
        { name: 'About Gurukul', path: '/about' },
        { name: 'Academic Events', path: '/events' },
        { name: 'Admissions Portal', path: '/admissions' },
        { name: 'Contact Our Team', path: '/contact-us' }
      ]
    },
    {
      title: 'Academic Life',
      icon: <BookOpen size={24} style={{ color: '#10b981' }} />,
      links: [
        { name: 'Primary Wing Path', path: '/events' },
        { name: 'Secondary Wing Path', path: '/events' },
        { name: 'Principal\'s Desk Message', path: '/principal-desk' },
        { name: 'Campus Facilities', path: '/about' }
      ]
    },
    {
      title: 'Legal & Policy',
      icon: <Shield size={24} style={{ color: '#64748b' }} />,
      links: [
        { name: 'Privacy Policy Document', path: '/privacy' },
        { name: 'Terms and Conditions', path: '/terms' },
        { name: 'Official SiteMap', path: '/sitemap' }
      ]
    }
  ];

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', padding: '120px 20px 80px' }}>
      <SEO 
        title="Site Map" 
        description="Navigate through the Gurukul Vidya Niketan website easily. Find links to all our sections including Admissions, Events, and About Us."
        keywords="Gurukul Vidya Niketan site map, school website navigation, school portal links"
      />
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="matte-card"
          style={{ padding: '4rem', borderRadius: '0', background: 'white' }}
        >
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: '#f0f9ff', borderRadius: '50%', color: '#0ea5e9', marginBottom: '1.5rem' }}>
              <Map size={40} />
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem', fontFamily: "'Caveat', cursive" }}>Site Map</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Find your way around Gurukul Vidya Niketan website.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {sections.map((section, idx) => (
              <div key={idx} style={{ background: '#fbfcfd', padding: '2rem', borderRadius: '0', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {section.icon}
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#334455' }}>{section.title}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx} style={{ marginBottom: '1rem' }}>
                      <a 
                        href={link.path} 
                        style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                        onMouseLeave={(e) => e.target.style.color = '#64748b'}
                      >
                        <div style={{ width: '4px', height: '4px', background: '#cbd5e1', borderRadius: '50%' }} />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteMap;
