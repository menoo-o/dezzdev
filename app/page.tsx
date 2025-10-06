import NewHeroPage from "../components/Hero-Block/NewHero";
import React from "react";
import FAQSection from "../components/FAQs/FaqBlock";
import WhoAreWe from "../components/Who-Block/WhoAreWe";
// import Services from "@/components/Services-Block/Service";
import StackService from "../components/ServicesBlock/ServiceCards/stack";
import ServiceExport from "../components/ServicesBlock/Service";
////////////////////////////////////////////////////////////////////////////
import ApproachBlock from "../components/Approach-Intro/approach-intro-block";
import BridgeSection from "../components/Bridge-Block/Bridge";

export default function App() {
  return (
    <div>
  
     
      <NewHeroPage /> {/* HERO SECTION */}
      <WhoAreWe /> {/* WHO ARE WE SECTION */}
      <BridgeSection /> {/* BRIDGE SECTION */}
      <ServiceExport /> {/* INTRO TO SERVICES */}
      <StackService /> {/* STACK SERVICE (CARDS=webdesign/web dev) */} 
      <ApproachBlock /> {/* APPROACH BLOCK */}
      <FAQSection /> {/* FAQ SECTION */}

    
  



      
    </div>
  );
}
