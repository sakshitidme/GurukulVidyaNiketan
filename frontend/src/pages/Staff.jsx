import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Award, Users } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import SEO from '../components/SEO';

// Asset imports
import edu1 from '../assets/staff/edu1.jpeg';
import edu2 from '../assets/staff/edu2.jpg';
import edu3 from '../assets/staff/edu3.png';
import edu4 from '../assets/staff/edu4.png';
import edu5 from '../assets/staff/edu5.png';
import edu6 from '../assets/staff/edu6.png';

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

const staffData = [
  {
    name: "Gayatri Mayur shankhpal",
    role: "NURSERY TEACHER",
    qualification: "B.Com",
    image: edu1
  },
  {
    name: "Ananya Vikas Jadhav",
    role: "JR.KG TEACHER",
    qualification: "M.Com",
    image: edu2
  },
  {
    name: "Yogita Raju dorkar",
    role: "NURSERY TEACHER",
    qualification: "BA (Eng)",
    image: edu3
  },
  {
    name: "Seema Sachin shewale",
    role: "PLAY GROUP",
    qualification: "MA (Marathi)",
    image: edu4
  },
  {
    name: "Neelam Prashanth Pawar",
    role: "SR. KG TEACHER",
    qualification: "BA.Ed (Eng)",
    image: edu5
  },
  {
    name: "avita Vivek bhamri",
    role: "PRIMARY TEACHER",
    qualification: "BA (Eco)",
    image: edu6
  }
];

const StaffCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
      <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center">
        <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
             <span className="text-white text-xs font-bold tracking-widest uppercase mb-2 px-3 py-1 bg-blue-500/80 rounded-full backdrop-blur-md">
               Expert Educator
             </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
          {member.name}
        </h3>
        <p className="text-pink-500 font-bold text-xs tracking-widest uppercase mb-3 px-3 py-1 bg-pink-50 rounded-full">
          {member.role}
        </p>
        
        <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
          <GraduationCap size={16} className="text-blue-500" />
          <span className="text-slate-600 text-sm font-semibold">{member.qualification}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Staff = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.main 
      className="min-h-screen font-sans relative pt-12 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThreeBackground />
      <SEO 
        title="Our Staff - Expert Educators" 
        description="Meet the dedicated team of educators at Gurukul Vidya Niketan. Our staff is committed to providing high-quality education and nurturing student growth."
        keywords="Gurukul Vidya Niketan staff, teachers, Nashik school educators, teaching team, expert teachers"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-8"
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
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))', 
              backdropFilter: 'blur(10px)', 
              border: '1px solid rgba(255,255,255,0.5)', 
              padding: windowWidth < 768 ? '0.6rem 1.8rem' : '0.8rem 3rem', 
              borderRadius: '999px', 
              color: '#3b82f6', 
              fontWeight: '800', 
              fontSize: windowWidth < 768 ? '1.8rem' : '2.5rem', 
              fontFamily: "'Caveat', cursive",
              whiteSpace: 'nowrap',
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)',
              marginBottom: '1.5rem'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles size={windowWidth < 768 ? 28 : 36} />
            Our Dedicated Staff
          </motion.div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"></div>
          
          <p className="max-w-2xl mx-auto text-slate-600 font-medium text-lg leading-relaxed">
            Highly qualified and passionate educators dedicated to shaping the future of our students through excellence in teaching and holistic development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {staffData.map((member, index) => (
            <StaffCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </motion.main>
  );
};

export default Staff;
