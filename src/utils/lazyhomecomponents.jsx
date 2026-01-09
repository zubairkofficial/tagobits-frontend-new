import React from 'react';
import { lazy } from 'react';

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