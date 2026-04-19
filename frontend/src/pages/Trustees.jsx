import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import gurukulLogo from '../assets/GurukulLogo.jpg';

const trustees = [
  { name: 'Shri. Kishor Nivrutti Yelmame', role: 'PRESIDENT', color: '#e74c3c' },
  { name: 'Shri. Nivrutti Maliba Yelmame', role: 'VICE PRESIDENT', color: '#3498db' },
  { name: 'Dr. Adv. Bhagwan Nivrutti Yelmame', role: 'SECRETARY', color: '#2ecc71' },
  { name: 'Smt. Nandabai Nivrutti Yelmame', role: 'JOINT SECRETARY', color: '#e74c3c' },
  { name: 'Smt. Vaishali Bhagwan Yelmame', role: 'TREASURER', color: '#9b59b6' },
  { name: 'Smt. Harshada Kishor Yelmame', role: 'MEMBER', color: '#e91e8c' },
  { name: 'Shri. Bhausaheb Kondaji Bhadange', role: 'MEMBER', color: '#e74c3c' },
  { name: 'Shri. Santosh Kondaji Bhadange', role: 'MEMBER', color: '#3498db' },
  { name: 'Smt. Sangeeta Anil Bhadange', role: 'MEMBER', color: '#2ecc71' },
  { name: 'Shri. Avadhoot Madhukar Gaikwad', role: 'MEMBER', color: '#e74c3c' },
  { name: 'Mr. Khanderao Shivram Salve', role: 'MEMBER', color: '#3498db' },
];

const institutions = [
  
  { name: 'BK Science Academy', url: 'www.bkscience.in', icon: '🔬' },
  { name: 'BK Career Academy', url: 'www.bkcareer.in', icon: '🎓' },
  { name: 'BK Sports Academy', url: 'www.bksports.in', icon: '⚽' },
  { name: 'BK Times', url: 'www.bktimes.co.in', icon: '📰' },
  { name: 'Gurukul Vidya Niketan', url: 'www.bkgurukul.in', icon: null, logo: gurukulLogo },
  { name: 'Sanskar English Medium School', url: 'www.bksanskar.in', icon: null, logo: gurukulLogo },
];

const TrusteeCard = ({ name, role, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    style={{ borderLeft: `4px solid ${color}` }}
  >
    <p className="font-semibold text-gray-800 text-sm leading-tight">{name}</p>
    <p className="text-xs text-gray-400 mt-1 tracking-wider font-medium">{role}</p>
  </motion.div>
);

const Trustees = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-[#1a3a6b] py-10 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)' }}
        />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold relative z-10"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className="text-white">Board of </span>
          <span className="text-yellow-400">Trustees</span>
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Trustee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {trustees.map((t, i) => (
            <TrusteeCard key={i} {...t} index={i} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Since 2009 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 relative"
          >
            <div className="absolute -top-4 left-6 text-yellow-400 text-5xl font-serif leading-none select-none">"</div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Since 2009
            </h2>
            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <p>
                Our journey started with a simple dream: to give every child a chance to succeed.
                Since <strong>2009</strong>, the <strong>BK Education And Welfare Society</strong> has
                grown from a small idea into a large family of schools and academies.
              </p>
              <p>
                We believe that education is not just about passing exams, but about building character
                and confidence. For more than <strong className="text-yellow-600">15+ years</strong>, we
                have worked hard to help students learn and grow through our different schools.
              </p>
              <p>
                We look beyond just books. We want to create a place where students become smart, strong,
                and good human beings. Our goal is to provide a safe and happy environment where every
                student can explore their interests in science, sports, and culture.
              </p>
              <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-500 mt-4">
                We are committed to teaching values that help our children become responsible and kind citizens of tomorrow.
              </blockquote>
            </div>
          </motion.div>

          {/* Our Institutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <span className="w-1 h-5 bg-blue-500 rounded-full inline-block" />
              Our Institutions
            </h2>
            <div className="space-y-3">
              {institutions.map((inst, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {inst.logo ? (
                    <img src={inst.logo} alt={inst.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  ) : (
                    <span className="text-2xl shrink-0">{inst.icon}</span>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{inst.name}</p>
                    {inst.url === 'Coming Soon' ? (
                      <p className="text-xs text-gray-400">{inst.url}</p>
                    ) : (
                      <a
                        href={`https://${inst.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                      >
                        {inst.url} <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Trustees;
