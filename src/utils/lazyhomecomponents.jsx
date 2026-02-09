import { lazy } from 'react';

// --- YOUR EXISTING PROJECT COMPONENTS ---
export const Hero = lazy(() => import('../components/home/hero'));
export const MoneySection = lazy(() => import('../components/home/MoneySection'));
export const TagoBridge = lazy(() => import('../components/home/TagoBridge'));
export const VideoSection = lazy(() => import('../components/home/VideoSection'));
export const NewFeatures = lazy(() => import('../components/home/NewFeatures'));
export const WhyUse = lazy(() => import('../components/home/WhyUse'));
export const GetMore = lazy(() => import('../components/home/GetMore'));
export const MobileApp = lazy(() => import('../components/home/MobileApp'));
export const Jurisdictions = lazy(() => import('../components/home/Jurisdictions'));
export const HomeBlogs = lazy(() => import('../components/home/HomeBlogs'));
export const NewsMedia = lazy(() => import('../components/home/NewsMedia'));
export const Whytago = lazy(() => import('../components/home/whytago'));
export const Security = lazy(() => import('../components/home/security'));
export const TagoCore = lazy(() => import('../components/home/tagocore'));
export const Worldwide = lazy(() => import('../components/home/worldwide'));
export const Investors = lazy(() => import('../components/home/investors'));
export const Partnerships = lazy(() => import('../components/home/partnerships'));
export const Partners = lazy(() => import('../components/home/partners'));

export const AboutUsHero = lazy(() => import('../components/aboutus/abouthero'));
export const Mission = lazy(() => import('../components/aboutus/mission'));
export const OurStory = lazy(() => import('../components/aboutus/ourstory'));
export const Values = lazy(() => import('../components/aboutus/values'));
export const Impact = lazy(() => import('../components/aboutus/impact'));
export const AboutInvestors = lazy(() => import('../components/aboutus/aboutinvestors'));

export const ContactHero = lazy(() => import('../components/contact/contacthero'));
export const SendMsg = lazy(() => import('../components/contact/sendmsg'));

// --- ADDED TAGOCASH ADMIN COMPONENTS ---

// Public Pages needed for Admin Flow
export const Login = lazy(() => import('../pages/Login')); // Ensure Login.tsx is copied

// Admin Pages
export const AdminDashboardPage = lazy(() => import('../AdminPages/AdminDashboardPage'));
export const UsersPage = lazy(() => import('../AdminPages/UsersPage'));
export const AnalyticsPage = lazy(() => import('../AdminPages/AnalyticsVisitsLogsPage'));
export const AdminSettingsPage = lazy(() => import('../AdminPages/AdminSettingsPage')); // Was ProfileSetting in original
export const AdminCustomerCarePage = lazy(() => import('../AdminPages/AdminCustomerCarePage'));
export const AdminTermsPage = lazy(() => import('../AdminPages/AdminTermsPage'));
export const AdminPersonalDataPolicyPage = lazy(() => import('../AdminPages/AdminPersonalDataPolicyPage'));
export const AdminHowtoPage = lazy(() => import('../AdminPages/AdminHowtoPage'));
export const AdminPrivacyPolicyPage = lazy(() => import('../AdminPages/AdminPrivacyPolicyPage'));
export const AdminTimerPage = lazy(() => import('../AdminPages/AdminTimerPage'));
export const AdminBlogPage = lazy(() => import('../AdminPages/AdminBlogPage'));
export const AdminTagoMediaPage = lazy(() => import('../AdminPages/AdminTagoMediaPage'));
export const AdminUseCasePage = lazy(() => import('../AdminPages/AdminUseCasePage'));
export const LandingPageContent = lazy(() => import('../AdminPages/LandingPageContent'));
export const AdminFAQPage = lazy(() => import('../AdminPages/AdminFAQPage'));
export const AdminFeesPage = lazy(() => import('../AdminPages/AdminFeesPage')); // Was Membership
export const AdminNotificationPage = lazy(() => import('../AdminPages/AdminNotificationPage'));
export const AdminSecurityPolicyPage = lazy(() => import('../AdminPages/AdminSecurityPolicy'));
export const AdminMasterService = lazy(() => import('../AdminPages/AdminMasterService'));
export const TagoBankNewContent = lazy(() => import('../AdminPages/TagoBankNewContent'));
export const AdminKnowledgeBasePage = lazy(() => import('../AdminPages/AdminKnowledgeBasePage'));
export const AdminPartnership = lazy(() => import('../AdminPages/AdminPartnership'));
export const AdminTicketsPage = lazy(() => import('../AdminPages/AdminTicketsPage'));
export const AdminTicketsHandler = lazy(() => import('../AdminPages/AdminTicketHandler'));
export const AdminJurisdictionsPage = lazy(() => import('../AdminPages/AdminJurisdictionsPage'));
export const AdminTagoBridgeCountries = lazy(() => import('../AdminPages/AdminTagoBridgeCountries'));
export const AdminBusinessServicesContent = lazy(() => import('../AdminPages/AdminBusinessServicesContent'));
export const AdminEnterpriseServicesContent = lazy(() => import('../AdminPages/AdminEnterpriseServicesContent'));
export const AdminMerchantAccountContent = lazy(() => import('../AdminPages/AdminMerchantAccountContent'));
export const AdminApiDocumentation = lazy(() => import('../AdminPages/AdminApiDocumentation'));
export const AdminTranslationsPage = lazy(() => import('../AdminPages/AdminTranslationsPage'));