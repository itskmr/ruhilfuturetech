import { useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import TeamSection from '../components/sections/TeamSection';
import WhatWeDoSection from '../components/sections/WhatWeDoSection';
import ContactSection from '../components/sections/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TeamSection />
      <WhatWeDoSection />
      <ContactSection />
    </>
  );
};

export default Home;