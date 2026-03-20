import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import GallerySection from "@/components/GallerySection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Helmet>
      <title>Autópolírozás Nagykanizsa | PDR horpadásjavítás festés nélkül | CMG Garage</title>
      <meta name="description" content="Professzionális autópolírozás, PDR horpadásjavítás és kerámia bevonat Nagykanizsán. Gyors, megfizethető autókozmetika. Hívjon most árajánlatért!" />
      <link rel="canonical" href="https://www.cmggarage.hu/" />
      <meta property="og:title" content="Autópolírozás Nagykanizsa | CMG Garage" />
      <meta property="og:description" content="PDR horpadásjavítás, autópolírozás és kerámia bevonat Nagykanizsán." />
      <meta property="og:url" content="https://www.cmggarage.hu/" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="hu_HU" />
      <meta property="og:site_name" content="C.M.G PDR&Carpolish" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Autópolírozás Nagykanizsa | CMG Garage" />
      <meta name="twitter:description" content="PDR horpadásjavítás, autópolírozás és kerámia bevonat Nagykanizsán." />
    </Helmet>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <HowItWorksSection />
    <ServicesSection />
    <WhyChooseUsSection />
    <GallerySection />
    <PricingSection />
    <ContactSection />
    <Footer />
  </>
);

export default Index;
