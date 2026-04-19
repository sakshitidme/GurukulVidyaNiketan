import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Landmark, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import SEO from '../components/SEO';
import bhagwanSirImg from '../assets/principle/bhagwansir.jpg';

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f8fafc]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
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

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 h-full min-h-[350px] cursor-pointer touch-manipulation"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 backface-hidden bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-slate-200/50 hover:border-blue-400/50 hover:bg-white/60 transition-all duration-300 group shadow-sm flex flex-col"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors shadow-sm">
              {front.icon}
            </div>
            <h5 className="font-bold text-slate-800 tracking-wide text-lg">{front.category}</h5>
          </div>
          <ul className="space-y-1.5 overflow-hidden">
            {front.items.map((item, i) => (
              <li key={i} className="text-slate-600 text-[0.85rem] md:text-[0.95rem] font-medium flex items-start gap-4 leading-tight group/item">
                <span className="flex-shrink-0 w-8 flex justify-center text-blue-500 mt-1 transition-transform group-hover/item:scale-125 text-xs">✦</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4 flex justify-center">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest opacity-60 animate-pulse">
              <span className="hidden md:inline">Hover</span>
              <span className="md:hidden">Tap</span>
              {" to flip"}
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden bg-blue-50/80 backdrop-blur-md p-6 rounded-2xl border border-blue-200/50 shadow-lg flex flex-col"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 rounded-xl shadow-sm text-white">
              {back.icon}
            </div>
            <h5 className="font-bold text-slate-900 tracking-wide text-lg">{back.category}</h5>
          </div>
          <ul className="space-y-1.5 overflow-hidden">
            {back.items.map((item, i) => (
              <li key={i} className="text-slate-700 text-[0.85rem] md:text-[0.95rem] font-semibold flex items-start gap-4 leading-tight group/item">
                <span className="flex-shrink-0 w-8 flex justify-center text-blue-600 mt-1 text-xs">✦</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4 flex justify-center">
             <span className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest">
               <span className="hidden md:inline">Hover out</span>
               <span className="md:hidden">Tap</span>
               {" to return"}
             </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SecretaryProfile = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const qualificationsGroups = [
    {
      front: { category: "Master's Degrees", items: [
        "MBA (Financial Management)", "MBA (Marketing Management)", "LL.M – Master of Laws",
        "M.Com – Costing", "MA (Economics)", "MA (Public Administration)",
        "MA (Rural Development)", "MA (Sociology)", "M.Lib & I.Sc", "MCJ"
      ], icon: <BookOpen size={24} /> },
      back: { category: "Bachelor's Degrees", items: [
        "LL.B – Bachelor of Laws", "B.Com – Costing", "B.Lib & I.Sc",
        "GDC&A (Govt. Diploma)", "DTL(Taxation Law)", "DME(Marine Engineering)"
      ], icon: <Briefcase size={24} /> }
    },
    {
      front: { category: "NET / SET (UGC)", items: [
        "UGC-NET (Public Admin)", "UGC-NET (Law)", "UGC-NET (Commerce)",
        "UGC-NET (Economics)", "UGC-NET (Library Science)", "UGC-SET (Management)",
        "UGC-SET (Journalism)"
      ], icon: <Award size={24} /> },
      back: { category: "Doctoral Degrees", items: ["Ph.D. (Management) – Completed", "Ph.D. (Law) – Pursuing"], icon: <GraduationCap size={24} /> }
    }
  ];

  return (
    <motion.main 
      className="min-h-screen font-sans relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThreeBackground />
      <SEO 
        title="Secretary's Profile - Leadership" 
        description="Learn more about Dr. Adv. Bhagwan N. Yelmame, the Secretary of Gurukul Vidya Niketan, and his extensive academic and professional background."
        keywords="Secretary Profile, Dr. Adv. Bhagwan N. Yelmame, Gurukul Vidya Niketan leadership, school administration Nashik"
      />

      <section className="relative pt-8 md:pt-12 pb-16 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
                marginBottom: '1rem'
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles size={windowWidth < 768 ? 24 : 32} />
              Secretary's Profile
            </motion.div>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mb-4"></div>
            
            <h4 className={`text-2xl md:text-3xl font-bold text-slate-800 flex items-center justify-center gap-4 ${windowWidth < 1024 ? 'hidden' : 'flex'}`}>
              <Landmark className="text-blue-600" size={32} />
              Academic & Professional Excellence
            </h4>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Image side */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group perspective-1000">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/5 backdrop-blur-xl p-3 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02]">
                  <img 
                    src={bhagwanSirImg} 
                    alt="Dr. Adv. Bhagwan Nivrutti Yelmame" 
                    className="w-full aspect-[4/5] rounded-xl object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">Dr. Adv. Bhagwan N. Yelmame</h3>
                    <p className="text-amber-400 font-semibold tracking-wide uppercase text-sm">Secretary</p>
                    <p className="mt-2 bg-white/90 py-1 px-3 rounded-full inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider shadow-lg">
                      <span className="text-red-600">BK</span>
                      <span className="text-black">Educational And Welfare Society</span>
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-3 mt-8 lg:hidden">
                <Landmark className="text-blue-600" size={24} />
                Academic & Professional Excellence
              </h4>
            </motion.div>

            {/* Qualifications Side */}
            <motion.div 
              className="lg:col-span-7"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {qualificationsGroups.map((group, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <FlipCard front={group.front} back={group.back} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default SecretaryProfile;
