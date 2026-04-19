import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Maximize2, ZoomIn } from 'lucide-react';
import SEO from '../components/SEO';

import img1 from '../assets/event/boysgroup.JPG';
import img2 from '../assets/event/falicitation.JPG';
import img3 from '../assets/event/girlsgrp.JPG';
import img4 from '../assets/event/group.JPG';
import img5 from '../assets/event/jhoka.JPG';
import img6 from '../assets/event/solo.JPG';
import img7 from '../assets/event/sonMother.JPG';
import img8 from '../assets/event/guest.JPG';
import img9 from '../assets/event/trstud.JPG';

const Lightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.button 
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
        onClick={onClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
      >
        <X size={32} />
      </motion.button>
      
      <motion.div 
        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={image} 
          alt="Program Highlight" 
          className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
        />
      </motion.div>
    </motion.div>
  );
};

const PhotoCard = ({ src, index, onOpen, className }) => {
  return (
    <motion.div 
      className={`relative group overflow-hidden rounded-[2rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-200 border border-slate-200/50 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      onClick={() => onOpen(src)}
    >
      <motion.img 
        src={src} 
        alt={`Event activity ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30"
        >
          <ZoomIn className="text-white" size={32} />
        </motion.div>
      </div>
      
      {/* Glossy Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};

const Events = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO 
        title="Events & Gallery - Visual Journey" 
        description="Experience the vibrant atmosphere of Gurukul Vidya Niketan through our premium gallery. Highlights from Annual Day and daily school activities."
        keywords="Gurukul Vidya Niketan events, school gallery, annual day highlights, student life Nashik"
      />
      
      {/* Header Section */}
      <section className="relative pt-6 pb-10 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
           <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
           >
             <motion.div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: windowWidth < 480 ? '0.5rem' : '0.8rem', 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))', 
                  backdropFilter: 'blur(10px)', 
                  border: '1px solid var(--accent-light)', 
                  padding: windowWidth < 375 ? '0.5rem 1rem' : (windowWidth < 768 ? '0.5rem 1.6rem' : '0.6rem 2.5rem'), 
                  borderRadius: '999px', 
                  color: 'var(--accent-color)', 
                  fontWeight: '700', 
                  fontSize: windowWidth < 375 ? '1.35rem' : (windowWidth < 768 ? '1.6rem' : '2.2rem'), 
                  fontFamily: "'Caveat', cursive",
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-md)',
                  marginBottom: '1rem'
                }}
                whileHover={{ scale: 1.02 }}
             >
               <Sparkles size={windowWidth < 768 ? 22 : 32} /> Gurukul Visual <span style={{ color: 'var(--text-primary)', marginLeft: windowWidth < 480 ? '6px' : '10px' }}>Journey</span>
             </motion.div>
             <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] min-[375px]:tracking-[0.4em] text-[10px] sm:text-xs">Join our legacy of excellence</p>
           </motion.div>
         </div>
         
         {/* Decorative elements */}
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 blur-[100px] rounded-full -z-10" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/20 blur-[100px] rounded-full -z-10" />
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] grid-flow-dense">
            {/* Explicitly defined spans for 9 items to ensure no blank spaces */}
            {images.map((img, idx) => {
              let spanClass = "md:col-span-1 md:row-span-1";
              if (idx === 0) spanClass = "md:col-span-2 md:row-span-2"; // Big feature
              else if (idx === 3) spanClass = "md:col-span-1 md:row-span-2"; // Tall
              else if (idx === 6) spanClass = "md:col-span-2 md:row-span-1"; // Wide
              else if (idx === 8) spanClass = "md:col-span-2 md:row-span-1"; // Bottom wide

              return (
                <PhotoCard 
                  key={idx} 
                  src={img} 
                  index={idx} 
                  onOpen={setSelectedImage} 
                  className={spanClass}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Events;
