import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Layout = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return (
      <main className="flex-1">
        <Outlet />
      </main>
    );
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, marginTop: '80px' }}>
        <Outlet />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Layout;
