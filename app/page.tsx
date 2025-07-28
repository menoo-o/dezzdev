import NewHeroPage from "@/components/Hero-Block/NewHero";
import React from "react";
import FaqBlock from "@/components/FAQs/FaqBlock";
import WhoAreWe from "@/components/Who-Block/WhoAreWe";
import ServicesCarousel from "@/components/Services-Block/Service";

export default function App() {
  return (
    <div>
  
      <NewHeroPage />
      <WhoAreWe />
      <ServicesCarousel />
      
      {/* Assuming FaqBlock is a component that renders FAQs */}
      <FaqBlock />
      
     

      
    </div>
  );
}
