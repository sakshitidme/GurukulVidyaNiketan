import React from 'react';
import { motion } from 'framer-motion';
import doraemonImg from '../assets/doraemon.png';

const WhatsAppButton = () => {
  const phoneNumber = "+91 80105 40959"; 
  const message = "Hello! I'm interested in learning more about Gurukul Vidya Niketan.";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[\s+]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, -2, 2, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '25px',
        zIndex: '1000'
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float group"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          position: 'relative',
          width: '110px',
          height: '110px'
        }}
      >
        {/* Hello! Text above Doraemon */}
        <motion.div
          initial={{ x: "-50%", y: 0 }}
          animate={{ 
            x: "-50%",
            y: [0, -3, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            color: '#000000',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.6rem',
            fontWeight: '900',
            whiteSpace: 'nowrap',
            textShadow: '3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 0 4px 10px rgba(0,0,0,0.3)',
            letterSpacing: '0.5px',
            zIndex: 10
          }}
        >
          Hello!
        </motion.div>

        <motion.img 
          src={doraemonImg} 
          alt="Chat with us" 
          whileHover={{ scale: 1.1, rotate: 5 }}
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%',
            objectFit: 'cover',
            border: '5px solid white',
            display: 'block',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            background: 'white',
            position: 'relative',
            zIndex: 1
          }} 
        />

        <div style={{
          position: 'absolute',
          right: '120px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#1e293b',
          padding: '8px 16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '700',
          whiteSpace: 'nowrap',
          opacity: '0',
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          transform: 'translateX(10px)',
          fontFamily: "'Outfit', sans-serif"
        }} className="whatsapp-tooltip">
          Hello! Chat with me 🔔
        </div>

        <style>{`
          .whatsapp-float:hover .whatsapp-tooltip {
            opacity: 1;
            transform: translateX(0);
          }
          @media (max-width: 768px) {
            .whatsapp-float {
              width: 80px !important;
              height: 80px !important;
            }
            .whatsapp-float div:first-of-type {
              font-size: 1.2rem !important;
              top: -35px !important;
            }
            .whatsapp-tooltip {
              display: none;
            }
          }
        `}</style>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;
