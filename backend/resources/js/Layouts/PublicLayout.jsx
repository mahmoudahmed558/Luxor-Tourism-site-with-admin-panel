import React from 'react';
import MainNavbar from '../Components/MainNavbar';
import Footer from '../Components/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MainNavbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
