import React from 'react';
import { lazy } from 'react';

export const Hero = lazy(() => import('../components/home/hero'));
export const Whytago = lazy(() => import('../components/home/whytago'));
export const Security = lazy(() => import('../components/home/security'));
export const TagoCore = lazy(() => import('../components/home/tagocore'));
export const Worldwide = lazy(() => import('../components/home/worldwide'));
export const Investors = lazy(() => import('../components/home/investors'));
export const Partnerships = lazy(() => import('../components/home/partnerships'));

export const AboutUsHero = lazy(() => import('../components/aboutus/abouthero'));
export const Mission = lazy(() => import('../components/aboutus/mission'));
export const OurStory = lazy(() => import('../components/aboutus/ourstory'));
export const Values = lazy(() => import('../components/aboutus/values'));
export const Impact = lazy(() => import('../components/aboutus/impact'));
export const AboutInvestors = lazy(() => import('../components/aboutus/aboutinvestors'));

export const ContactHero = lazy(() => import('../components/contact/contacthero'));
export const SendMsg = lazy(() => import('../components/contact/sendmsg'));