import NewHeroPage from "../components/Hero-Block/NewHero";
import React from "react";
import FAQSection from "../components/FAQs/FaqBlock";
import WhoAreWe from "../components/Who-Block/WhoAreWe";
// import Services from "@/components/Services-Block/Service";
import StackService from "../components/ServicesBlock/ServiceCards/stack";
import ServiceExport from "../components/ServicesBlock/Service";
////////////////////////////////////////////////////////////////////////////
import CarouselText from "../components/carousel-block/carousel";
import ApproachBlock from "../components/Approach-Intro/approach-intro-block";


export default function App() {
  return (
    <div>
  
      <NewHeroPage />
      <WhoAreWe />
      {/*CAROUSEL = Transform your digital experiences */}
      <CarouselText />
      {/* INTRO TO SERVICES */}
      <ServiceExport />

      {/* STACK SERVICE (CARDS=webdesign/web dev) */} 
       <StackService />

      <ApproachBlock />
      
      {/* Assuming FaqBlock is a component that renders FAQs */}
      <FAQSection />

    
  



      
    </div>
  );
}
