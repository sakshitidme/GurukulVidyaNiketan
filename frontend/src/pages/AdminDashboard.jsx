import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Calendar, 
  GraduationCap, 
  LogOut, 
  Loader2, 
  ChevronRight, 
  Filter,
  Download,
  Mail,
  Phone,
  LayoutDashboard,
  MapPin,
  CreditCard,
  Star,
  DownloadCloud,
  User,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('admissions');
  const [admissions, setAdmissions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const fetchData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      if (activeSection === 'admissions' || activeSection === 'overview') {
        const response = await fetch('http://localhost:5000/api/admissions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 401) handleLogout();
        const data = await response.json();
        if (data.success) setAdmissions(data.data);
      }

      if (activeSection === 'reviews') {
        const response = await fetch('http://localhost:5000/api/reviews/admin', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 401) handleLogout();
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };
  
  const handleReviewUpdate = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setReviews(reviews.map(r => r._id === id ? { ...r, status } : r));
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleReviewDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/admin/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r._id !== id));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const exportToCSV = (adm) => {
    const data = [
      ['Field', 'Value'],
      ['Registration No', adm.regNo || 'N/A'],
      ['Student Name', `${adm.studentName.firstName} ${adm.studentName.surname}`],
      ['Grade', adm.applyingForGrade],
      ['Phone', adm.phone],
      ['Email', adm.email],
      ['Father Name', `${adm.fatherName.firstName} ${adm.fatherName.surname}`],
      ['Mother Name', `${adm.motherName.firstName} ${adm.motherName.surname}`],
      ['Address', adm.residentialAddress],
      ['Pincode', adm.pincode],
      ['DOB', new Date(adm.dateOfBirth).toLocaleDateString()],
      ['Status', adm.status || 'Pending']
    ];
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + data.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `admission_${adm.studentName.firstName}_${adm.studentName.surname}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAdmissions = admissions.filter(adm => 
    `${adm.studentName.firstName} ${adm.studentName.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adm.phone.includes(searchTerm)
  );

  const sidebarItems = [
    { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'admissions', label: 'ADMISSIONS', icon: Users },
    { id: 'fees', label: 'FEES', icon: CreditCard },
    { id: 'contacts', label: 'CONTACTS', icon: Mail },
    { id: 'reviews', label: 'REVIEWS', icon: Star },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-52 bg-[#0f172a] text-slate-400 flex flex-col fixed inset-y-0 left-0 z-50 overflow-hidden">
        <div className="p-5 flex items-center gap-2">
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white tracking-widest flex items-center gap-2">
              PANEL <span className="text-yellow-500 font-black">CMS</span>
            </h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === item.id 
                ? 'bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-yellow-500/20' 
                : 'hover:bg-white/5 hover:text-white font-semibold'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className={activeSection === item.id ? 'text-slate-900' : 'group-hover:text-yellow-500 transition-colors'} />
                <span className="text-[0.65rem] uppercase tracking-wider">{item.label}</span>
              </div>
              {activeSection === item.id && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>

        <div className="p-5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full rounded-2xl transition-all font-bold text-[0.65rem] uppercase tracking-widest"
          >
            <LogOut size={18} /> LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-52 min-h-screen">
        {/* Header */}
        <header className="h-32 bg-white border-b border-slate-100 px-12 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h2 className="text-3xl font-black text-[#0f172a] uppercase tracking-tight">{activeSection}</h2>
            <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Control Panel</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg border border-blue-100 shadow-sm">
              A
            </div>
          </div>
        </header>

        <div className="p-12">
          {activeSection === 'admissions' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Controls */}
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="relative flex-1 max-w-xl">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search students..." 
                      className="w-full pl-16 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium text-slate-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 bg-[#1e448b] hover:bg-[#15346e] text-white rounded-[1.5rem] transition-all font-black text-[0.7rem] uppercase tracking-widest shadow-xl shadow-blue-900/20">
                      <DownloadCloud size={18} /> Export
                    </button>
                 </div>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Reg No</th>
                        <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Student Name</th>
                        <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Grade</th>
                        <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Info</th>
                        <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                        <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {isLoading ? (
                        <tr>
                          <td colSpan="6" className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center text-slate-300">
                              <Loader2 size={40} className="animate-spin mb-4" />
                              <p className="font-black text-[0.6rem] uppercase tracking-widest">Fetching Data...</p>
                            </div>
                          </td>
                        </tr>
                      ) : filteredAdmissions.map((adm) => (
                        <tr key={adm._id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => setSelectedAdmission(adm)}>
                          <td className="px-10 py-8">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[0.65rem] font-black uppercase whitespace-nowrap">
                              {adm.regNo || 'Not Assigned'}
                            </span>
                          </td>
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                              <a 
                                href={adm.photos?.studentPhoto ? `http://localhost:5000/${adm.photos.studentPhoto}` : '#'} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 hover:scale-110 transition-transform cursor-zoom-in"
                              >
                                {adm.photos?.studentPhoto ? (
                                  <img src={`http://localhost:5000/${adm.photos.studentPhoto}`} alt="Student" className="w-full h-full object-cover" />
                                ) : (
                                  <User size={20} />
                                )}
                              </a>
                              <div>
                                <div className="font-black text-[#0f172a] text-sm uppercase tracking-tight">{adm.studentName.firstName} {adm.studentName.surname}</div>
                                <div className="text-[0.6rem] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{adm.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className="text-blue-700 font-black text-sm">{adm.applyingForGrade}</span>
                          </td>
                          <td className="px-10 py-8">
                            <div className="space-y-1">
                              <div className="text-[#0f172a] font-black text-sm">{adm.phone}</div>
                              <div className="text-[0.65rem] text-slate-400 font-bold uppercase truncate max-w-[150px]">{adm.email}</div>
                            </div>
                          </td>
                          <td className="px-10 py-8 text-slate-500 font-bold text-sm">
                            {new Date(adm.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-10 py-8">
                            <span className={`px-4 py-2 rounded-xl text-[0.65rem] font-black uppercase tracking-widest ${
                              adm.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600 shadow-sm'
                            }`}>
                              {adm.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-bottom-4 duration-500">
              {[
                { id: 'admissions', label: 'Total Inquiries', value: admissions.length, icon: Users, color: 'blue' },
                { id: 'fees', label: 'Verified Payments', value: admissions.filter(a => a.registrationFeePaid).length, icon: CreditCard, color: 'emerald' },
                { id: 'contacts', label: 'Contacts', value: contacts.length, icon: Mail, color: 'sky' },
                { id: 'reviews', label: 'New Reviews', value: 0, icon: Star, color: 'yellow' },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveSection(stat.id)}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-blue-200 transition-all cursor-pointer hover:shadow-xl hover:shadow-blue-900/5 active:scale-95"
                >
                  <div className={`p-5 bg-${stat.color}-50 text-${stat.color}-600 rounded-[2rem] mb-6 group-hover:scale-110 transition-transform`}>
                    <stat.icon size={32} />
                  </div>
                  <h3 className="text-4xl font-black text-[#0f172a] mb-2">{stat.value}</h3>
                  <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'contacts' && (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Sender</th>
                      <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Subject</th>
                      <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Message Snippet</th>
                      <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-8">
                          <div className="font-black text-[#0f172a] text-sm uppercase">{contact.name}</div>
                          <div className="text-[0.65rem] text-slate-400 font-bold lowercase">{contact.email}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[0.65rem] font-black uppercase">
                            {contact.subject}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <p className="text-slate-500 text-sm italic truncate max-w-xs">"{contact.message}"</p>
                        </td>
                        <td className="px-10 py-8 text-slate-400 font-bold text-xs uppercase">
                          {new Date(contact.submittedAt || Date.now()).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'reviews' && (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead>
                     <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Reviewer</th>
                       <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Rating</th>
                       <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Feedback</th>
                       <th className="px-10 py-6 text-left text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                       <th className="px-10 py-6 text-right text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {reviews.map((rev) => (
                       <tr key={rev._id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-10 py-8">
                           <div className="font-black text-[#0f172a] text-sm uppercase">{rev.name}</div>
                           <div className="text-[0.65rem] text-slate-400 font-bold uppercase">{rev.role}</div>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-1">
                               {[...Array(rev.stars || 5)].map((_, i) => (
                                 <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                               ))}
                            </div>
                         </td>
                         <td className="px-10 py-8">
                           <p className="text-slate-500 text-sm italic line-clamp-2 max-w-sm">"{rev.content}"</p>
                         </td>
                         <td className="px-10 py-8">
                           <span className={`px-4 py-1.5 rounded-full text-[0.6rem] font-black uppercase tracking-widest ${
                             rev.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                             rev.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                           }`}>
                             {rev.status}
                           </span>
                         </td>
                         <td className="px-10 py-8">
                           <div className="flex items-center justify-end gap-3">
                             {rev.status === 'Pending' && (
                               <>
                                 <button 
                                   onClick={() => handleReviewUpdate(rev._id, 'Approved')}
                                   className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                   title="Approve"
                                 >
                                   <CheckCircle2 size={18} />
                                 </button>
                                 <button 
                                   onClick={() => handleReviewUpdate(rev._id, 'Rejected')}
                                   className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                   title="Reject"
                                 >
                                   <X size={18} />
                                 </button>
                               </>
                             )}
                             <button 
                               onClick={() => handleReviewDelete(rev._id)}
                               className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                               title="Delete"
                             >
                               <Trash2 size={18} />
                             </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeSection === 'fees' && (
            <div className="bg-white rounded-[3rem] p-20 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center animate-pulse">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                {activeSection === 'fees' ? <CreditCard size={48} className="text-slate-300" /> : <Star size={48} className="text-slate-300" />}
              </div>
              <h2 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-4">{activeSection} Module</h2>
              <p className="text-slate-400 font-medium max-w-md">This feature is currently being integrated with the core system. Check back soon for updates!</p>
            </div>
          )}
        </div>
      </main>

      {/* Admission Detail Modal */}
      <AnimatePresence>
        {selectedAdmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedAdmission(null)}
               className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-white"
             >
                <div className="bg-[#1e448b] p-8 md:p-10 text-white flex justify-between items-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                   <div className="relative z-10 flex items-center gap-6">
                       <a 
                         href={selectedAdmission.photos?.studentPhoto ? `http://localhost:5000/${selectedAdmission.photos.studentPhoto}` : '#'} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="w-20 h-20 bg-white/10 rounded-3xl backdrop-blur-md flex items-center justify-center border border-white/20 overflow-hidden hover:scale-105 transition-transform cursor-zoom-in group"
                       >
                          {selectedAdmission.photos?.studentPhoto ? (
                            <img src={`http://localhost:5000/${selectedAdmission.photos.studentPhoto}`} alt="Student" className="w-full h-full object-cover" />
                          ) : (
                            <User size={40} className="text-white/80" />
                          )}
                       </a>
                       <div>
                          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{selectedAdmission.studentName.firstName} {selectedAdmission.studentName.surname}</h2>
                          <div className="flex items-center gap-3 mt-1">
                             <span className="px-3 py-0.5 bg-yellow-500 text-slate-900 rounded-lg text-[0.6rem] font-black uppercase tracking-widest">
                                {selectedAdmission.applyingForGrade}
                             </span>
                             <span className="text-blue-100/60 font-bold text-[0.6rem] uppercase tracking-[0.2em]">Admission</span>
                          </div>
                       </div>
                   </div>
                   <button onClick={() => setSelectedAdmission(null)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                      <ChevronRight className="rotate-180" size={32} />
                   </button>
                </div>
                
                <div className="p-6 md:p-10 space-y-8 max-h-[85vh] overflow-y-auto">
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      {/* Column 1: Family info */}
                      <div className="space-y-6">
                         <h4 className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-2">Family Information</h4>
                         <div className="space-y-4">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                               <a 
                                 href={selectedAdmission.photos?.fatherPhoto ? `http://localhost:5000/${selectedAdmission.photos.fatherPhoto}` : '#'} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="w-12 h-12 bg-blue-100/50 rounded-xl overflow-hidden shrink-0 border border-blue-100 cursor-zoom-in hover:scale-105 transition-transform group"
                               >
                                  {selectedAdmission.photos?.fatherPhoto ? (
                                    <img src={`http://localhost:5000/${selectedAdmission.photos.fatherPhoto}`} alt="Father" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-blue-400"><User size={20} /></div>
                                  )}
                               </a>
                               <div>
                                  <p className="text-[0.55rem] font-black text-blue-600 uppercase tracking-widest mb-0.5">Father</p>
                                  <p className="text-[#0f172a] font-bold text-base leading-tight">{selectedAdmission.fatherName.firstName} {selectedAdmission.fatherName.surname}</p>
                                  <p className="text-slate-400 text-[0.65rem] font-bold uppercase mt-0.5">{selectedAdmission.fatherName.education}</p>
                               </div>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                               <a 
                                 href={selectedAdmission.photos?.motherPhoto ? `http://localhost:5000/${selectedAdmission.photos.motherPhoto}` : '#'} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="w-12 h-12 bg-pink-100/50 rounded-xl overflow-hidden shrink-0 border border-pink-100 cursor-zoom-in hover:scale-105 transition-transform group"
                               >
                                  {selectedAdmission.photos?.motherPhoto ? (
                                    <img src={`http://localhost:5000/${selectedAdmission.photos.motherPhoto}`} alt="Mother" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-pink-600"><User size={20} /></div>
                                  )}
                               </a>
                               <div>
                                  <p className="text-[0.55rem] font-black text-pink-600 uppercase tracking-widest mb-0.5">Mother</p>
                                  <p className="text-[#0f172a] font-bold text-base leading-tight">{selectedAdmission.motherName.firstName} {selectedAdmission.motherName.surname}</p>
                                  <p className="text-slate-400 text-[0.65rem] font-bold uppercase mt-0.5">{selectedAdmission.motherName.education}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Column 2: Residential Address */}
                      <div className="space-y-6">
                         <h4 className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-2">Residential Address</h4>
                         <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 text-slate-600">
                            <div className="flex gap-4">
                               <MapPin size={20} className="text-blue-600 shrink-0 mt-1" />
                               <div>
                                  <p className="font-bold text-slate-700 leading-snug text-base">{selectedAdmission.residentialAddress}</p>
                                  <div className="mt-4 inline-block px-3 py-1 bg-white rounded-lg border border-blue-100 font-black text-[0.65rem] text-blue-900">
                                     PINCODE: {selectedAdmission.pincode}
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Column 3: Additional Details */}
                      <div className="space-y-6">
                         <h4 className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-2">Additional Details</h4>
                         <div className="grid grid-cols-1 gap-3">
                            {[
                               { label: 'Category', value: selectedAdmission.category },
                               { label: 'Disability', value: selectedAdmission.disability },
                               { label: 'DOB', value: new Date(selectedAdmission.dateOfBirth).toLocaleDateString() },
                               { label: 'Admission Fee', value: selectedAdmission.admissionFeePaid ? 'Paid' : 'Pending' },
                               { label: 'Admission Date', value: new Date(selectedAdmission.submittedAt).toLocaleDateString() }
                            ].map((detail, idx) => (
                               <div key={idx} className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                                  <span className="text-[0.55rem] font-black text-slate-400 uppercase tracking-wider">{detail.label}</span>
                                  <span className="text-[0.7rem] font-bold text-slate-700">{detail.value}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                      <button 
                        onClick={() => exportToCSV(selectedAdmission)}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-xl text-[0.65rem] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        <DownloadCloud size={18} /> Download CSV
                      </button>
                      <a 
                        href={`tel:${selectedAdmission.phone}`}
                        className="flex-1 py-4 bg-[#1e448b] text-white font-black rounded-xl text-[0.65rem] uppercase tracking-widest hover:bg-[#15346e] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 no-underline"
                      >
                        <Phone size={18} /> Call Representative
                      </a>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
