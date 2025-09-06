export type ServiceData = {
  id: number;
  title: string;
  headline: string;
  description: string;
  tags: string[];
};

export const serviceSlides: ServiceData[] = [
  {
    id: 1,
    title: "Website Design",
    headline: "Design That Speaks Your Brand",
    description:
      "In today's digital-first world, your website is often the first interaction your customers have with your business. Our design approach blends strategy, creativity, and user-focused thinking to craft beautiful, intuitive experiences that leave a lasting impression.",
    tags: [
      "User Interface Design",
      "Brand Integration",
      "User Experience Strategy",
      "Interactive Prototyping",
      "Visual Storytelling",
    ],
  },
  {
    id: 2,
    title: "Website Development",
    headline: "Built to Perform. Powered to Scale.",
    description:
      "We bring your designs to life using modern technologies like Next.js and scalable, responsive architecture. Whether it's a one-page showcase or a multi-page platform, we ensure speed, flexibility, and a seamless experience across all devices.",
    tags: [
      "Custom Development",
      "Single-Page Applications",
      "Responsive Implementation",
      "Performance Optimization",
      "Technical SEO",
    ],
  },
  {
    id: 3,
    title: "Tech Maintenance",
    headline: "Ongoing Support That Grows With You",
    description:
      "A great website doesn’t stop at launch. We provide ongoing support to keep your site secure, up-to-date, and optimized. Whether it's updating content, improving search engine visibility, or rolling out new features, we’ve got your back.",
    tags: [
      "Content Updates & Feature Enhancements",
      "Hosting & Server Management",
      "Search Engine Optimization (SEO)",
      "Uptime Monitoring & Fast Recovery",
      "Monthly Maintenance & Reporting",
    ],
  },
];
