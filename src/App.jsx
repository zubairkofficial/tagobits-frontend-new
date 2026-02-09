import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'

// --- EXISTING PROJECT IMPORTS ---
import { Home, AboutUs, Contact, Blogs, BlogDetail, TagoMedia, ApiDocs } from './utils/lazycomponentloader'

import Navbar from './components/navbar'
import Footer from './components/footer'
import ScrollToTop from './components/ScrollToTop'
import BackToTopButton from './components/BackToTopButton'
import LazyLoader from './utils/lazyloader'
import { ThemeProvider } from './context/ThemeContext'

// --- TAGOCASH ADMIN IMPORTS (Make sure to copy these files to your new project) ---
// Note: Imports paths may need adjustment depending on where you paste the files
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';

// Admin Content Pages
import AdminDashboardPage from './AdminPages/AdminDashboardPage';
import UsersPage from './AdminPages/UsersPage';
import AnalyticsPage from './AdminPages/AnalyticsVisitsLogsPage';
import AdminSettingsPage from './AdminPages/AdminSettingsPage'; // ProfileSetting
import LandingPageContent from './AdminPages/LandingPageContent';
import AdminCustomerCarePage from './AdminPages/AdminCustomerCarePage';
import AdminTermsPage from './AdminPages/AdminTermsPage';
import AdminPersonalDataPolicyPage from './AdminPages/AdminPersonalDataPolicyPage';
import AdminPrivacyPolicyPage from './AdminPages/AdminPrivacyPolicyPage';
import AdminSecurityPolicyPage from './AdminPages/AdminSecurityPolicy';
import AdminFAQPage from './AdminPages/AdminFAQPage';
import AdminBlogPage from './AdminPages/AdminBlogPage';
import AdminTagoMediaPage from './AdminPages/AdminTagoMediaPage';
import AdminNotificationPage from './AdminPages/AdminNotificationPage';
import AdminTicketsPage from './AdminPages/AdminTicketsPage';
import AdminPartnership from './AdminPages/AdminPartnership';
import AdminMasterService from './AdminPages/AdminMasterService';
import AdminTicketsHandler from './AdminPages/AdminTicketHandler';
import AdminJurisdictionsPage from './AdminPages/AdminJurisdictionsPage';
import AdminApiDocumentation from './AdminPages/AdminApiDocumentation';


// --- AUTHENTICATION HELPERS ---

const authenticateUser = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/control-center/login" replace />;
  }
  return null;
};

const AdminRoute = ({ children }) => {
  const authCheck = authenticateUser();
  if (authCheck) return authCheck;

  const role = localStorage.getItem('role');
  if (role !== 'admin' && role !== 'ticket_handler') {
    return <Navigate to="/" replace />; // Redirect to home if not admin
  }
  return <>{children}</>;
};

const NotLoggedInRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/control-center/dashboard" replace />;
  }
  return <>{children}</>;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Don't show Navbar/Footer on Admin Routes
  const isAdminRoute = location.pathname.startsWith('/control-center');

  if (isAdminRoute) return <main>{children}</main>;

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
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Layout><LazyLoader component={Home} /></Layout>} />
          <Route path="/about" element={<Layout><LazyLoader component={AboutUs} /></Layout>} />
          <Route path="/contactus" element={<Layout><LazyLoader component={Contact} /></Layout>} />
          <Route path="/blogs" element={<Layout><LazyLoader component={Blogs} /></Layout>} />
          <Route path="/blogs/:slug" element={<Layout><LazyLoader component={BlogDetail} /></Layout>} />
          <Route path="/tagomedia" element={<Layout><LazyLoader component={TagoMedia} /></Layout>} />
          <Route path="/api-docs" element={<Layout><LazyLoader component={ApiDocs} /></Layout>} />

          {/* --- ADMIN AUTH ROUTES --- */}
          <Route path="/control-center/login" element={
            <NotLoggedInRoute>
              <LazyLoader component={Login} />
            </NotLoggedInRoute>
          } />

          {/* --- ADMIN CONTROL CENTER ROUTES --- */}
          <Route path="/control-center" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<LazyLoader component={AdminDashboardPage} />} />
            <Route path="users" element={<LazyLoader component={UsersPage} />} />
            <Route path="analytics" element={<LazyLoader component={AnalyticsPage} />} />
            <Route path="settings" element={<LazyLoader component={AdminSettingsPage} />} />
            <Route path="content" element={<LazyLoader component={LandingPageContent} />} />
            <Route path="customer-care" element={<LazyLoader component={AdminCustomerCarePage} />} />
            <Route path="terms" element={<LazyLoader component={AdminTermsPage} />} />
            <Route path="personal-data-policy" element={<LazyLoader component={AdminPersonalDataPolicyPage} />} />
            <Route path="privacy-policy" element={<LazyLoader component={AdminPrivacyPolicyPage} />} />

            <Route path="security-policy" element={<LazyLoader component={AdminSecurityPolicyPage} />} />
            <Route path="faqs" element={<LazyLoader component={AdminFAQPage} />} />
            <Route path="blog" element={<LazyLoader component={AdminBlogPage} />} />
            {/* Note: Reuse BlogDetail for admin preview or create AdminBlogDetail if needed */}
            <Route path="blog/:slug" element={<LazyLoader component={BlogDetail} />} />

            <Route path="tago-media" element={<LazyLoader component={AdminTagoMediaPage} />} />
            <Route path="notifications" element={<LazyLoader component={AdminNotificationPage} />} />
            <Route path="tickets" element={<LazyLoader component={AdminTicketsPage} />} />
            <Route path="partnership" element={<LazyLoader component={AdminPartnership} />} />
            <Route path="master-service-agreement" element={<LazyLoader component={AdminMasterService} />} />
            <Route path="ticket-handler" element={<LazyLoader component={AdminTicketsHandler} />} />
            <Route path="jurisdictions" element={<LazyLoader component={AdminJurisdictionsPage} />} />
            <Route path="api-documentation" element={<LazyLoader component={AdminApiDocumentation} />} />
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App