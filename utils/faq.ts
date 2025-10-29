interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What's your design process like?",
    answer: "We move from design to development in clear, collaborative steps. We share wireframes and design prototypes before moving ahead, ensuring everything aligns with your vision. Revisions are part of the process — we refine during design, and even after deployment, we’re open to making improvements to achieve the perfect final result."
  },
  {
    question: "How long does it typically take to complete a website project?",
    answer: "It really depends on the scope and complexity of the project. A simple website with basic animations usually takes around 2–3 weeks—from design to development to deployment. For larger projects, we can also launch in phases to ensure a smooth rollout."
  },
  {
    question: "Do you offer website maintenance services after the site is launched?",
    answer: "Yeah, I stick around after launch. I offer different levels of ongoing support - could be just keeping things updated and running smoothly, or we can keep iterating and improving the design based on how users are actually using the site. We'll figure out what makes sense for your situation."
  },
  {
    question: "What makes working with you different from other web designers and developers?",
    answer: "Simple - when you work with me, you are working directly with the person who's going to design and build your site."
  },
  // Add more FAQs here
];

export default faqData;