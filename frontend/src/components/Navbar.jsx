import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/GurukulLogo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about', dropdown: [
      { name: '👨‍🏫  Our Educators', path: '/staff' },
      { name: '🏛️  Trustees', path: '/trustees' },
      { name: '✍️  Secretary\'s Profile', path: '/secretary-profile' },
      { name: '🏫  Infrastructure', path: '/about#infrastructure' },
      { name: '💬  Testimonials', path: '/testimonials' },
    ]},
    { name: 'Events', path: '/events' },
    { name: "Principal's Desk", path: '/principal-desk' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[1000] bg-white transition-all duration-300 ${isScrolled || isOpen ? 'shadow-md' : 'shadow-sm'}`}>
        <div className={`border-b border-black/10 bg-white transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2 sm:py-3'}`}>
          <div className="max-w-[1500px] mx-auto px-3 sm:px-6 md:px-10 flex items-center gap-3 sm:gap-6">

            {/* ── LEFT: Logo + Text Block ── */}
            <NavLink
              to="/"
              className="flex items-center gap-2 sm:gap-3 no-underline shrink-0 group"
              style={{ minWidth: 0 }}
            >
              {/* Circular logo with arc text */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg
                  className="absolute pointer-events-none"
                  style={{ width: '150%', height: '150%', top: '-25%', left: '-25%' }}
                  viewBox="0 0 100 100"
                >
                  <path id="arc" d="M 14 50 A 36 36 0 0 1 86 50" fill="transparent" />
                  <text style={{ fontSize: '8px', fontFamily: "'Outfit', sans-serif", fontWeight: 800, fill: '#0f4a8a', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    <textPath href="#arc" startOffset="50%" textAnchor="middle">REG.NO: F12121/NSK</textPath>
                  </text>
                </svg>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={logoImg}
                  alt="Gurukul Logo"
                  className="rounded-full object-cover relative z-10 ring-2 ring-[#0f4a8a]/20 shadow"
                  style={{
                    width: 'clamp(44px, 5.5vw, 68px)',
                    height: 'clamp(44px, 5.5vw, 68px)',
                  }}
                />
              </div>

              {/* Text: shloka → society → school name */}
              <div className="flex flex-col justify-center gap-0 min-w-0">
                <p
                  className="m-0 leading-snug text-[#0f4a8a] lg:text-[#e11d48] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: 'clamp(0.42rem, 0.85vw, 0.68rem)',
                    letterSpacing: '0.02em',
                  }}
                >
                  | नही ज्ञानेन सदृशं पवित्रमिह विद्यते |
                </p>
                <p
                  className="m-0 leading-snug text-slate-700 font-bold uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(0.42rem, 0.85vw, 0.65rem)',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span className="text-[#e11d48]">BK</span> Educational And Welfare Society's
                </p>
                <h1
                  className="m-0 font-black text-[#0f4a8a] leading-tight whitespace-nowrap tracking-tight lg:tracking-normal"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Gurukul Vidya Niketan
                </h1>
              </div>
            </NavLink>

            {/* ── SPACER ── */}
            <div className="flex-1" />

            {/* ── CENTER/RIGHT: Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4 lg:mt-8">
              {navLinks.map(link => (
                link.dropdown ? (
                  <div key={link.name} className="relative group">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1 px-2 py-2 text-[0.85rem] xl:text-[0.95rem] font-bold tracking-wide transition-colors whitespace-nowrap
                        ${isActive
                          ? 'text-[#0f4a8a]'
                          : 'text-slate-600 hover:text-[#0f4a8a]'}`
                      }
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {link.name} <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />
                    </NavLink>
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {link.dropdown.map(sub => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-[#0f4a8a] transition-colors"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-2 py-2 text-[0.85rem] xl:text-[0.95rem] font-bold tracking-wide transition-colors whitespace-nowrap
                      ${isActive
                        ? 'text-[#0f4a8a]'
                        : 'text-slate-600 hover:text-[#0f4a8a]'}`
                    }
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {link.name}
                  </NavLink>
                )
              ))}
            </div>

            {/* ── RIGHT: Apply Now + Hamburger ── */}
            <div className="flex items-center gap-2 shrink-0 lg:mt-8">
              <NavLink
                to="/admissions"
                className="hidden lg:flex items-center gap-2 bg-[#ffb800] text-[#0f4a8a] border-2 border-[#0f4a8a] shadow-[3px_3px_0_#0f4a8a] hover:shadow-[1px_1px_0_#0f4a8a] hover:translate-y-[2px] hover:translate-x-[2px] px-5 py-2 xl:px-6 rounded-lg text-[0.85rem] xl:text-[0.95rem] font-bold whitespace-nowrap transition-all"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Admissions <ArrowRight size={18} strokeWidth={2.5} />
              </NavLink>

              <button
                className="lg:hidden p-1.5 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ── Mobile Nav Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white/98 z-[990] flex flex-col items-center justify-center gap-5 backdrop-blur-md overflow-y-auto py-24"
          >
            {navLinks.map((link, i) => (
              link.dropdown ? (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-center"
                >
                  <button
                    onClick={() => setAboutOpen(v => !v)}
                    className="flex items-center gap-2 text-xl font-bold text-slate-800 mx-auto"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {link.name}
                    <ChevronDown size={18} className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {aboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-1 overflow-hidden"
                      >
                        {link.dropdown.map(sub => (
                          <NavLink
                            key={sub.name}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="block text-base text-slate-500 hover:text-[#0f4a8a] no-underline py-1"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            {sub.name}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-xl font-bold no-underline tracking-wide px-6 py-2 rounded-full transition-all
                      ${isActive ? 'bg-[#0f4a8a] text-white' : 'text-slate-800 hover:text-[#0f4a8a]'}`
                    }
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              )
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <NavLink
                to="/admissions"
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex items-center gap-2 border-2 border-[#f5a623] text-[#f5a623] px-8 py-3 rounded-full text-lg font-bold"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Apply Now <ArrowRight size={18} />
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;