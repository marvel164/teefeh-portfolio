"use client";
import AboutMe from "./assets/components/AboutMe";
import BeyondTheTools from "./assets/components/BeyondTheTools";
import Certifications from "./assets/components/Certifications";
import ContactSection from "./assets/components/ContactSection";
import Expertise from "./assets/components/Expertise";
import Hero from "./assets/components/Hero";
import Navbar from "./assets/components/Navbar";
import Projects from "./assets/components/Projects";
import ServiceCard from "./assets/components/ServiceCard";
import Skills from "./assets/components/Skills";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Navbar stays fixed */}
      <Navbar />

      {/* Apply top padding to the content wrapper, not Navbar */}
      <div className="pt-16">
        <Hero />
        <ServiceCard />
        <Projects />
        <Expertise />
        <AboutMe />
        <Skills />
        <Certifications />
        <BeyondTheTools />
        <ContactSection />
      </div>
    </div>
  );
};

export default App;
