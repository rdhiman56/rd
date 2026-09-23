/**
 * Centralized projects catalog — source of truth: public/resume.pdf
 * Do not invent responsibilities, metrics, URLs, or tech beyond the resume.
 */

export type ProjectType = 'professional' | 'personal' | 'placeholder'

export interface PortfolioProject {
  id: string
  name: string
  /** Empty string when resume has no period */
  period: string
  /** Short summary for cards — derived only from resume text */
  description: string
  stack: string[]
  responsibilities: string[]
  projectType: ProjectType
  url?: string
  githubUrl?: string
  featured?: boolean
  /** Employer / context when listed on resume */
  companyContext?: string
  /**
   * When true, UI shows a "details coming soon" note.
   * Used for HDFC until more resume-safe details are provided.
   */
  detailsPending?: boolean
}

export const projectsCatalog: PortfolioProject[] = [
  {
    id: 'telekom',
    name: 'Telekom',
    period: 'Mar 2022 - April 2023',
    description:
      'PWA Studio / Venia UI e-commerce work extending Magento components.',
    stack: ['React JS', 'GraphQL', 'PWA Studio', 'Venia UI'],
    responsibilities: [
      'Worked on PWA Studio using Venia UI by extending Magento components to build e-commerce applications, including HomePage/PageBuilder Component, Form Submission, Ratings and My Account sections.',
    ],
    projectType: 'professional',
    companyContext: 'Tech Mahindra',
    featured: true,
  },
  {
    id: 'ses',
    name: 'SES',
    period: 'Aug 2021 - Feb 2022',
    description:
      'React SaaS application — UI design and implementation per task.',
    stack: ['React JS', 'Redux', 'SCSS', 'Material UI', 'GraphQL API'],
    responsibilities: [
      'Worked with ReactJS on a SaaS application, focusing on UI design and implementation according to tasks.',
    ],
    projectType: 'professional',
    companyContext: 'Tech Mahindra',
  },
  {
    id: 'icc',
    name: 'ICC',
    period: 'May 2021 - July 2021',
    description:
      'T20 World Cup clothing SaaS on VTEX — designs and email templates.',
    stack: ['VTEX SaaS', 'React'],
    responsibilities: [
      'Related to the T20 World Cup clothing-selling SaaS, including managing designs and email templates from the VTEX side.',
    ],
    projectType: 'professional',
    companyContext: 'Tech Mahindra',
  },
  {
    id: 'bluemarble',
    name: 'BlueMarble',
    period: 'Aug 2020 - April 2021',
    description:
      'React / GraphQL e-commerce application including PLP and home pages.',
    stack: ['React JS', 'Redux', 'SCSS', 'Material UI', 'GraphQL API'],
    responsibilities: [
      'Worked with ReactJS and GraphQL queries to implement an e-commerce application and develop multiple pages including PLP and home components.',
    ],
    projectType: 'professional',
    companyContext: 'Tech Mahindra',
    featured: true,
  },
  {
    id: 'bison',
    name: 'BISON',
    period: 'Dec 2019 - July 2020',
    description: 'Company product built from scratch with React JS and APIs.',
    stack: ['React JS', 'REST API'],
    responsibilities: [
      'Company product built from scratch using React JS and API integration.',
    ],
    projectType: 'professional',
    companyContext: 'Tech Mahindra',
    featured: true,
  },
  {
    id: 'vscreen',
    name: 'vScreen',
    period: 'Sept 2018 - Dec 2019',
    description:
      'Secure screen-sharing for telephony agents and customers on PC, tablet, or mobile.',
    stack: [
      'HTML5',
      'CSS3',
      'SCSS',
      'Bootstrap',
      'Gulp',
      'jQuery',
      'JavaScript',
      'Use Components',
    ],
    responsibilities: [
      'vScreen allows telephony agents and customers to connect through a secure screen-sharing session accessible on PC, tablet or mobile.',
    ],
    projectType: 'professional',
    companyContext: 'Capco Technologies',
  },
  {
    id: 'raid',
    name: 'RAID',
    period: 'October 2018 - December 2018',
    description:
      'Component-based build to support additional SC Johnson group work.',
    stack: [
      'HTML5',
      'CSS3',
      'SCSS',
      'Bootstrap',
      'Gulp',
      'jQuery',
      'JavaScript',
      'Use Components',
    ],
    responsibilities: [
      'Built using components for the purpose of getting additional projects from the SC Johnson group.',
    ],
    projectType: 'professional',
    companyContext: 'Capco Technologies',
  },
  {
    id: 'windex',
    name: 'Windex',
    period: 'May 2018 - July 2018',
    description:
      'SC Johnson product on Sitecore using a component library.',
    stack: [
      'HTML5',
      'CSS3',
      'SCSS',
      'Bootstrap',
      'Gulp',
      'jQuery',
      'JavaScript',
      'Use Components',
    ],
    responsibilities: [
      'SC Johnson product built on the Sitecore platform using a component library.',
    ],
    projectType: 'professional',
    companyContext: 'Capco Technologies',
  },
  {
    id: 'sc-johnson',
    name: 'SC Johnson',
    period: 'Oct 2017 - July 2018',
    description:
      'Client applications assembled from pre-built UI components.',
    stack: [
      'HTML5',
      'CSS3',
      'SCSS',
      'Bootstrap',
      'jQuery',
      'JavaScript',
      'Use Components',
    ],
    responsibilities: [
      'Used pre-built components to create applications according to client requirements.',
    ],
    projectType: 'professional',
    companyContext: 'Mindtree Limited',
  },
  {
    id: 'kabuni',
    name: 'Kabuni',
    period: 'Jan 2017 - Oct 2018',
    description:
      'Responsive Craft CMS sites with admin-managed dynamic content.',
    stack: [
      'Craft',
      'HTML5',
      'CSS3',
      'SCSS',
      'Bootstrap',
      'jQuery',
      'JavaScript',
      'Use Components',
    ],
    responsibilities: [
      'Worked on Craft CMS to develop responsive web designs using media queries, HTML, CSS, SCSS, JavaScript and jQuery, with dynamic content managed through the CMS admin panel.',
    ],
    projectType: 'professional',
    companyContext: 'Kabuni Technologies',
  },
  {
    id: 'mediaclues',
    name: 'Mediaclues',
    period: '',
    description:
      'Personal WordPress site — responsive CMS, content, and SEO plugin analysis.',
    stack: ['WordPress'],
    responsibilities: [
      'Worked as WordPress Designer & Developer to develop a responsive website using WordPress CMS. Worked on blogs/articles and analyzed SEO plugins for website optimization and performance.',
    ],
    projectType: 'personal',
    url: 'http://www.mediaclues.com/',
    featured: true,
  },
  {
    id: 'yugmarg',
    name: 'Yugmarg',
    period: 'April 2016 - June 2016',
    description:
      'Chandigarh newspaper website built on WordPress with SEO plugins.',
    stack: ['WordPress'],
    responsibilities: [
      'Chandigarh newspaper-based website. Worked as WordPress Designer & Developer and used SEO plugins to optimize and improve website performance.',
    ],
    projectType: 'personal',
  },
  {
    id: 'gta5theshop',
    name: 'GTA5TheShop',
    period: 'October 2015 - December 2016',
    description:
      'WordPress site with owner PayPal account integration.',
    stack: ['WordPress'],
    responsibilities: [
      'Worked as WordPress Designer & Developer and integrated the owner\'s PayPal account.',
    ],
    projectType: 'personal',
  },
  /**
   * HDFC Bank — resume lists role/dates only.
   * Do not invent project work; structure reserved for later details.
   */
  {
    id: 'hdfc-placeholder',
    name: 'HDFC Bank',
    period: '2023 - Present',
    description: '',
    stack: [],
    responsibilities: [],
    projectType: 'placeholder',
    companyContext: 'HDFC Bank Ltd. — Senior Software Engineer Manager',
    detailsPending: true,
  },
]

export const featuredProjectIds = [
  'telekom',
  'bluemarble',
  'bison',
  'mediaclues',
] as const

export function getFeaturedProjects(): PortfolioProject[] {
  return featuredProjectIds
    .map((id) => projectsCatalog.find((p) => p.id === id))
    .filter((p): p is PortfolioProject => Boolean(p))
}

export function getAllProjects(): PortfolioProject[] {
  return projectsCatalog.filter((p) => p.projectType !== 'placeholder')
}

export function getPlaceholderProjects(): PortfolioProject[] {
  return projectsCatalog.filter((p) => p.projectType === 'placeholder')
}

export function getProjectById(id: string): PortfolioProject | undefined {
  return projectsCatalog.find((p) => p.id === id)
}

/** Bridge for legacy portfolio.projects consumers (e.g. career timeline) */
export function toLegacyProjects() {
  return projectsCatalog
    .filter((p) => p.projectType !== 'placeholder')
    .map((p) => ({
      id: p.id === 'kabuni' ? 'kabuni-project' : p.id,
      name: p.name,
      period: p.period || undefined,
      companyContext: p.companyContext,
      url: p.url,
      stack: [...p.stack],
      responsibilities: [...p.responsibilities],
      isPersonal: p.projectType === 'personal',
    }))
}
