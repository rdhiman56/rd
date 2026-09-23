import type { PortfolioData } from './types'
import { skillCategories } from './skills'
import { toLegacyProjects } from './projects'

/**
 * Centralized portfolio content.
 * Source of truth: public/resume.pdf (Rahul_Dhiman_Resume.pdf, updated 2026-06).
 * Skills → ./skills.ts · Projects → ./projects.ts
 */
export const portfolio: PortfolioData = {
  personal: {
    name: 'Rahul Dhiman',
    title: 'Senior Software Engineer',
    experienceYears: '12+',
    location: 'Bangalore',
    email: 'rdhiman56@gmail.com',
    phone: '+91 8556976273',
    synopsis: [
      'Diligent Professional with 12+ years of Experience in different technologies of Software Development.',
      'Hands-on experience on React JS, Redux, HTML5, CSS3, SASS, JavaScript, J Query.',
      'Worked with GraphQl & Rest API integrations.',
      'Worked with React Query to fetch data from server.',
      'Hands on Experience on building E-commerce applications.',
      'Worked on UI Framework: Bootstrap & Material UI.',
      'Experience in RWD using media queries & UI Development according to mockup, Style Guide & clients requirements.',
      'Build components, reusable code and libraries for future use.',
      'Worked on CMS: Wordpress, craft.',
      'Hands on Experience on tools like BitBucket, Git.',
      'Worked on embedding Power BI item in a React Web App.',
    ],
  },

  social: {
    github: 'https://github.com/rdhiman56',
    githubUsername: 'rdhiman56',
    linkedin: 'https://www.linkedin.com/in/rahul-dhiman-01710738/',
    /** Relative to public/; resolve with getResumeUrl() / publicAsset(). */
    resumePdf: 'resume.pdf',
  },

  /** Derived from src/data/skills.ts — edit skills there, not here */
  skills: skillCategories.map((category) => ({
    id: category.id,
    label: category.label,
    skills: category.items.map((item) => item.name),
  })),

  experience: [
    {
      id: 'hdfc',
      company: 'HDFC Bank Ltd.',
      title: 'Senior Software Engineer Manager',
      location: 'Bangalore',
      start: '2023',
      end: 'Present',
    },
    {
      id: 'techm',
      company: 'Tech Mahindra',
      title: 'Senior Software Engineer',
      location: 'Bangalore',
      start: '2019',
      end: '2023',
    },
    {
      id: 'capco',
      company: 'Capco Technologies',
      title: 'Consultant 2',
      location: 'Bangalore',
      start: '2018',
      end: '2019',
    },
    {
      id: 'mindtree',
      company: 'Mindtree Limited',
      title: 'Software Engineer',
      location: 'Bangalore',
      start: '2017',
      end: '2018',
      note: 'C2H',
    },
    {
      id: 'kabuni',
      company: 'Kabuni Technologies (India) Pvt. Ltd.',
      title: 'Front-End Developer',
      location: 'Chandigarh',
      start: '2017',
      end: '2017',
      note: 'Closed',
    },
    {
      id: 'onestop',
      company: 'One Stop Code Solutions Pvt. Ltd.',
      title: 'Front-End Developer',
      location: 'Chandigarh',
      start: '2015',
      end: '2016',
      note: 'Closed',
    },
    {
      id: 'ludhiana-beverages',
      company: 'Ludhiana Beverages Pvt. Ltd.',
      title: 'Front-End Developer',
      location: 'Chandigarh',
      start: '2013',
      end: '2015',
    },
  ],

  /** Derived from src/data/projects.ts — edit projects there */
  projects: toLegacyProjects(),

  education: [
    {
      id: 'btech',
      institution: 'Lovely Professional University',
      credential: 'Bachelor of Technology in Computer Science Engineering',
      location: 'Punjab',
      start: '2008',
      end: '2012',
    },
    {
      id: 'hpseb-12',
      institution: 'Government Senior Secondary High School',
      credential: 'HPSEB 12th Board Exam',
      location: 'Himachal Pradesh',
      start: '2007',
      end: '2008',
    },
    {
      id: 'pseb-10',
      institution: 'S.H.S.P Senior Secondary School',
      credential: 'PSEB 10th Board Exam',
      location: 'Punjab',
      start: '2007',
      end: '2008',
    },
  ],

  certifications: [
    {
      id: 'web-js',
      title: 'Programming for Web with JavaScript',
    },
    {
      id: 'cloud-node-react',
      title: 'Developing Cloud Applications with NodeJs and React',
    },
    {
      id: 'flutter-dart',
      title: 'Flutter Development with Dart',
    },
  ],

  interests: [
    { id: 'fitness', label: 'Fitness Enthusiast', category: 'lifestyle' },
    { id: 'travel', label: 'Travelling', category: 'lifestyle' },
    { id: 'badminton', label: 'Badminton', category: 'sport' },
    { id: 'cricket', label: 'Cricket', category: 'sport' },
    {
      id: 'exploring-tech',
      label: 'Exploring New Technologies and implementing it',
      category: 'learning',
    },
  ],

  languages: [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'Hindi' },
    { id: 'pa', name: 'Punjabi' },
    { id: 'him', name: 'Himachali' },
  ],
}
