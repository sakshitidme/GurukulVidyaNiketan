import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Quote, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import SEO from '../components/SEO';
import kishorSirImg from '../assets/principle/kisorsir.jpg';

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f8fafc]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {/* Bubbles removed as per user request */}
      </Canvas>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};



const PrincipalSection = ({ windowWidth }) => {
  return (
    <section className="relative pt-8 pb-16 bg-transparent overflow-hidden">
      {/* Decorative Circles removed for a cleaner look */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
           <motion.div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))', 
              backdropFilter: 'blur(10px)', 
              border: '1px solid var(--accent-light)', 
              padding: windowWidth < 768 ? '0.5rem 1.5rem' : '0.6rem 2.5rem', 
              borderRadius: '999px', 
              color: 'var(--accent-color)', 
              fontWeight: '700', 
              fontSize: windowWidth < 768 ? '1.6rem' : '2.2rem', 
              fontFamily: "'Caveat', cursive",
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '0.4rem'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles size={windowWidth < 768 ? 24 : 32} />
            Principal's Desk
          </motion.div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Content Column */}
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-8 md:p-10 bg-slate-50/80 backdrop-blur-md rounded-3xl border border-slate-200 shadow-2xl shadow-blue-900/5">
              <Quote className="absolute -top-6 -left-4 text-amber-400 w-16 h-16 opacity-40 transform -scale-x-100" />
              
              <blockquote className="text-2xl md:text-3xl font-serif italic text-slate-700 mb-8 leading-snug">
                "Education is not the learning of facts, but the training of the mind to think."
              </blockquote>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>Greetings to all members of the Sanskar community!</p>
                <p>I am very happy and proud to welcome you to our school website. At <strong className="text-blue-900 font-semibold">Gurukul Vidya Niketan</strong>, we do not only teach subjects from books — we help build a bright future for every child.</p>
                <p>We believe that every child is special and has great talent inside. Our school provides a safe and caring environment where students can learn freely, ask questions, try new things, and grow with confidence.</p>
                <p>In today’s fast-changing world, we focus on the overall development of students. Along with academic excellence, we instill moral values, emotional intelligence, creativity, and discipline. Our passionate educators work tirelessly to create a positive and inspiring learning atmosphere.</p>
                <p>We invite you to join us on this wonderful educational journey. Together, we can help our children learn, grow, and succeed in all walks of life.</p>
              </div>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group perspective-1000">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative bg-white/5 backdrop-blur-xl p-3 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src={kishorSirImg} 
                  alt="Prof. Kishor Nivrutti Yelmame" 
                  className="w-full aspect-[4/5] rounded-xl object-cover -scale-x-100"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">Prof. Kishor N. Yelmame</h3>
                  <p className="text-amber-400 font-semibold tracking-wide uppercase text-sm">Principal</p>
                  <p className="mt-2 bg-white/90 py-1 px-3 rounded-full inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    <Award size={14} className="text-amber-500" />
                    <span className="text-black">15+ Years of Academic Excellence</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const PrincipalDesk = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.main 
      className="min-h-screen font-sans relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThreeBackground />
      <SEO 
        title="Principal's Desk - Leadership Message" 
        description="Read messages from our Principal and Secretary at Gurukul Vidya Niketan. Learn about our leadership's commitment to academic excellence and student success."
        keywords="Gurukul Vidya Niketan leadership, principal message, secretary profile, Dr. Adv. Bhagwan N. Yelmame, Prof. Kishor N. Yelmame, school administration Nashik"
      />
      <PrincipalSection windowWidth={windowWidth} />
    </motion.main>
  );
};

export default PrincipalDesk;
