import NewHeroPage from "../components/Hero-Block/NewHero";
import React from "react";
import FAQSection from "../components/FAQs/FaqBlock";
import WhoAreWe from "../components/Who-Block/WhoAreWe";
// import Services from "@/components/Services-Block/Service";
import ServiceExport from "../components/ServicesBlock/Service";
////////////////////////////////////////////////////////////////////////////
// import ApproachBlock from "../components/Approach-Intro/approach-intro-block";
import BridgeSection from "../components/Bridge-Block/Bridge";
import ServicesShowcase from "@/components/ServiceStack/Cards";


export default function App() {
  return (
    <div>
  
     
    <NewHeroPage />
    <WhoAreWe />
    <BridgeSection />
    <ServiceExport/>
    <ServicesShowcase />
    {/* <ApproachBlock /> */}

    <FAQSection /> 

    
  



      
    </div>
  );
}
