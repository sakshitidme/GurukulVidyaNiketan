import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Trophy, Award, Target, Star, Shield, Microscope, Sparkles, Phone, GraduationCap, Backpack, Pencil, Ruler } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import heroImg from '../assets/happy_kids_school_hero.png';
import primaryImg from '../assets/home/annulday7.JPG';
import secondaryImg from '../assets/home/award1.JPG';
import cultureImg from '../assets/home/jamashtami.JPG';
import SEO from '../components/SEO';

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({ name: '', content: '', stars: 5, role: 'Parent' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewStatus, setReviewStatus] = useState('');
  const [dynamicReviews, setDynamicReviews] = useState([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    fetchApprovedReviews();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchApprovedReviews = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/reviews');
      const data = await res.json();
      setDynamicReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewFormData)
      });
      const data = await res.json();
      if (data.success) {
        setReviewStatus('Review submitted! It will appear after approval.');
        setTimeout(() => {
          setShowReviewModal(false);
          setReviewStatus('');
          setReviewFormData({ name: '', content: '', stars: 5, role: 'Parent' });
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  const carouselItems = [
    { number: "500+", text: "Happy Students", icon: <Users size={28} color="#3b82f6" /> },
    { number: "15+", text: "Expert Teachers", icon: <Award size={28} color="#ec4899" /> },
    { number: "05+", text: "Years of Legacy", icon: <Star size={28} color="#f59e0b" /> },
    { number: "Modern", text: "Computer Lab", icon: <Microscope size={28} color="#10b981" /> },
    { number: "100%", text: "Safety & Care", icon: <Target size={28} color="#8b5cf6" /> },
    { number: "Kids' Zone", text: "Play Area", icon: <Shield size={28} color="#14b8a6" /> }
  ];

  const scrollingItems = [...carouselItems, ...carouselItems, ...carouselItems];

  return (
    <div className="home-page">
      <SEO 
        title="Home - Top English Medium School in Nashik" 
        description="Welcome to Gurukul Vidya Niketan, the premier English medium school in Nashik. We offer high-quality education, state-of-the-art facilities, and a holistic learning environment for child development."
        keywords="Gurukul Vidya Niketan, school in Nashik, top school Nashik, English medium school, holistic education, best school in Nashik"
      />
      {/* Premium Hero Section */}
      <section className="section" style={{ minHeight: windowWidth < 768 ? 'auto' : '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: windowWidth < 768 ? '6rem' : '4rem', paddingBottom: windowWidth < 768 ? '4rem' : '4rem' }}>
        
        {/* Background Image with Increased Opacity */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundImage: `url(${heroImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.18, 
          zIndex: 0,
          filter: 'grayscale(10%)'
        }} />

        {/* Floating School Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', left: '10%', color: 'var(--vibrant-yellow)', opacity: 0.6, zIndex: 1 }}
        >
          <Pencil size={48} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '15%', right: '15%', color: 'var(--vibrant-red)', opacity: 0.5, zIndex: 1 }}
        >
          <Backpack size={56} />
        </motion.div>
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '25%', left: '15%', color: 'var(--vibrant-green)', opacity: 0.5, zIndex: 1 }}
        >
          <BookOpen size={52} />
        </motion.div>
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '20%', right: '10%', color: 'var(--accent-color)', opacity: 0.6, zIndex: 1 }}
        >
          <Ruler size={48} />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '40%', right: '5%', color: 'var(--vibrant-orange)', opacity: 0.4, zIndex: 1 }}
        >
          <Sparkles size={40} />
        </motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                background: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(10px)', 
                border: '1px solid var(--accent-light)', 
                padding: '0.6rem 1.8rem', 
                borderRadius: '999px', 
                marginBottom: '2rem', 
                marginTop: windowWidth < 768 ? '-1rem' : '-2rem',
                boxShadow: 'var(--shadow-md)', 
                color: 'var(--accent-color)', 
                fontWeight: '700', 
                fontSize: '1.5rem',
                fontFamily: "'Caveat', cursive"
              }}
            >
              <Sparkles size={22} className="text-yellow-500" /> Shaping Bright Futures
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: windowWidth < 768 ? '2.2rem' : '3.8rem', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem', marginTop: '-0.5rem', color: 'var(--text-primary)' }}
            >
              Welcome to <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Gurukul Vidya Niketan</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontSize: windowWidth < 768 ? '1.1rem' : '1.35rem', color: '#475569', marginBottom: windowWidth < 768 ? '2rem' : '3.5rem', maxWidth: '750px', margin: '0 auto 3.5rem auto', lineHeight: 1.6 }}
            >
              Where tradition meets innovation. We provide a world-class educational experience designed to nurture intellect, character, and lifelong success.
            </motion.p>
            
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ display: 'flex', flexDirection: windowWidth < 768 ? 'column' : 'row', justifyContent: 'center', gap: '1rem' }}
              >
                <Link to="/admissions" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="matte-button matte-button-primary"
                    style={{ padding: windowWidth < 768 ? '1rem' : '1.2rem 2.5rem', fontSize: '1.1rem', width: '100%' }}
                  >
                    Apply Now <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                  </motion.button>
                </Link>
                <Link to="/events" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="matte-button"
                    style={{ padding: windowWidth < 768 ? '1rem' : '1.2rem 2.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', width: '100%' }}
                  >
                    Explore Events
                  </motion.button>
                </Link>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Carousel Section */}
      <section className="carousel-container" style={{ margin: '0' }}>
        <div className="carousel-track">
          {scrollingItems.map((item, index) => (
            <div key={index} className="carousel-item">
              <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.7)', borderRadius: '50%', boxShadow: 'var(--shadow-in)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <h4>{item.number}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stacking Cards Section */}
      <section ref={sectionRef} className="section" style={{ padding: '0', position: 'relative', marginTop: '0' }}>
        
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem', position: 'relative' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '1rem', 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))', 
                backdropFilter: 'blur(10px)', 
                border: '1px solid var(--accent-light)', 
                padding: windowWidth < 768 ? '0.6rem 1.5rem' : '0.8rem 3rem', 
                borderRadius: '999px', 
                marginBottom: '2rem', 
                color: 'var(--accent-color)', 
                fontWeight: '700', 
                fontSize: windowWidth < 768 ? '1.5rem' : '2.5rem', 
                fontFamily: "'Caveat', cursive",
                whiteSpace: 'nowrap'
              }}
            >
              <Sparkles size={40} />  Our Pillars of Excellence
            </motion.div>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>  We help every student grow with a clear and structured path, guiding them from curiosity to confidence and shaping them into future leaders.
  </p>  
          </div>
          
          <div style={{ position: 'relative' }}>
            {/* Card 1: Primary Wing */}
            <motion.div 
               style={{ 
                 position: 'sticky', 
                 top: '100px', 
                 background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                 color: 'var(--text-primary)',
                 borderRadius: '0',
                 padding: '2.5rem 2.5rem',
                 marginBottom: '32px',
                 boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.1)',
                 zIndex: 10,
                 border: '1px solid rgba(59, 130, 246, 0.2)',
                 display: 'grid',
                 gridTemplateColumns: windowWidth < 1024 ? '1fr' : '1.2fr 0.8fr',
                 gap: '2rem',
                 alignItems: 'center',
                 minHeight: '350px'
               }}
            >
              <div>
                <motion.span style={{ color: 'var(--accent-color)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', display: 'block', marginBottom: '0.8rem' }}>Foundational Journey</motion.span>
                <h3 style={{ fontSize: windowWidth < 768 ? '1.8rem' : '2.2rem', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1rem', fontWeight: '500' }}>The Primary Gurukul (Class 1st - 5th)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>Nurturing young minds with a blend of traditional values and modern pedagogy. We focus on building strong foundations in literacy, numeracy, and character through holistic learning.</p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><Sparkles size={14}/> Value-Based Education</div>
                  <div style={{ background: '#f0fdf4', color: '#15803d', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><Pencil size={14}/> Interactive Smart Classes</div>
                  <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><BookOpen size={14}/> Foundational Literacy</div>
                </div>
              </div>
              <div style={{ height: windowWidth < 768 ? '220px' : '280px', borderRadius: '0', overflow: 'hidden' }}>
                <img src={primaryImg} alt="Primary Wing" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            </motion.div>

            {/* Card 2: Secondary Wing */}
            <motion.div 
               style={{ 
                 position: 'sticky', 
                 top: '100px', 
                 background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                 color: 'var(--text-primary)',
                 borderRadius: '0',
                 padding: '2.5rem 2.5rem',
                 marginBottom: '32px',
                 boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                 zIndex: 20,
                 border: '1px solid var(--card-border)',
                 display: 'grid',
                 gridTemplateColumns: windowWidth < 1024 ? '1fr' : '1.2fr 0.8fr',
                 gap: '2rem',
                 alignItems: 'center',
                 minHeight: '350px'
               }}
            >
              <div>
                <motion.span style={{ color: '#8b5cf6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', display: 'block', marginBottom: '0.8rem' }}>Academic Excellence</motion.span>
                <h3 style={{ fontSize: windowWidth < 768 ? '1.8rem' : '2.2rem', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1rem', fontWeight: '800' }}>The Scholarly Wing (Class 6th - 10th)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>Empowering students with critical thinking, scientific inquiry, and a global outlook. Our curriculum prepares them for future leadership roles while staying rooted in our cultural heritage.</p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <div style={{ background: '#ede9fe', color: '#6d28d9', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><Microscope size={14}/> Science & Innovation</div>
                  <div style={{ background: '#fef3c7', color: '#b45309', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><Target size={14}/> Analytical Thinking</div>
                  <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><GraduationCap size={14}/> Leadership Skills</div>
                </div>
              </div>
              <div style={{ height: windowWidth < 768 ? '220px' : '280px', borderRadius: '0', overflow: 'hidden' }}>
                <img src={secondaryImg} alt="Secondary Wing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>

            {/* Card 3: Holistic Culture */}
            <motion.div 
               style={{ 
                 position: 'sticky', 
                 top: '100px', 
                 background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                 color: 'var(--text-primary)',
                 borderRadius: '0',
                 padding: '2.5rem 2.5rem',
                 marginBottom: '0',
                 boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.1)',
                 zIndex: 30,
                 border: '1px solid rgba(16, 185, 129, 0.2)',
                 display: 'grid',
                 gridTemplateColumns: windowWidth < 1024 ? '1fr' : '1.2fr 0.8fr',
                 gap: '2rem',
                 alignItems: 'center',
                 minHeight: '350px'
               }}
            >
              <div>
                <motion.span style={{ color: '#10b981', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', display: 'block', marginBottom: '0.8rem' }}>Beyond Academics</motion.span>
                <h3 style={{ fontSize: windowWidth < 768 ? '1.8rem' : '2.2rem', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1rem', fontWeight: '800' }}>Culture & Expression</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>At Gurukul Vidhya Niketan, we believe in the overall development of every child. Our campus vibrates with sports, arts, and festivals that celebrate our rich Indian heritage.</p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><Trophy size={14}/> Sports & Wellness</div>
                  <div style={{ background: '#ffedd5', color: '#c2410c', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><Star size={14}/> Cultural Festivals</div>
                  <div style={{ background: '#f3e8ff', color: '#7e22ce', padding: '0.4rem 0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}><Users size={14}/> Art & Heritage</div>
                </div>
              </div>
              <div style={{ height: windowWidth < 768 ? '220px' : '280px', borderRadius: '0', overflow: 'hidden' }}>
                <img src={cultureImg} alt="Campus Life" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ padding: '2rem 0 3rem', background: '#fafafa', overflow: 'hidden' }}>
        <div className="container" style={{ paddingTop: '0', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '4rem', position: 'relative' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.8rem', 
                background: 'rgba(15, 23, 42, 0.9)', 
                backdropFilter: 'blur(10px)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                padding: windowWidth < 768 ? '0.5rem 1.5rem' : '0.6rem 2.5rem', 
                borderRadius: '999px', 
                marginBottom: '2rem', 
                color: 'white', 
                fontWeight: '700', 
                fontSize: windowWidth < 768 ? '1.2rem' : '1.8rem', 
                fontFamily: "'Caveat', cursive",
                whiteSpace: 'nowrap'
              }}
            >
              <Sparkles size={28} /> Success Stories
            </motion.div>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>We provide a structured path for every student to grow from a curious child into a confident leader.</p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(4, 1fr)', 
            gap: '2rem' 
          }}>
            {(dynamicReviews.length > 0 ? dynamicReviews.slice(0, 4) : [
              {
                name: "DIVYA PATIL",
                role: "Parent",
                content: "The holistic approach to education at Gurukul has transformed my child's confidence and academic performance remarkably.",
                stars: 5,
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"
              },
              {
                name: "REKHA PAWAR",
                role: "Parent",
                content: "Gurukul provided me with more than just an education; it gave me the character and values that help me succeed every day.",
                stars: 5,
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
              },
              {
                name: "JYOTI NAGARE",
                role: "Parent",
                content: "We are extremely happy with the individual attention and the modern facilities provided by the school. Truly excellent!",
                stars: 5,
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600"
              },
              {
                name: "AMIT DESAI",
                role: "Student",
                content: "The teachers here are very supportive and the sports academy is world-class. I love being a part of this institution.",
                stars: 5,
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
              }
            ]).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                  textAlign: 'left',
                  border: '1px solid #f1f5f9',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.5rem' }}>
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#475569', 
                  lineHeight: '1.6', 
                  fontStyle: 'italic',
                  flex: 1
                }}>
                  "{t.content}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>{t.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: '600', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <Link to="/testimonials" style={{ textDecoration: 'none' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="matte-button matte-button-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1.2rem 3rem', fontSize: '1.1rem' }}
              >
                Read More Stories <ArrowRight size={20} />
              </motion.button>
            </Link>
            <motion.button 
              onClick={() => setShowReviewModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="matte-button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1.2rem 3rem', fontSize: '1.1rem', background: 'white', border: '2px solid var(--accent-color)', color: 'var(--accent-color)' }}
            >
              Write Your Review <Pencil size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      

      {/* Call to Action (CTA) Section */}
      <section className="section" style={{ padding: '2rem 1rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Animated CTA Background Shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, borderRadius: '50%' }}
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, borderRadius: '50%' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ 
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #a855f7)', /* Vibrant modern gradient */
              borderRadius: '2rem', 
              padding: '2rem 1.5rem', 
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 25px 60px -12px rgba(99, 102, 241, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Glass decoration inside CTA */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '0.4rem 1.2rem', borderRadius: '999px', marginBottom: '1rem', fontSize: '1.2rem' }}
                className="font-cursive"
              >
                <Sparkles size={18} /> Ready to start?
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ fontSize: window.innerWidth < 768 ? '2rem' : '3.2rem', color: 'white', marginBottom: '1rem', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              >
                Shape Their Future <br/>With Gurukul Vidhya Niketan
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.5 }}
              >
                Join our community of exceptional learners. Admissions are now open for the upcoming academic year. Secure your child's place today.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <Link to="/admissions" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '0.8rem', 
                      background: 'white', color: 'var(--accent-color)', 
                      padding: '1.2rem 2.5rem', borderRadius: '999px', 
                      fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  >
                    <GraduationCap size={22} /> Apply Now
                  </motion.button>
                </Link>
                
                <Link to="/contact-us" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '0.8rem', 
                      background: 'rgba(255,255,255,0.1)', color: 'white', 
                      border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)',
                      padding: '1.2rem 2.5rem', borderRadius: '999px', 
                      fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer'
                    }}
                  >
                    <Phone size={20} /> Contact Us
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ 
                position: 'relative', 
                zIndex: 1, 
                width: '100%', 
                maxWidth: '500px', 
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'white', 
                borderRadius: '2rem', 
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Review Us</h3>
                <button onClick={() => setShowReviewModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                   <Sparkles size={24} />
                </button>
              </div>

              {reviewStatus ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                   <Sparkles size={48} className="text-yellow-500 mx-auto mb-4" />
                   <p style={{ fontWeight: '700', color: '#1a1a1a' }}>{reviewStatus}</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                     <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Your Name</label>
                     <input 
                       required
                       type="text" 
                       value={reviewFormData.name}
                       onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                       placeholder="Enter your name" 
                       style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: '600' }} 
                     />
                   </div>
                   <div>
                     <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>I am a...</label>
                     <select 
                       value={reviewFormData.role}
                       onChange={(e) => setReviewFormData({ ...reviewFormData, role: e.target.value })}
                       style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: '600', background: 'white' }}
                     >
                       <option value="Parent">Parent</option>
                       <option value="Student">Student</option>
                       <option value="Alumni">Alumni</option>
                       <option value="Visitor">Visitor</option>
                     </select>
                   </div>
                   <div>
                     <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Rating</label>
                     <div style={{ display: 'flex', gap: '0.5rem' }}>
                       {[1, 2, 3, 4, 5].map((star) => (
                         <Star 
                           key={star} 
                           size={32} 
                           onClick={() => setReviewFormData({ ...reviewFormData, stars: star })}
                           fill={star <= reviewFormData.stars ? '#f59e0b' : 'none'} 
                           color={star <= reviewFormData.stars ? '#f59e0b' : '#e2e8f0'} 
                           style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                         />
                       ))}
                     </div>
                   </div>
                   <div>
                     <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Your Message</label>
                     <textarea 
                       required
                       value={reviewFormData.content}
                       onChange={(e) => setReviewFormData({ ...reviewFormData, content: e.target.value })}
                       placeholder="Share your experience..." 
                       rows={4}
                       style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: '600', resize: 'none' }} 
                     />
                   </div>
                   <motion.button 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     disabled={isSubmittingReview}
                     type="submit" 
                     className="matte-button matte-button-primary"
                     style={{ width: '100%', padding: '1.2rem', borderRadius: '1rem', fontSize: '1.1rem', marginTop: '0.5rem' }}
                   >
                     {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                   </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
