export { portfolio } from './portfolio'
export { computerNav, desktopApps, getDesktopApp, openResumeExternally } from './computerNav'
export type {
  ComputerSectionId,
  ComputerNavItem,
  DesktopAppId,
  DesktopApp,
  DesktopAppKind,
} from './computerNav'
export { publicAsset, getResumeUrl } from './paths'
export {
  careerTimelineStages,
  techProgressionMarkers,
  wordpressProjectsUnaffiliated,
  getCareerStage,
} from './careerTimeline'
export type {
  CareerTimelineStage,
  CareerTimelineProject,
  TechProgressionMarker,
} from './careerTimeline'
export {
  skillCategories,
  getSkillCategory,
  getSkillItem,
  skillNamesByCategory,
} from './skills'
export type {
  SkillCategoryId,
  SkillItem,
  SkillContext,
  SkillCategoryGroup,
} from './skills'
export {
  projectsCatalog,
  featuredProjectIds,
  getFeaturedProjects,
  getAllProjects,
  getPlaceholderProjects,
  getProjectById,
  toLegacyProjects,
} from './projects'
export type { PortfolioProject, ProjectType } from './projects'
export type {
  PortfolioData,
  PersonalInfo,
  SocialLinks,
  SkillCategory,
  ExperienceRole,
  Project,
  EducationItem,
  Certification,
  Interest,
  Language,
} from './types'
