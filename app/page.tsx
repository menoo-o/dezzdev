// import Component from "@/components/construction-page";
// import ContactButton from "@/components/Contact-Btn/ContactButton";
// import Contact from "@/components/Contact-form/Contact";
// import Logo from '@/public/logo.svg';
// import Image from 'next/image';
// import ContactButton from '@/components/Contact-Btn/ContactButton';
import What from "@/components/What-We-Do-Block/What";
import NewHeroPage from "@/components/Hero-Block/NewHero";
import React from "react";
import FaqBlock from "@/components/FAQs/FaqBlock";
import WhoAreWe from "@/components/Who-Block/WhoAreWe";


export default function App() {
  return (
    <div>
  
      <NewHeroPage />
      <WhoAreWe />
      <FaqBlock />
      
     

      
    </div>
  );
}
