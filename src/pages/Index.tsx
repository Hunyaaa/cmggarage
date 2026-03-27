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
      <title>Horpadásjavítás, Polírozás, Fényszóró Felújítás | C.M.G. PDR & CarPolish Nagykanizsa</title>
      <meta name="description" content="Horpadásjavítás, autó polírozás és fényszóró felújítás Nagykanizsán. Kérj ajánlatot gyorsan és egyszerűen a C.M.G. PDR & CarPolish csapatától." />
      <link rel="canonical" href="https://www.cmggarage.hu/" />
      <meta property="og:title" content="C.M.G. PDR & CarPolish | Horpadásjavítás és Polírozás Nagykanizsán" />
      <meta property="og:description" content="Horpadásjavítás, autó polírozás és fényszóró felújítás Nagykanizsán. Kérj ajánlatot egyszerűen." />
      <meta property="og:url" content="https://www.cmggarage.hu/" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="hu_HU" />
      <meta property="og:site_name" content="C.M.G PDR&Carpolish" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="C.M.G. PDR & CarPolish | Horpadásjavítás és Polírozás Nagykanizsán" />
      <meta name="twitter:description" content="Horpadásjavítás, autó polírozás és fényszóró felújítás Nagykanizsán. Kérj ajánlatot egyszerűen." />
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
