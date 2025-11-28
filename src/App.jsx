import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'

// pages import
import { Home } from './utils/lazycomponentloader'
import { AboutUs } from './utils/lazycomponentloader'
import { Contact } from './utils/lazycomponentloader'

import Navbar from './components/navbar'
import Footer from './components/footer'
import ScrollToTop from './components/ScrollToTop'
import LazyLoader from './utils/lazyloader'
import { ThemeProvider } from './context/ThemeContext'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
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
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App