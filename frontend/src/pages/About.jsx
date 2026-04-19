import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Heart, Shield, Sparkles, GraduationCap, Brain, Lightbulb, BookOpen, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import img1 from '../assets/aboutPage/annaulday8.JPG';
import img2 from '../assets/aboutPage/left_img.png';
import img3 from '../assets/aboutPage/right_Img.png';
import SEO from '../components/SEO';

const About = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 992 && windowWidth > 768;
  const isDesktop = windowWidth > 992;
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="about-page" style={{ overflowX: 'hidden' }}>
      <SEO 
        title="About Us - Vision & Mission" 
        description="Learn more about the history, vision, and mission of Gurukul Vidya Niketan Nashik. See why we are committed to excellence in education and character building."
        keywords="Gurukul Vidya Niketan, about us, school mission, vision, education philosophy, Nashik school history"
      />
      <section className="section overflow-visible" style={{ paddingTop: '2.5rem', paddingBottom: '0' }}>
        <div className="container" style={{ position: 'relative', padding: isMobile ? '0 1.5rem' : '0 2rem' }}>
          {/* Hero Section Container */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isDesktop ? 'row' : 'column', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: isDesktop ? '3rem' : '2rem', 
            marginBottom: '0', 
            padding: isMobile ? '2rem 1rem' : '1rem 2rem 0', 
            borderRadius: 'var(--radius-lg)' 
          }}>
            
            {/* Text Section (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ flex: 1, textAlign: isDesktop ? 'left' : 'center' }}
            >
              <h1 style={{ 
                fontSize: isMobile ? '1.8rem' : isTablet ? '3rem' : '3.5rem', 
                fontWeight: '800', 
                fontFamily: 'Inter, sans-serif', 
                color: 'var(--accent-color)', 
                marginBottom: '1.5rem', 
                lineHeight: 1.1, 
                letterSpacing: '-0.02em', 
                background: '-webkit-linear-gradient(45deg, #111827, #374151)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap'
              }}>
                Our Story & Vision
              </h1>
              <p style={{ 
                fontSize: isMobile ? '1.1rem' : '1.25rem', 
                color: '#4b5563', 
                marginBottom: isMobile ? '2rem' : '2.5rem', 
                lineHeight: 1.6, 
                maxWidth: isDesktop ? '600px' : '100%',
                margin: isDesktop ? '0 0 2.5rem 0' : '0 auto 2rem',
                textAlign: 'justify'
              }}>
                Established with a singular vision to redefine quality education, Gurukul Vidhya Niketan blends traditional Indian values with modern educational methodologies. We are committed to fostering an environment where young minds can flourish, explore, and grow into responsible global citizens. With experienced teachers and a student-friendly approach, we guide students at every step of their learning journey. We believe in overall development, including academics, skills, and personality growth, helping students become responsible and successful individuals in the future.
              </p>
              <button 
                onClick={() => navigate('/admissions')}
                style={{ backgroundColor: '#000', color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', border: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'; }}
              >
                Join Now
              </button>
            </motion.div>

            {/* Interaction Flip Card Section (Right) */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: isDesktop ? 'flex-end' : 'center', 
              alignItems: 'center', 
              height: isMobile ? '350px' : '450px',
              width: '100%',
              marginTop: isDesktop ? '0' : '1.5rem',
              perspective: '1200px'
            }}>
              <motion.div 
                style={{ 
                  position: 'relative', 
                  width: '320px', 
                  height: '420px', 
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    position: 'relative',
                    transformStyle: 'preserve-3d'
                  }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ 
                    duration: 0.8, 
                    type: 'spring', 
                    stiffness: 150, 
                    damping: 20 
                  }}
                >
                  {/* Front Side */}
                  <div style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    backfaceVisibility: 'hidden',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    border: '8px solid white',
                    boxShadow: 'var(--shadow-out)'
                  }}>
                    <img 
                      src={img1} 
                      alt="Gurukul Memory Front" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>

                  {/* Back Side */}
                  <div style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    backfaceVisibility: 'hidden',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    border: '8px solid white',
                    boxShadow: 'var(--shadow-out)',
                    transform: 'rotateY(180deg)'
                  }}>
                    <img 
                      src={img2} 
                      alt="Gurukul Memory Back" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* CBSE Pattern Educational Roadmap Section */}
      <section className="section" style={{ padding: isMobile ? '4rem 0' : '5rem 0 8rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}
            >
              The CBSE Pattern Roadmap
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: isMobile ? '1.1rem' : '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}
            >
              A structured, holistic approach to learning that smoothly guides students from foundational curiosity to board-exam excellence.
            </motion.p>
          </div>

          {/* Timeline Container */}
          <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Center Vertical Line */}
            <div style={{ 
              position: 'absolute', 
              top: '0', 
              bottom: '0', 
              left: isMobile ? '20px' : '50%', 
              width: '4px', 
              background: 'linear-gradient(to bottom, rgba(79, 70, 229, 0.1), var(--accent-color), rgba(79, 70, 229, 0.1))',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              borderRadius: '2px',
              zIndex: 0
            }} />

            {/* Step 1: Foundational Wing */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 30 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'row', alignItems: 'center', position: 'relative', marginBottom: isMobile ? '3rem' : '4rem', zIndex: 1 }}
            >
              <div style={{ flex: 1, display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', paddingRight: isMobile ? '0' : '3rem', paddingLeft: isMobile ? '50px' : '0', width: '100%' }}>
                <div className="matte-card" style={{ width: '100%', maxWidth: isMobile ? '100%' : '450px', position: 'relative', overflow: 'visible' }}>
                  <div style={{ position: 'absolute', top: '-15px', right: isMobile ? '15px' : '-15px', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: 'bold', padding: '0.4rem 1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)', fontSize: isMobile ? '0.8rem' : '1rem' }}>Phase 1</div>
                  <h3 style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: 'var(--accent-color)' }}>Foundational Wing</h3>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>Classes I to III</p>
                  <p style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Focusing on play-way methods, basic literacy, numeracy, and environmental awareness. Building a love for learning through interactive and joyful activities.</p>
                </div>
              </div>
              <div style={{ position: 'absolute', left: isMobile ? '20px' : '50%', transform: 'translateX(-50%)', width: isMobile ? '40px' : '50px', height: isMobile ? '40px' : '50px', borderRadius: '50%', background: 'white', border: '4px solid var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 0 8px rgba(255,255,255,0.5)' }}>
                <Brain size={isMobile ? 20 : 24} color="var(--accent-color)" />
              </div>
              {!isMobile && <div style={{ flex: 1 }} />}
            </motion.div>

            {/* Step 2: Preparatory Wing */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', marginBottom: isMobile ? '3rem' : '4rem', zIndex: 1 }}
            >
              {!isMobile && <div style={{ flex: 1 }} />}
              <div style={{ position: 'absolute', left: isMobile ? '20px' : '50%', transform: 'translateX(-50%)', width: isMobile ? '40px' : '50px', height: isMobile ? '40px' : '50px', borderRadius: '50%', background: 'white', border: '4px solid var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 0 8px rgba(255,255,255,0.5)' }}>
                <Lightbulb size={isMobile ? 20 : 24} color="var(--accent-color)" />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: isMobile ? '50px' : '3rem', width: '100%' }}>
                <div className="matte-card" style={{ width: '100%', maxWidth: isMobile ? '100%' : '450px', position: 'relative', overflow: 'visible' }}>
                  <div style={{ position: 'absolute', top: '-15px', left: isMobile ? 'auto' : '-15px', right: isMobile ? '15px' : 'auto', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', fontWeight: 'bold', padding: '0.4rem 1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(245, 158, 11, 0.3)', fontSize: isMobile ? '0.8rem' : '1rem' }}>Phase 2</div>
                  <h3 style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: 'var(--accent-color)' }}>Preparatory Wing</h3>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>Classes IV to V</p>
                  <p style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Transitioning to formal learning. Introduction to independent reading, writing, and logical mathematics. Emphasis is placed on discovering individual talents and hobbies.</p>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Middle Wing */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 30 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', marginBottom: isMobile ? '3rem' : '4rem', zIndex: 1 }}
            >
              <div style={{ flex: 1, display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', paddingRight: isMobile ? '0' : '3rem', paddingLeft: isMobile ? '50px' : '0', width: '100%' }}>
                <div className="matte-card" style={{ width: '100%', maxWidth: isMobile ? '100%' : '450px', position: 'relative', overflow: 'visible' }}>
                  <div style={{ position: 'absolute', top: '-15px', right: isMobile ? '15px' : '-15px', background: 'linear-gradient(135deg, #ec4899, #be185d)', color: 'white', fontWeight: 'bold', padding: '0.4rem 1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(236, 72, 153, 0.3)', fontSize: isMobile ? '0.8rem' : '1rem' }}>Phase 3</div>
                  <h3 style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: 'var(--accent-color)' }}>Middle Wing</h3>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>Classes VI to VIII</p>
                  <p style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Abstract concepts in Sciences and Mathematics are introduced. Strong focus on critical thinking, collaborative projects, and comprehensive subject understanding in alignment with NCERT guidelines.</p>
                </div>
              </div>
              <div style={{ position: 'absolute', left: isMobile ? '20px' : '50%', transform: 'translateX(-50%)', width: isMobile ? '40px' : '50px', height: isMobile ? '40px' : '50px', borderRadius: '50%', background: 'white', border: '4px solid var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 0 8px rgba(255,255,255,0.5)' }}>
                <BookOpen size={isMobile ? 20 : 24} color="var(--accent-color)" />
              </div>
              {!isMobile && <div style={{ flex: 1 }} />}
            </motion.div>

            {/* Step 4: Secondary Wing */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', zIndex: 1 }}
            >
              {!isMobile && <div style={{ flex: 1 }} />}
              <div style={{ position: 'absolute', left: isMobile ? '20px' : '50%', transform: 'translateX(-50%)', width: isMobile ? '40px' : '50px', height: isMobile ? '40px' : '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-color), #3730A3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 0 8px rgba(255,255,255,0.5), 0 10px 15px -3px rgba(79, 70, 229, 0.5)' }}>
                <GraduationCap size={isMobile ? 20 : 24} color="white" />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: isMobile ? '50px' : '3rem', width: '100%' }}>
                <div className="matte-card" style={{ width: '100%', maxWidth: isMobile ? '1000px' : '450px', position: 'relative', border: '1px solid var(--accent-color)', overflow: 'visible' }}>
                  <div style={{ position: 'absolute', top: '-15px', left: isMobile ? 'auto' : '-15px', right: isMobile ? '15px' : 'auto', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', fontWeight: 'bold', padding: '0.4rem 1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)', fontSize: isMobile ? '0.8rem' : '1rem' }}>Phase 4</div>
                  <h3 style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', color: 'var(--accent-color)' }}>Secondary Wing</h3>
                  <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>Classes IX to X</p>
                  <p style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>Rigorous academic preparation for the CBSE Board Examinations. In-depth subject analysis, regular assessments, career counseling, and advanced laboratory work to ensure outstanding results.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Infrastructure Video Section */}
      <section id="infrastructure" className="section bg-slate-50" style={{ padding: isMobile ? '4rem 0' : '5rem 0', position: 'relative' }}>
        <div className="container" style={{ padding: isMobile ? '0 1.5rem' : '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: isMobile ? '2rem' : '3rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2, fontWeight: '800' }}
            >
              World-Class Infrastructure
            </motion.h2>
            <p style={{ fontSize: isMobile ? '1rem' : '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Take a virtual tour of our modern campus designed to foster creativity, learning, and growth.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ 
              maxWidth: '900px', 
              margin: '0 auto',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '6px solid white',
              backgroundColor: 'white'
            }}
          >
            <video 
              controls 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem' }}
            >
              <source src="/videos/school_infrastructure.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
