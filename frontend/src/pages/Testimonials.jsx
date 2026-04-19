import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles, Users, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const Testimonials = () => {
  const [dynamicReviews, setDynamicReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({ name: '', content: '', stars: 5, role: 'Parent' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewStatus, setReviewStatus] = useState('');

  useEffect(() => {
    fetchApprovedReviews();
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

  const staticReviews = [
    {
      name: "DIVYA PATIL",
      role: "Parent",
      content: "The holistic approach to education at Gurukul has transformed my child's confidence and academic performance remarkably.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "REKHA PAWAR",
      role: "Alumni",
      content: "Gurukul provided me with more than just an education; it gave me the character and values that help me succeed every day. The environment was truly supportive.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "JYOTI NAGARE",
      role: "Parent",
      content: "We are extremely happy with the individual attention and the modern facilities provided by the school. Truly excellent! My kids love going to school.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "AMIT DESAI",
      role: "Student",
      content: "The teachers here are very supportive and the sports academy is world-class. I love being a part of this institution and learning new things every day.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "SUNITA JADHAV",
      role: "Parent",
      content: "A wonderful place for kids to grow. The emphasis on both academics and extracurricular activities is what makes Gurukul stand out.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "RAHUL SHARMA",
      role: "Alumni",
      content: "The foundation I got at Gurukul helped me immensely in my higher studies and professional life. I am always grateful to my teachers.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "PRIYA KULKARNI",
      role: "Parent",
      content: "We've seen such positive changes in our son's behavior and learning habits since he joined Gurukul. The value system is commendable.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "SAMEER DESHMUKH",
      role: "Student",
      content: "I enjoy the science labs and the library the most. There's always something interesting to explore and learn at Gurukul.",
      stars: 5,
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="testimonials-page" style={{ background: 'transparent', minHeight: '100vh', padding: '40px 0 60px' }}>
      <SEO 
        title="Success Stories & Testimonials" 
        description="Read feedback and reviews from parents, students, and alumni about their experience with Gurukul Vidya Niketan. See how we've impacted our students' lives."
        keywords="Gurukul Vidya Niketan reviews, school testimonials, parent feedback, student success stories, best school reviews Nashik"
      />
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center" 
            style={{ marginBottom: '4rem' }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              background: 'rgba(15, 23, 42, 0.9)', 
              backdropFilter: 'blur(10px)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              padding: '0.6rem 2.5rem', 
              borderRadius: '999px', 
              marginBottom: '1.5rem', 
              color: 'white', 
              fontWeight: '700', 
              fontSize: '2.2rem', 
              fontFamily: "'Caveat', cursive" 
            }}>
              <Sparkles size={32} /> Success Stories
            </div>
            <h1 style={{ fontSize: '3.5rem', fontFamily: "'Caveat', cursive", background: 'linear-gradient(135deg, var(--accent-color), var(--vibrant-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', lineHeight: 1.1 }}>
              What People Say About Us
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
              Hear from our community of parents, students, and alumni who have experienced the transformative power of a Gurukul education.
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {[...dynamicReviews, ...staticReviews].map((t, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 viewport={{ once: true }}
                 style={{
                   background: 'white',
                   borderRadius: '1.5rem',
                   padding: '2.5rem',
                   boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                   textAlign: 'left',
                   border: '1px solid #f1f5f9',
                   display: 'flex',
                   flexDirection: 'column',
                   gap: '1.2rem',
                   position: 'relative',
                   overflow: 'hidden'
                 }}
               >
                 {/* Decorative Quote Icon */}
                 <div style={{ position: 'absolute', top: '-10px', right: '20px', opacity: 0.05, color: 'var(--accent-color)' }}>
                   <Quote size={80} />
                 </div>
 
                 <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.5rem' }}>
                   {[...Array(t.stars)].map((_, i) => (
                     <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                   ))}
                 </div>
                 
                 <p style={{ 
                   fontSize: '1.1rem', 
                   color: '#475569', 
                   lineHeight: '1.7', 
                   fontStyle: 'italic',
                   flex: 1,
                   position: 'relative',
                   zIndex: 1
                 }}>
                   "{t.content}"
                 </p>
 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                   <div>
                     <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>{t.name}</h4>
                     <p style={{ fontSize: '0.9rem', color: '#6366f1', fontWeight: '600', margin: 0 }}>{t.role}</p>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
             <div className="matte-card" style={{ textAlign: 'center', padding: '2rem' }}>
               <Users size={40} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
               <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>500+ Happy Families</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Part of our vibrant and growing school community.</p>
             </div>
             <div className="matte-card" style={{ textAlign: 'center', padding: '2rem' }}>
               <MessageSquare size={40} color="var(--vibrant-green)" style={{ marginBottom: '1rem' }} />
               <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>100% Satisfaction</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Based on yearly parent and student feedback surveys.</p>
             </div>
             <div className="matte-card" style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
               <Star size={40} color="#f59e0b" style={{ marginBottom: '1rem' }} />
               <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Share Your Experience</h3>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your feedback helps us provide better education.</p>
               <motion.button 
                 onClick={() => setShowReviewModal(true)}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="matte-button matte-button-primary"
                 style={{ padding: '0.8rem 2rem', fontSize: '0.9rem' }}
               >
                 Write A Review
               </motion.button>
             </div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div 
            onClick={() => setShowReviewModal(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
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
                 ✕
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
    </div>
  );
};

export default Testimonials;
