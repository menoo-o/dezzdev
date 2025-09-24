import NewHeroPage from "@/components/Hero-Block/NewHero";
import React from "react";
import FaqBlock from "@/components/FAQs/FaqBlock";
import WhoAreWe from "@/components/Who-Block/WhoAreWe";
// import Services from "@/components/Services-Block/Service";
import StackService from "@/components/StackCards/stack";
import ServiceExport from "@/components/ServicesBlock/Service";
import ServicesCarousel from "@/components/carousel-block/carousel";

export default function App() {
  return (
    <div>
  
      <NewHeroPage />
      <WhoAreWe />
      {/* SERVICES CAROUSEL */}
      <ServicesCarousel />
      {/* INTRO TO SERVICES */}
      <ServiceExport />

      {/* STACK SERVICE (CARDS) */} 
       <StackService />
      {/* Assuming FaqBlock is a component that renders FAQs */}
      <FaqBlock />
  



      
    </div>
  );
}
