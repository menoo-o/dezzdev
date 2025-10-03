interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What makes working with you different from other web designers and developers?",
    answer: "Simple - when you work with me, you are working directly with the person who's going to design and build your site."
  },
  {
    question: "What's your design process like?",
    answer: "I start with grayscale wireframes and layouts in Figma – no colors or fancy stuff, just focusing on the structure and user flow first."
  },
  {
    question: "How long does it typically take to complete a website project?",
    answer: "It depends on what we're building. A custom Astro site usually takes me 4-6 weeks if it's straightforward, maybe 8-10 weeks if we're doing something really custom with lots of animations and special features. If you just need me to add GSAP animations to an existing site, that's usually 2-4 weeks. I only work on one project at a time, so you get my full attention."
  },
  {
    question: "Do you offer website maintenance services after the site is launched?",
    answer: "Yeah, I stick around after launch. I offer different levels of ongoing support - could be just keeping things updated and running smoothly, or we can keep iterating and improving the design based on how users are actually using the site. We'll figure out what makes sense for your situation."
  },
  {
    question: "How much does a typical project cost?",
    answer: "Honestly, it varies quite a bit. Custom Astro builds are different from adding animations to an existing WordPress site, you know? The complexity of the design, how much custom development is needed, what kind of animations we're talking about - it all factors in. I always give you a detailed breakdown after we chat about what you're looking for."
  },
  {
    question: "What kind of support do you offer after the website is launched?",
    answer: "I don't just disappear after launch. I offer different support options depending on what you need - basic maintenance to keep everything running, or more hands-on stuff where we keep improving the site based on how it's performing. Some clients just want peace of mind that someone's keeping an eye on things, others want to keep iterating and adding features."
  },
   {
    question: "How do you handle revisions and changes during the design process?",
    answer: "I show you designs and prototypes as we go, not just at the very end. Usually we'll do 2-3 rounds of revisions on the main design direction, and I'm pretty responsive to feedback throughout. Since it's just me, communication is pretty straightforward - no playing telephone through a bunch of different people."
  },
   {
    question: "How important is design and UI/UX in your process?",
    answer: "Super important. I'm not just a developer who codes things up -the design and user experience are probably what I spend the most time thinking about. Every animation, every interaction, every layout decision is about making the experience better for your users. My background in architecture and 3D design really helps with thinking about space, flow, and how people move through experiences."
  },
  {
    question: "How do you measure the success of a website project?",
    answer: "We figure out what success looks like before we start - maybe that's more people signing up, spending more time on the site, better conversion rates, or just having a site that actually represents your business well. After launch, I can show you how these metrics are improving and where we might want to make adjustments."
  },
  // Add more FAQs here
];

export default faqData;