import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SecuritySolutions from "../components/SecuritySolutions";
import DemoSection from "../components/DemoSection";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <SecuritySolutions />
        <Stats />
        <DemoSection />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
