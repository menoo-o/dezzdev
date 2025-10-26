interface Service {
  id: string
  title: string
  tags: string[]
  description: string
  images: { src: string; alt: string; size?: string }[] // optional size control per image
  customClass?: string // optional CSS hook for service-specific layout
}

const services: Service[] = [
  {
    id: "webdev",
    title: "Web Design & Development",
    tags: ["Creative Web Design", "Web Dev", "eCommerce", "One Page Wonder","Copywriting", ],
    description:
      "We craft beautiful, functional websites that engage users and drive results. Every pixel is purposeful, every interaction intentional.",
    images: [
      { src: "/port4.jpg", alt: "Brand strategy", size:"wide" },
       { src: "/pic4.jpg", alt: "Logo concept", size: "tall" },
      { src: "/port1.png", alt: "Visual moodboard", size: "wide" },
    ],
    customClass: "webdev-bento",
  },
  {
    id: "strategy",
    title: "Digital Strategy",
    tags: ["Research", "Planning", "Analytics", "Technical architecture"],
    description:
      "Strategic thinking guides every decision. We analyze, plan, and execute digital strategies that align with your business goals.",
   images: [
      { src: "/digital/img.png", alt: "Brand strategy", size:"wide" },
      { src: "/digital/img_3.png", alt: "Visual moodboard", size: "tall" },
       { src: "/digital/img_4.png", alt: "Logo concept", size: "wide" },
    ],
    customClass: "webdev-bento",
  },
  {
    id: "optimization",
    title: "Performance & SEO",
    tags: ["Optimization", "SEO", "Content optimisation"],
    description:
      "Speed and visibility go hand in hand. We fine-tune every element of your website to deliver lightning-fast performance and optimize it for search engines—ensuring your business ranks higher.",
     images: [
      { src: "/seo/post1.png", alt: "Brand strategy", size:"wide" },
      { src: "/seo/tall.png", alt: "Visual moodboard", size: "tall" },
       { src: "/seo/post2.png", alt: "Logo concept", size: "wide" },
    ],
    customClass: "webdev-bento",
  },
]

export default services