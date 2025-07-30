import NewHeroPage from "@/components/Hero-Block/NewHero";
import React from "react";
import FaqBlock from "@/components/FAQs/FaqBlock";
import WhoAreWe from "@/components/Who-Block/WhoAreWe";
import Services from "@/components/Services-Block/Service";
import StackCards from "@/components/Check";

export default function App() {
  return (
    <div>
  
      <NewHeroPage />
      <WhoAreWe />
      <Services />
      <StackCards />     
      
      {/* Assuming FaqBlock is a component that renders FAQs */}
      <FaqBlock />
      
     

      
    </div>
  );
}
