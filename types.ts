
// my-app/utils/phasesdata.ts
export interface Phase {
  id: number
  title: string
  subtitle: string
  description: string
  projects: {
    title: string
    subtitle: string
    image?: string
    color: string
  }[]
}
