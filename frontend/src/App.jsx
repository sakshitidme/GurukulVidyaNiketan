import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import PrincipalDesk from './pages/PrincipalDesk';
import Admissions from './pages/Admissions';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Testimonials from './pages/Testimonials';
import TermsConditions from './pages/TermsConditions';
import SiteMap from './pages/SiteMap';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Staff from './pages/Staff';
import Trustees from './pages/Trustees';
import SecretaryProfile from './pages/SecretaryProfile';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="staff" element={<Staff />} />
          <Route path="events" element={<Events />} />
          <Route path="principal-desk" element={<PrincipalDesk />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="sitemap" element={<SiteMap />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="trustees" element={<Trustees />} />
          <Route path="secretary-profile" element={<SecretaryProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
