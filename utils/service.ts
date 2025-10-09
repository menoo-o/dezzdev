type Service = {
  id: string
  num: string
  title: string
  body: string
  images: { src: string; alt: string }[]
  features: string[]
}

const services: Service[] = [
  {
    id: "web-design",
    num: "01",
    title: "Web Design",
    body: "We craft modern, accessible interfaces that communicate clearly and convert effectively. Strategy, visual systems and micro‑interactions come together for memorable experiences.",
    images: [
      { src: "/placeholder.png", alt: "Landing page mock" },
      { src: "/placeholder.png", alt: "Style tiles" },
      { src: "/placeholder.png", alt: "Component library" },
      { src: "/placeholder.png", alt: "Responsive layouts" },
    ],
    features: [
      "Fully bespoke web design",
      "Animated & interactive",
      "Engaging user experience",
      "Accessible by design (WCAG)",
      "Design systems & components",
    ],
  },
  {
    id: "web-dev",
    num: "02",
    title: "Web Development",
    body: "We build fast Next.js apps and robust APIs with performance, security and a11y baked in. Production‑grade code, automated CI/CD and observability for confidence at scale.",
    images: [
      { src: "/placeholder.png", alt: "Next.js code" },
      { src: "/placeholder.png", alt: "API routes diagram" },
      { src: "/placeholder.png", alt: "Core Web Vitals" },
      { src: "/placeholder.png", alt: "Deployment pipeline" },
    ],
    features: [
      "Next.js App Router",
      "TypeScript + testing",
      "Edge-ready APIs",
      "Analytics & observability",
      "CI/CD automation",
    ],
  },
  {
    id: "seo",
    num: "03",
    title: "SEO Optimization",
    body: "Technical foundations, structured content and search strategy. We improve discoverability, site health, and convert relevant traffic into measurable growth.",
    images: [
      { src: "/placeholder.png", alt: "Search rankings" },
      { src: "/placeholder.png", alt: "Site audit report" },
      { src: "/placeholder.png", alt: "Keyword clusters" },
      { src: "/placeholder.png", alt: "Structured data" },
    ],
    features: [
      "Technical audits",
      "Keyword & content strategy",
      "Structured data (Schema.org)",
      "Site speed improvements",
      "Measurement & reporting",
    ],
  },
]
export default services