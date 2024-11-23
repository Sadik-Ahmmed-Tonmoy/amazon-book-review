import FAQs from "@/components/home/FAQs";
import Features from "@/components/home/Features";
import GettingStarted from "@/components/home/GettingStarted";
import HeroSection from "@/components/home/HeroSection";
import Pricing from "@/components/home/Pricing";
import WhatOurCustomerThinks from "@/components/home/WhatOurCustomerThinks";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import PageTransition from "@/components/ui/PageTransition";

const HomePage = () => {
  return (
    <PageTransition>
      {/* main page */}
      <Navbar />
      <HeroSection />
      <GettingStarted />
      <WhatOurCustomerThinks />
      <Features />
      <FAQs />
      <Pricing />
      <Footer />
    </PageTransition>
  );
};

export default HomePage;
