import React from 'react';
import { Navbar, Footer, Toaster } from "../Components";

function Layout({ children }) {
  return (
    <div className='relative'>
      <Navbar />
      <Toaster />
      {children}
      <Footer />
    </div>
  )
}
// mb-16 mt-14
export default Layout