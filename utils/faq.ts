interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What does your design-to-development process look like?",
    answer: "Our process flows smoothly from design to development. We share wireframes and prototypes early on to make sure everything aligns with your vision. Revisions are built in — during design and even after launch — so we can fine-tune until it’s just right."
  },
  {
    question: "How long does it typically take to complete a website project?",
    answer: "It really depends on the scope and complexity of the project. A simple website with basic animations usually takes around 2–3 weeks—from design to development to deployment. For larger projects, we can also launch in phases to ensure a smooth rollout."
  },
  {
    question: "Do you offer maintenance services after the site is launched?",
    answer: "Yeah, I stick around after launch. I offer different levels of ongoing support - could be just keeping things updated and running smoothly, or we can keep iterating and improving the design based on how users are actually using the site. We'll figure out what makes sense for your situation."
  },
  {
    question: "What makes working with you different from other web designers and developers?",
    answer: "Simple - when you work with me, you are working directly with the person who's going to design and build your site."
  },
  // Add more FAQs here
];

export default faqData;