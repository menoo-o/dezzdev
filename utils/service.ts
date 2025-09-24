import { Service } from '@/types/services';

export const services: Service[] = [
  {
    id: 1,
    title: "Web Design",
    content: {
      description: "Creating visually stunning and user-friendly interfaces",
      bullets: [
        "UI/UX Design",
        "Responsive Layouts",
        "Prototyping",
        "Brand Integration"
      ],
      image: "/images/web-design.jpg"
    }
  },
  {
    id: 2,
    title: "Web Development",
    content: {
      description: "Building robust and scalable web applications",
      bullets: [
        "Frontend & Backend",
        "E-commerce Solutions",
        "API Integration",
        "Performance Optimization"
      ],
      image: "/images/web-dev.jpg"
    }
  },
  {
    id: 3,
    title: "SEO",
    content: {
      description: "Optimizing for search engines and maximum visibility",
      bullets: [
        "Keyword Research",
        "On-Page Optimization",
        "Technical SEO",
        "Analytics & Reporting"
      ],
      image: "/images/seo.jpg"
    }
  }
];