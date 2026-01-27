import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'

// pages import
import { Home, AboutUs, Contact, Blogs, BlogDetail, TagoMedia, ApiDocs } from './utils/lazycomponentloader'

import Navbar from './components/navbar'
import Footer from './components/footer'
import ScrollToTop from './components/ScrollToTop'
import BackToTopButton from './components/BackToTopButton'
import LazyLoader from './utils/lazyloader'
import { ThemeProvider } from './context/ThemeContext'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Navbar />}
      <main>
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout><LazyLoader component={Home} /></Layout>} />
          <Route path="/about" element={<Layout><LazyLoader component={AboutUs} /></Layout>} />
          <Route path="/contactus" element={<Layout><LazyLoader component={Contact} /></Layout>} />
          <Route path="/blogs" element={<Layout><LazyLoader component={Blogs} /></Layout>} />
          <Route path="/blogs/:slug" element={<Layout><LazyLoader component={BlogDetail} /></Layout>} />
          <Route path="/tagomedia" element={<Layout><LazyLoader component={TagoMedia} /></Layout>} />
          <Route path="/api-docs" element={<Layout><LazyLoader component={ApiDocs} /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App