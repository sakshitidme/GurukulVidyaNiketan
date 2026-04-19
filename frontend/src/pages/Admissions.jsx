import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Upload, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  Send,
  User, 
  Users, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  BadgeCheck,
  Star,
  Download
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import SEO from '../components/SEO';

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f8fafc]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1, 64, 64]} position={[-2, 1, -2]}>
            <MeshDistortMaterial
              color="#3b82f6"
              speed={3}
              distort={0.4}
              radius={1}
              opacity={0.1}
              transparent
            />
          </Sphere>
        </Float>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[0.8, 64, 64]} position={[2, -1, -3]}>
            <MeshDistortMaterial
              color="#ec4899"
              speed={2}
              distort={0.3}
              radius={1}
              opacity={0.08}
              transparent
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};

// Utility function to dynamically load Razorpay script
const loadRazorpayConfig = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Admissions = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [otpStatus, setOtpStatus] = useState(null); // 'sending', 'sent', 'verifying', 'verified'
  const [otpInput, setOtpInput] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    studentName: { firstName: '', middleName: '', surname: '' },
    fatherName: { firstName: '', middleName: '', surname: '', education: '' },
    motherName: { firstName: '', middleName: '', surname: '', education: '' },
    dateOfBirth: '',
    age: '',
    applyingForGrade: '',
    disability: 'No',
    disabilityType: '',
    category: '',
    email: '',
    phone: '',
    residentialAddress: '',
    pincode: ''
  });

  const [files, setFiles] = useState({
    studentPhoto: null,
    fatherPhoto: null,
    motherPhoto: null,
    fatherSignature: null,
    motherSignature: null
  });

  const [dragState, setDragState] = useState({
    studentPhoto: false,
    fatherPhoto: false,
    motherPhoto: false,
    fatherSignature: false,
    motherSignature: false
  });

  const calculateGradeAndAge = (dob) => {
    if (!dob) return { grade: '', age: '' };
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }

    const ageString = `${years} Yrs, ${months} Mos, ${days} Days`;
    
    // Based on age calculation as of June 2026 for the upcoming session
    const sessionAge = 2026 - birthDate.getFullYear();
    let grade = '';
    
    if (sessionAge === 3) grade = 'Nursery';
    else if (sessionAge === 4) grade = 'Jr. KG';
    else if (sessionAge === 5) grade = 'Sr. KG';
    else if (sessionAge >= 6 && sessionAge <= 16) grade = `${sessionAge - 5}th Grade`;
    
    return { grade, age: ageString };
  };

  const handleChange = (field, value) => {
    // Only allow numbers for phone and pincode
    if (field === 'phone' || field === 'pincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (field === 'phone' && numericValue.length > 10) return;
      if (field === 'pincode' && numericValue.length > 6) return;
      value = numericValue;
    }

    setFormData(prev => {
      const newState = { ...prev, [field]: value };
      // Auto-calculate grade and age only if dateOfBirth changes
      if (field === 'dateOfBirth') {
        const { grade, age } = calculateGradeAndAge(value);
        newState.age = age;
        if (grade) {
          newState.applyingForGrade = grade;
        }
      }
      return newState;
    });
  };

  const handleNestedChange = (parent, field, value) => {
    // Only allow A-Z for names
    if (field === 'firstName' || field === 'middleName' || field === 'surname') {
      value = value.replace(/[^A-Za-z\s]/g, '');
    }
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleFileChange = (docId, file) => {
    if (file && file.size <= 1 * 1024 * 1024) { // 1MB limit
      setFiles(prev => ({ ...prev, [docId]: file }));
    } else if (file) {
      alert("File size exceeds 1MB limit.");
    }
  };

  const handleDrag = (docId, isDragging) => {
    setDragState(prev => ({ ...prev, [docId]: isDragging }));
  };

  const onDrop = (e, docId) => {
    e.preventDefault();
    handleDrag(docId, false);
    const file = e.dataTransfer.files[0];
    handleFileChange(docId, file);
  };

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpStatus('sending');
    try {
      const parentName = formData.fatherName.firstName || formData.motherName.firstName || formData.studentName.firstName || 'Parent';
      const res = await fetch('/api/admissions/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, name: parentName })
      });
      const data = await res.json();
      if (data.success) {
        setOtpStatus('sent');
      } else {
        alert(data.message || 'Failed to send OTP');
        setOtpStatus(null);
      }
    } catch (err) {
      alert('Error connecting to server to send OTP.');
      setOtpStatus(null);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpInput || otpInput.trim() === '') {
      alert("Please enter the OTP.");
      return;
    }
    setOtpStatus('verifying');
    try {
      const res = await fetch('/api/admissions/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: otpInput })
      });
      const data = await res.json();
      if (data.success) {
        setOtpStatus('verified');
      } else {
        alert(data.message || 'Invalid OTP');
        setOtpStatus('sent'); // let them try again
      }
    } catch (err) {
      alert('Error verifying OTP.');
      setOtpStatus('sent');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otpStatus !== 'verified') {
      setSubmitStatus({ type: 'error', message: 'Please verify your mobile number with OTP first.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Cross-field Surname Validation
    const ss = formData.studentName.surname.trim().toUpperCase();
    const fs = formData.fatherName.surname.trim().toUpperCase();
    const ms = formData.motherName.surname.trim().toUpperCase();
    if (ss && fs && ms && (ss !== fs || ss !== ms)) {
      setSubmitStatus({ type: 'error', message: 'The Surnames for Student, Father, and Mother must be identical.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Cross-field First Name Validation
    const sn = formData.studentName.firstName.trim().toUpperCase();
    const fn = formData.fatherName.firstName.trim().toUpperCase();
    const mn = formData.motherName.firstName.trim().toUpperCase();
    if (sn && fn && mn && (sn === fn || sn === mn || fn === mn)) {
      setSubmitStatus({ type: 'error', message: 'The First Names for Student, Father, and Mother must be distinct from each other.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Check if all photos are uploaded
    if (!files.studentPhoto || !files.fatherPhoto || !files.motherPhoto || !files.fatherSignature || !files.motherSignature) {
      setSubmitStatus({ type: 'error', message: 'Please upload all required photos and signatures (max 1MB each).' });
      setIsSubmitting(false);
      return;
    }
    
    // Validate custom required fields roughly
    if (!formData.studentName.firstName || !formData.dateOfBirth || !formData.phone) {
      setSubmitStatus({ type: 'error', message: 'Please fill out all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Step 1: Load Razorpay
    const res = await loadRazorpayConfig();

    if (!res) {
      setSubmitStatus({ type: 'error', message: 'Razorpay SDK failed to load. Are you online?' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Step 2: Create Order in Backend
      const orderResponse = await fetch('/api/admissions/create-order', {
        method: 'POST',
      });
      const orderData = await orderResponse.json();

      if (!orderData.success) {
        setSubmitStatus({ type: 'error', message: orderData.message || 'Could not create payment order.' });
        setIsSubmitting(false);
        return;
      }

      // Step 3: Configure Razorpay options and open
      const options = {
        key: "rzp_live_SUYpNkNbUNgC9A", // User provided LIVE key
        amount: orderData.order.amount,
        currency: "INR",
        name: "Gurukul Vidya Niketan",
        description: "Admission Registration Fee",
        order_id: orderData.order.id,
        handler: async function (response) {
          // Payment Successful, submit actual admission form
          try {
            const data = new FormData();
            
            // Flatten formData into FormData object
            Object.keys(formData).forEach(key => {
              if (typeof formData[key] === 'object' && formData[key] !== null) {
                Object.keys(formData[key]).forEach(subKey => {
                  data.append(`${key}[${subKey}]`, formData[key][subKey]);
                });
              } else {
                data.append(key, formData[key]);
              }
            });

            // Append files
            Object.keys(files).forEach(key => {
              if (files[key]) {
                data.append(key, files[key]);
              }
            });

            // Append Razorpay verified details
            data.append('razorpay_payment_id', response.razorpay_payment_id);
            data.append('razorpay_order_id', response.razorpay_order_id);
            data.append('razorpay_signature', response.razorpay_signature);

            const submissionResponse = await fetch('/api/admissions', {
              method: 'POST',
              body: data
            });

            if (submissionResponse.ok) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setSubmitStatus({ type: 'success', message: 'Admission Form Submitted Successfully! Registration Fee Paid.' });
              setFormData({
                studentName: { firstName: '', middleName: '', surname: '' },
                fatherName: { firstName: '', middleName: '', surname: '', education: '' },
                motherName: { firstName: '', middleName: '', surname: '', education: '' },
                dateOfBirth: '',
                age: '',
                applyingForGrade: '',
                disability: 'No',
                disabilityType: '',
                category: '',
                email: '',
                phone: '',
                residentialAddress: '',
                pincode: ''
              });
              setFiles({
                studentPhoto: null,
                fatherPhoto: null,
                motherPhoto: null,
                fatherSignature: null,
                motherSignature: null
              });
            } else {
              const errorData = await submissionResponse.json();
              setSubmitStatus({ type: 'error', message: errorData.message || 'Submission failed.' });
            }
          } catch (error) {
            console.error('Fetch error:', error);
            setSubmitStatus({ 
              type: 'error', 
              message: 'Unable to reach the server. Please ensure the backend is running on port 5000 and check your network connection.' 
            });
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.fatherName.firstName + ' ' + formData.fatherName.surname,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#3b82f6"
        }
      };

      const paymentObject = new window.Razorpay(options);
      
      // Handle Payment Failure
      paymentObject.on('payment.failed', function (response) {
         setSubmitStatus({ type: 'error', message: `Payment failed: ${response.error.description}` });
         setIsSubmitting(false);
      });
      
      paymentObject.open();

    } catch (error) {
      console.error('Fetch error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Unable to reach the server. Please ensure the backend is running on port 5000 and check your network connection.' 
      });
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  // UI Tokens: Darker, Larger, more Compact
  const cardClasses = "bg-white/80 backdrop-blur-md border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_60px_rgba(30,68,139,0.05)] mb-6 relative overflow-hidden cursor-default";
  const inputGroupClasses = "relative group w-full";
  const labelClasses = "block text-[0.85rem] font-black text-slate-950 uppercase tracking-widest mb-1.5 ml-1 group-focus-within:text-blue-600 transition-colors";
  const inputClasses = "w-full bg-white/50 border-2 border-slate-200 rounded-[1rem] px-5 py-3 text-black font-bold placeholder:text-slate-600 placeholder:opacity-100 placeholder:font-semibold focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300";
  const iconBoxClasses = "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0";
  const RequiredSign = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="admissions-page bg-[#f8fafc] min-h-screen pb-20 pt-4 sm:pt-6 font-['Outfit'] selection:bg-blue-600 selection:text-white overflow-hidden">
      <SEO 
        title="Admissions - Join Our School" 
        description="Secure your child's future at Gurukul Vidya Niketan. Find admission criteria, fee structure, and the admission form for the upcoming 2026-27 academic session."
        keywords="Gurukul Vidya Niketan admissions, school registration, Nashik school admission, 2026 admissions, admission form"
      />
      {/* Background decoration with Three.js */}
      <ThreeBackground />

      <div className="container max-w-5xl mx-auto px-6 relative z-10" style={{ perspective: '1200px' }}>
        
        {/* Compact Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="flex flex-col items-center justify-center mb-10"
        >
            <motion.div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.8rem', 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))', 
                backdropFilter: 'blur(10px)', 
                border: '1px solid var(--accent-light)', 
                padding: '0.6rem 2.5rem', 
                borderRadius: '999px', 
                color: 'var(--accent-color)', 
                fontWeight: '700', 
                fontSize: '2.2rem', 
                fontFamily: "'Caveat', cursive",
                whiteSpace: 'nowrap',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '1rem'
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles size={32} /> Admission Form <span style={{ color: 'var(--text-primary)', marginLeft: '10px' }}>2026-27</span>
            </motion.div>
            <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Join our legacy of excellence</p>
        </motion.div>

        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="relative"
        >
          
          <AnimatePresence>
            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className={`mb-10 p-6 rounded-2xl flex items-center gap-5 shadow-2xl ${submitStatus.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-600 text-white'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  {submitStatus.type === 'success' ? <BadgeCheck className="text-blue-400" /> : <ShieldCheck />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold tracking-tight">{submitStatus.type === 'success' ? 'Submission Successful' : 'Submission Error'}</h3>
                  <p className="opacity-70 text-sm font-bold">{submitStatus.message}</p>
                </div>
                {submitStatus.type === 'success' && (
                  <button 
                    type="button"
                    onClick={() => window.print()}
                    className="flex-shrink-0 flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all"
                  >
                    <Download size={16} /> Download Receipt (PDF)
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SECTION 1: STUDENT PROFILE */}
          <motion.section 
            variants={itemVariants}
            whileHover={{ y: -8, rotateX: 2, scale: 1.01, boxShadow: '0 40px 80px -15px rgba(30,68,139,0.15)' }}
            className={cardClasses}
          >
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
              <div className={`${iconBoxClasses} bg-slate-950`}>
                <User size={22} />
              </div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">Student Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={inputGroupClasses}>
                <label className={labelClasses}>Surname <RequiredSign /></label>
                <input type="text" className={inputClasses} placeholder="Enter Surname" value={formData.studentName.surname} onChange={(e) => handleNestedChange('studentName', 'surname', e.target.value.toUpperCase())} required />
              </div>
              <div className={inputGroupClasses}>
                <label className={labelClasses}>First Name <RequiredSign /></label>
                <input type="text" className={inputClasses} placeholder="Enter First Name" value={formData.studentName.firstName} onChange={(e) => handleNestedChange('studentName', 'firstName', e.target.value.toUpperCase())} required />
              </div>
              <div className={inputGroupClasses}>
                <label className={labelClasses}>Middle Name <RequiredSign /></label>
                <input type="text" className={inputClasses} placeholder="Enter Middle Name" value={formData.studentName.middleName} onChange={(e) => handleNestedChange('studentName', 'middleName', e.target.value.toUpperCase())} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className={inputGroupClasses}>
                <label className={labelClasses}>Date of Birth <RequiredSign /></label>
                <div className="relative">
                  <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                  <input type="date" className={inputClasses} value={formData.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} max="2026-12-31" min="2000-01-01" required />
                </div>
              </div>
              <div className={inputGroupClasses}>
                <label className={labelClasses}>Age</label>
                <input type="text" className={`${inputClasses} bg-slate-100/50`} value={formData.age} readOnly placeholder="Auto" />
              </div>
              <div className={inputGroupClasses}>
                <label className={labelClasses}>Applying Grade <RequiredSign /></label>
                <select className={inputClasses} value={formData.applyingForGrade} onChange={(e) => handleChange('applyingForGrade', e.target.value)} required>
                  <option value="">Select Grade</option>
                  <option value="Nursery">Nursery</option>
                  <option value="Jr. KG">Jr. KG</option>
                  <option value="Sr. KG">Sr. KG</option>
                  {[...Array(10)].map((_, i) => <option key={i} value={`${i+1}th Grade`}>{i+1}th Grade</option>)}
                </select>
              </div>
              <div className={inputGroupClasses}>
                <label className={labelClasses}>Category <RequiredSign /></label>
                <select className={inputClasses} value={formData.category} onChange={(e) => handleChange('category', e.target.value)} required>
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC / ST</option>
                  <option value="SBC">SBC / VJNT</option>
                  <option value="NT">NT</option>
                </select>
              </div>
              <div className={inputGroupClasses}>
                <label className={labelClasses}>Disability <RequiredSign /></label>
                <select className={inputClasses} value={formData.disability} onChange={(e) => handleChange('disability', e.target.value)} required>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              {formData.disability === 'Yes' && (
                <div className={`${inputGroupClasses} lg:col-span-5`}>
                  <label className={labelClasses}>Disability Type <RequiredSign /></label>
                  <select className={inputClasses} value={formData.disabilityType} onChange={(e) => handleChange('disabilityType', e.target.value)} required>
                    <option value="">Select Disability Type</option>
                    <option value="Physical Disability">Physical Disability</option>
                    <option value="Intellectual Disability">Intellectual Disability</option>
                    <option value="Mental/Behavioral Disability">Mental/Behavioral Disability</option>
                    <option value="Sensory Disability">Sensory Disability</option>
                  </select>
                </div>
              )}
            </div>
          </motion.section>

          {/* SECTION 2: FAMILY BACKGROUND */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
             <motion.section 
               variants={itemVariants}
               whileHover={{ y: -8, rotateY: -2, scale: 1.02, boxShadow: '0 40px 80px -15px rgba(30,68,139,0.15)' }}
               className={`${cardClasses} mb-0`}
             >
                <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                     <Users size={18} />
                   </div>
                   <h3 className="text-xl font-black text-slate-950 tracking-tight">Father's Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={inputGroupClasses}>
                      <label className={labelClasses}>Surname <RequiredSign /></label>
                      <input type="text" className={inputClasses} placeholder="SURNAME" value={formData.fatherName.surname} onChange={(e) => handleNestedChange('fatherName', 'surname', e.target.value.toUpperCase())} required />
                    </div>
                    <div className={inputGroupClasses}>
                      <label className={labelClasses}>First Name <RequiredSign /></label>
                      <input type="text" className={inputClasses} placeholder="FIRST NAME" value={formData.fatherName.firstName} onChange={(e) => handleNestedChange('fatherName', 'firstName', e.target.value.toUpperCase())} required />
                    </div>
                  </div>
                  <div className={inputGroupClasses}>
                    <label className={labelClasses}>Middle Name <RequiredSign /></label>
                    <input type="text" className={inputClasses} placeholder="MIDDLE NAME" value={formData.fatherName.middleName} onChange={(e) => handleNestedChange('fatherName', 'middleName', e.target.value.toUpperCase())} required />
                  </div>
                  <div className={inputGroupClasses}>
                    <label className={labelClasses}>ACADEMIC QUALIFICATION <RequiredSign /></label>
                    <select className={inputClasses} value={formData.fatherName.education} onChange={(e) => handleNestedChange('fatherName', 'education', e.target.value)} required>
                      <option value="">Select Education</option>
                      <option value="Primary Education">Primary Education</option>
                      <option value="Secondary Education">Secondary Education</option>
                      <option value="SSC">SSC</option>
                      <option value="HSC">HSC</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Post Graduation">Post Graduation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
             </motion.section>

             <motion.section 
               variants={itemVariants}
               whileHover={{ y: -8, rotateY: 2, scale: 1.02, boxShadow: '0 40px 80px -15px rgba(236,72,153,0.15)' }}
               className={`${cardClasses} mb-0`}
             >
                <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100">
                   <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white">
                     <Users size={18} />
                   </div>
                   <h3 className="text-xl font-black text-slate-950 tracking-tight">Mother's Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={inputGroupClasses}>
                      <label className={labelClasses}>Surname <RequiredSign /></label>
                      <input type="text" className={inputClasses} placeholder="SURNAME" value={formData.motherName.surname} onChange={(e) => handleNestedChange('motherName', 'surname', e.target.value.toUpperCase())} required />
                    </div>
                    <div className={inputGroupClasses}>
                      <label className={labelClasses}>First Name <RequiredSign /></label>
                      <input type="text" className={inputClasses} placeholder="FIRST NAME" value={formData.motherName.firstName} onChange={(e) => handleNestedChange('motherName', 'firstName', e.target.value.toUpperCase())} required />
                    </div>
                  </div>
                  <div className={inputGroupClasses}>
                    <label className={labelClasses}>Middle Name <RequiredSign /></label>
                    <input type="text" className={inputClasses} placeholder="MIDDLE NAME" value={formData.motherName.middleName} onChange={(e) => handleNestedChange('motherName', 'middleName', e.target.value.toUpperCase())} required />
                  </div>
                  <div className={inputGroupClasses}>
                    <label className={labelClasses}>ACADEMIC QUALIFICATION <RequiredSign /></label>
                    <select className={inputClasses} value={formData.motherName.education} onChange={(e) => handleNestedChange('motherName', 'education', e.target.value)} required>
                      <option value="">Select Education</option>
                      <option value="Primary Education">Primary Education</option>
                      <option value="Secondary Education">Secondary Education</option>
                      <option value="SSC">SSC</option>
                      <option value="HSC">HSC</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Post Graduation">Post Graduation</option>
                      <option value="Housewife">Housewife</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
             </motion.section>
          </div>

          {/* SECTION 3: CONTACT INFORMATION */}
          <motion.section 
            variants={itemVariants}
            whileHover={{ y: -8, rotateX: -2, scale: 1.01, boxShadow: '0 40px 80px -15px rgba(16,185,129,0.15)' }}
            className={cardClasses}
          >
            <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
              <div className={`${iconBoxClasses} bg-emerald-600`}>
                <Mail size={22} />
              </div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">Contact Info</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border-b border-slate-100 pb-4">
               <div className={inputGroupClasses}>
                  <label className={labelClasses}>Primary Email <RequiredSign /></label>
                  <input type="email" className={inputClasses} placeholder="parent@email.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required />
               </div>
               <div className={inputGroupClasses}>
                  <label className={labelClasses}>Phone Number <RequiredSign /></label>
                  <div className="flex gap-2">
                    <input 
                      type="tel" 
                      className={inputClasses} 
                      placeholder="10 Digit Number" 
                      value={formData.phone} 
                      onChange={(e) => handleChange('phone', e.target.value)} 
                      maxLength={10} 
                      minLength={10} 
                      pattern="[0-9]{10}" 
                      required 
                      title="Please enter a 10-digit mobile number" 
                      disabled={otpStatus === 'verified' || otpStatus === 'sending'} 
                    />
                    {otpStatus !== 'verified' && (
                      <button 
                        type="button" 
                        onClick={handleSendOtp} 
                        disabled={otpStatus === 'sending' || formData.phone.length !== 10}
                        className={`px-4 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-widest text-white transition-all min-w-[100px] ${formData.phone.length === 10 ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-300 cursor-not-allowed'}`}
                      >
                        {otpStatus === 'sending' ? <Loader2 size={16} className="animate-spin" /> : (otpStatus === 'sent' ? 'Resend' : 'Send OTP')}
                      </button>
                    )}
                    {otpStatus === 'verified' && (
                      <div className="flex items-center justify-center px-4 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-widest min-w-[100px]">
                        <CheckCircle2 size={16} className="mr-1" /> Verified
                      </div>
                    )}
                  </div>
                  
                  {/* OTP Input UI */}
                  <AnimatePresence>
                    {(otpStatus === 'sent' || otpStatus === 'verifying') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 flex gap-2"
                      >
                        <input 
                          type="text" 
                          placeholder="Enter 4 Digit OTP" 
                          className={`${inputClasses} bg-blue-50/50 border-blue-200 placeholder:text-blue-300`} 
                          value={otpInput} 
                          onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))} 
                          maxLength={4}
                        />
                        <button 
                          type="button" 
                          onClick={handleVerifyOtp} 
                          disabled={otpStatus === 'verifying' || otpInput.length < 4}
                          className="flex items-center justify-center px-6 rounded-xl font-bold text-xs uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-500 transition-all disabled:opacity-50 min-w-[100px]"
                        >
                          {otpStatus === 'verifying' ? <Loader2 size={16} className="animate-spin" /> : 'Verify'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <div className="md:col-span-3">
                  <label className={labelClasses}>Residential Address <RequiredSign /></label>
                  <input type="text" className={inputClasses} placeholder="ENTER FULL ADDRESS" value={formData.residentialAddress} onChange={(e) => handleChange('residentialAddress', e.target.value.toUpperCase())} required />
               </div>
               <div>
                  <label className={labelClasses}>Pincode <RequiredSign /></label>
                  <input type="text" className={inputClasses} placeholder="6 Digit Pin" value={formData.pincode} onChange={(e) => handleChange('pincode', e.target.value)} maxLength={6} minLength={6} pattern="[0-9]{6}" required title="Please enter a valid 6-digit pincode" />
               </div>
            </div>
          </motion.section>

          {/* SECTION 4: DOCUMENTS & SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
             <motion.section 
               variants={itemVariants}
               whileHover={{ y: -8, rotateY: -1, scale: 1.01, boxShadow: '0 40px 80px -15px rgba(30,68,139,0.15)' }}
               className={`${cardClasses} lg:col-span-3 mb-0`}
             >
                 <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                     <FileText className="text-blue-600" size={18} /> Documents <RequiredSign />
                   </h3>
                   <span className="text-[0.6rem] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-md border border-blue-100 uppercase tracking-tighter">MAX 1MB EACH</span>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'studentPhoto', label: 'Student Photo' },
                      { id: 'fatherPhoto', label: 'Father Photo' },
                      { id: 'motherPhoto', label: 'Mother Photo' },
                      { id: 'fatherSignature', label: 'Father Signature' },
                      { id: 'motherSignature', label: 'Mother Signature' }
                    ].map(doc => (
                      <motion.div 
                        key={doc.id} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onDragOver={(e) => { e.preventDefault(); handleDrag(doc.id, true); }}
                        onDragLeave={() => handleDrag(doc.id, false)}
                        onDrop={(e) => onDrop(e, doc.id)}
                        onClick={() => document.getElementById(`${doc.id}-upload`).click()}
                        className={`group aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all cursor-pointer ${dragState[doc.id] ? 'border-blue-600 bg-blue-50 scale-[1.02]' : 'border-slate-100 hover:border-blue-500 hover:bg-blue-50'}`}
                      >
                         <input 
                           type="file" 
                           id={`${doc.id}-upload`} 
                           className="hidden" 
                           accept="image/*"
                           onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
                         />
                         {files[doc.id] ? (
                           <div className="text-center">
                             <CheckCircle2 className="text-emerald-500 mx-auto mb-2" size={32} />
                             <p className="text-[0.65rem] font-bold text-slate-700 truncate max-w-[120px]">
                               {files[doc.id].name}
                             </p>
                             <button 
                               type="button"
                               onClick={(e) => { e.stopPropagation(); setFiles(prev => ({ ...prev, [doc.id]: null })); }}
                               className="mt-2 text-[0.6rem] font-black text-red-500 uppercase tracking-tighter hover:underline"
                             >
                               Remove
                             </button>
                           </div>
                         ) : (
                           <>
                             <Upload size={24} className="text-slate-300 group-hover:text-blue-600 mb-2" />
                             <p className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest text-center">{doc.label}</p>
                             <p className="mt-1 text-[0.5rem] font-medium text-slate-400">Drag & Drop (Max 1MB)</p>
                           </>
                         )}
                      </motion.div>
                    ))}
                 </div>
             </motion.section>

             <motion.div 
               variants={itemVariants}
               whileHover={{ scale: 1.02, rotateY: 2, boxShadow: '0 50px 100px -20px rgba(15,23,42,0.3)' }}
               className="lg:col-span-2 bg-slate-950 rounded-[2rem] p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all duration-500"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                   <p className="text-[0.6rem] font-black text-blue-400 uppercase tracking-widest mb-3">Submission Summary</p>
                   <div className="text-5xl font-black mb-3 text-white">₹200 <span className="text-sm opacity-40 font-bold tracking-normal italic uppercase">Registration</span></div>
                   <p className="text-xs font-bold text-slate-400 leading-tight mb-8">Fee includes processing and academic evaluation for the upcoming session.</p>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="relative z-10 w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl cursor-pointer transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Initiate Payment <CreditCard size={16} /></>}
                </button>
             </motion.div>
          </div>

          {/* FINAL SUBMISSION */}
          <div className="flex flex-col items-center pt-8 pb-12">
             {submitStatus.type === 'success' && (
               <motion.button
                 type="button"
                 onClick={() => window.open('/admission-form-template.pdf', '_blank')}
                 whileHover={{ scale: 1.05, y: -4, boxShadow: '0 20px 40px -10px rgba(16,185,129,0.5)' }}
                 whileTap={{ scale: 0.95 }}
                 className="group inline-flex items-center gap-4 bg-emerald-500 text-white px-12 sm:px-20 py-6 rounded-2xl font-black text-xl uppercase tracking-[0.1em] shadow-xl transition-all duration-300 relative overflow-hidden"
               >
                 <Download size={22} className="group-hover:-translate-y-1 group-hover:scale-110 transition-transform" />
                 Download Admission Form
               </motion.button>
             )}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="mt-10 flex items-center gap-4 text-slate-400"
             >
                <div className="h-[1px] w-12 bg-slate-200" />
                <ShieldCheck size={18} className="text-blue-500" />
                <span className="text-[0.65rem] font-black uppercase tracking-[0.4em]">Gurukul Vidya Niketan Verified</span>
                <div className="h-[1px] w-12 bg-slate-200" />
             </motion.div>
          </div>

        </motion.form>
      </div>
    </div>
  );
};

export default Admissions;
