import React, { useState, useEffect } from 'react';
import { Send, MapPin, Phone, Mail, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const ContactUs = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'We will connect you soon, thank you for contacting' });
        
        // Construct WhatsApp link
        const waNumber = '919850798962';
        const waMessage = `*New Inquiry from Gurukul Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
        const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;
        
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Redirect to whatsapp after a small delay
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1500);
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ type: 'error', message: 'Failed to connect to the server. Please check if the backend is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us - Location & Inquiry" 
        description="Get in touch with Gurukul Vidya Niketan Nashik. Find our location, phone numbers, and an inquiry form to reach us for any queries."
        keywords="Gurukul Vidya Niketan contact, school phone number, school address Nashik, admission inquiry, contact form"
      />
      <section className="section overflow-hidden" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center" 
            style={{ marginBottom: '1rem' }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))', 
              backdropFilter: 'blur(10px)', 
              border: '1px solid var(--accent-light)', 
              padding: windowWidth < 768 ? '0.5rem 1.2rem' : '0.6rem 2.5rem', 
              borderRadius: '999px', 
              marginBottom: '1rem', 
              color: 'var(--accent-color)', 
              fontWeight: '700', 
              fontSize: windowWidth < 768 ? '1.4rem' : '2.2rem', 
              fontFamily: "'Caveat', cursive",
              whiteSpace: 'nowrap'
            }}>
              <Sparkles size={windowWidth < 768 ? 24 : 32} /> Contact <span style={{ color: 'var(--text-primary)', marginLeft: '10px' }}>Us</span>
            </div>
            <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.4em] text-xs">Join our legacy of excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              
              <div className="matte-card" style={{ padding: '3rem' }}>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <AnimatePresence>
                    {status.message && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ 
                          padding: '1rem', 
                          borderRadius: '12px', 
                          background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`,
                          color: status.type === 'success' ? '#065f46' : '#991b1b',
                          fontSize: '0.9rem',
                          fontWeight: 500
                        }}
                      >
                        {status.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: 'var(--text-primary)' }}>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="matte-input" 
                      placeholder="e.g. Rahul Sharma" 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="matte-input" 
                      placeholder="e.g. rahul@example.com" 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: 'var(--text-primary)' }}>Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="matte-input" 
                      placeholder="How can we help you?" 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: 'var(--text-primary)' }}>Message</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="matte-input" 
                      rows={5} 
                      placeholder="Your message here..."
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                    type="submit" 
                    className="matte-button matte-button-primary" 
                    style={{ 
                      justifySelf: 'start', 
                      alignSelf: 'flex-start', 
                      marginTop: '1rem',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Processing... <Loader2 size={18} className="animate-spin" /></span>
                    ) : (
                      <span className="flex items-center gap-2">Send Message <Send size={18} /></span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* Info Cards */}
              <div className="grid grid-cols-1 gap-4">
                <motion.div whileHover={{ y: -5 }} className="matte-card flex items-center gap-4" style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))' }}>
                  <div style={{ padding: '1rem', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #3b82f6)', color: 'white', boxShadow: '0 5px 10px rgba(16, 185, 129, 0.3)' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>Visit Us</h4>
                    <p style={{ margin: 0, color: '#475569' }}>vitthal parth apt, Kranti Nagar, Makhmalabad Road, Panchavati, Nashik 422003</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="matte-card flex items-center gap-4" style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))' }}>
                  <div style={{ padding: '1rem', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', color: 'white', boxShadow: '0 5px 10px rgba(139, 92, 246, 0.3)' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>Call Us</h4>
                    <p style={{ margin: 0, color: '#475569' }}>
                      Mobile: +91 98507 98962, 98906 33963 <br/> 
                      Phone: 0253-2313962
                    </p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="matte-card flex items-center gap-4" style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.6))' }}>
                  <div style={{ padding: '1rem', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #ec4899)', color: 'white', boxShadow: '0 5px 10px rgba(245, 158, 11, 0.3)' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>Email Us</h4>
                    <p style={{ margin: 0, color: '#475569' }}>
                      <a href="mailto:officialsanskarschool@gmail.com" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s', ':hover': { color: 'var(--accent-color)' } }}>
                        officialsanskarschool@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Map Image */}
              <div className="matte-card" style={{ padding: '1.5rem', flex: 1, minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Campus Location</h3>
                <div style={{ flex: 1, borderRadius: 'var(--radius-sm)', overflow: 'hidden', boxShadow: 'var(--shadow-in)' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                      alt="Map Location" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      className="image-rounded"
                    />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
