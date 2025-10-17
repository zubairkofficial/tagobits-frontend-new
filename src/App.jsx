import React, { Children, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'

// pages import
import { Home } from './utils/lazycomponentloader'
import { AboutUs } from './utils/lazycomponentloader'
import { Contact } from './utils/lazycomponentloader'

// components import
import Navbar from './components/navbar'
import Footer from './components/footer'
// util import
import LazyLoader from './utils/lazyloader'

const Layout = ({ children }) => {
  const location = useLocation();
  // const hideNavFooterRoutes = ['/control-center', '/dashboard', '/wallet', '/cards', '/transactions', '/settings'];
  // const shouldHideNavFooter = hideNavFooterRoutes.some(route => location.pathname.startsWith(route));
  const isAdminPage = location.pathname.startsWith('/control-center');

  return (
    <>
      {/* {!shouldHideNavFooter && <Navbar />} */}
      <Navbar />
      {children}
      <Footer />
      {/* {!shouldHideNavFooter && <Footer />} */}
      {/* <CookieConsent /> */}
    </>
  );
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout><LazyLoader component={Home} /></Layout>} />
        <Route path="/about" element={<Layout><LazyLoader component={AboutUs} /></Layout>} />
        <Route path="/contactus" element={<Layout><LazyLoader component={Contact} /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App