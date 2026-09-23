export interface PersonalInfo {
  name: string
  title: string
  experienceYears: string
  location: string
  email: string
  phone: string
  synopsis: string[]
}

export interface SocialLinks {
  github: string
  githubUsername: string
  linkedin: string
  resumePdf: string
}

export interface SkillCategory {
  id: string
  label: string
  skills: string[]
}

export interface ExperienceRole {
  id: string
  company: string
  title: string
  location: string
  start: string
  end: string
  note?: string
}

export interface Project {
  id: string
  name: string
  period?: string
  companyContext?: string
  url?: string
  stack: string[]
  responsibilities: string[]
  isPersonal?: boolean
}

export interface EducationItem {
  id: string
  institution: string
  credential: string
  location: string
  start: string
  end: string
}

export interface Certification {
  id: string
  title: string
}

export interface Interest {
  id: string
  label: string
  category: 'sport' | 'lifestyle' | 'learning' | 'ai'
}

export interface Language {
  id: string
  name: string
}

export interface PortfolioData {
  personal: PersonalInfo
  social: SocialLinks
  skills: SkillCategory[]
  experience: ExperienceRole[]
  projects: Project[]
  education: EducationItem[]
  certifications: Certification[]
  interests: Interest[]
  languages: Language[]
}
