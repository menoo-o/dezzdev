type Service = {
  id: string
  num: string
  title: string
  body: string
  images: { src: string; alt: string }[]
  featureGroups?: { label: string; items: string[] }[]
}

const services: Service[] = [
  {
    id: "webdev",
    num: "01",
    title: "Web Developement",
    body: "Precision-crafted digital experiences. From front-end visuals to optimized back-end code, we build fast, functional websites where every pixel and line is designed for performance, perfect brand alignment, and maximum visitor conversion.",
    images: [
      { src: "/placeholder.png", alt: "Next.js code" },
      { src: "/placeholder.png", alt: "API routes diagram" },
      { src: "/placeholder.png", alt: "Core Web Vitals" },
      { src: "/placeholder.png", alt: "Deployment pipeline" },
    ],
    featureGroups: [
      {
        label: "Design",
        items: ["UX/UI Crafting", "Visual Storytelling", "Brand Consistency"],
      },
      {
        label: "Developement",
        items: ["Custom Code", "Single Page Applications", "CMS Integration"],
      },
      {
        label: "Performance",
        items: ["Responsive Design", "Fast Load Times", "SEO Foundations"],
      },
    ],
  },
  {
    id: "seo",
    num: "02",
    title: "SEO & Profile Building",
    body: "We help your business get discovered online — not just on Google, but through modern AI-powered platforms like ChatGPT and Gemini. From optimizing your website and profiles to improving local visibility and brand trust, we make sure your customers find you first.",
    images: [
      { src: "/placeholder.png", alt: "Next.js code" },
      { src: "/placeholder.png", alt: "API routes diagram" },
      { src: "/placeholder.png", alt: "Core Web Vitals" },
      { src: "/placeholder.png", alt: "Deployment pipeline" },
    ],
    featureGroups: [
      {
        label: "Search Optimization",
        items: ["SEO Audits", "Keyword Strategy", "On-Page Optimization"],
      },
      {
        label: "Off-site Growth",
        items: ["Link Building", "Local SEO", "Reputation Management"],
      },
      {
        label: "Next-gen Visibility",
        items: ["AEO (AI Search)", "Schema Markup", "Google Reviews"],
      },
    ],
  },
  {
    id: "webmaintain",
    num: "03",
    title: "Website Maintenance",
    body: "Website is not something that you just build and forget. Be adding new features, updating content, renewing designs or fixing bugs, we are here to do the annoying part and to keep your website fresh and up-to-date so you can focus on your business.",
    images: [
      { src: "/placeholder.png", alt: "Next.js code" },
      { src: "/placeholder.png", alt: "API routes diagram" },
      { src: "/placeholder.png", alt: "Core Web Vitals" },
      { src: "/placeholder.png", alt: "Deployment pipeline" },
    ],
   
    featureGroups: [
      {
        label: "Technical Care",
        items: ["Code Refactoring", "Security Patches", "Speed Optimization"],
      },
      {
        label: "Creative Updates",
        items: ["Imagery & Media", "Interactive Features", "Promotional Design"],
      },
      {
        label: "Content Support",
        items: ["Blog Uploads", "Product Updates", "UI Adjustments"],
      },
    ],
  },
]

export default services