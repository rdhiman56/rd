/**
 * Centralized skills catalog — source of truth: public/resume.pdf
 * Do not invent technologies. Contexts are resume-supported only.
 * No skill percentages.
 */

export type SkillCategoryId =
  | 'frontend'
  | 'api'
  | 'cms'
  | 'devops'
  | 'database'
  | 'ai'

export interface SkillContext {
  /** Project or resume section label */
  label: string
  /** Optional short note from resume */
  detail?: string
}

export interface SkillItem {
  id: string
  name: string
  /** Short factual description grounded in resume usage */
  description: string
  /** Resume-linked project / synopsis context when available */
  contexts: SkillContext[]
  /**
   * exploring = listed under resume Interests / exploring skills
   * applied = evidenced in synopsis, skills list, or project stacks
   */
  evidence: 'applied' | 'exploring'
}

export interface SkillCategoryGroup {
  id: SkillCategoryId
  label: string
  summary: string
  items: SkillItem[]
}

export const skillCategories: SkillCategoryGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    summary:
      'UI development across component libraries, responsive layouts, and modern React applications.',
    items: [
      {
        id: 'react-js',
        name: 'React JS',
        description:
          'Hands-on React development for SaaS and e-commerce UIs, including reusable components and page builds.',
        evidence: 'applied',
        contexts: [
          { label: 'Telekom', detail: 'PWA Studio / Venia UI e-commerce' },
          { label: 'SES', detail: 'React SaaS UI design & implementation' },
          { label: 'BlueMarble', detail: 'E-commerce pages (PLP, home)' },
          { label: 'BISON', detail: 'Product built with React JS + API integration' },
          { label: 'ICC', detail: 'React with VTEX SaaS' },
        ],
      },
      {
        id: 'redux',
        name: 'Redux',
        description:
          'State management on React applications listed in resume project stacks.',
        evidence: 'applied',
        contexts: [
          { label: 'SES', detail: 'React Js, Redux, SCSS, Material UI, GraphQL' },
          {
            label: 'BlueMarble',
            detail: 'React Js, Redux, SCSS, Material UI, GraphQL',
          },
        ],
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        description:
          'Core language for interactive UI, component libraries, and front-end delivery.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Hands-on experience with JavaScript' },
          {
            label: 'Capco / Mindtree projects',
            detail: 'vScreen, Raid, Windex, SC Johnson component builds',
          },
        ],
      },
      {
        id: 'html5',
        name: 'HTML5',
        description:
          'Semantic markup and responsive page structure for client UIs and CMS themes.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Hands-on experience on HTML5' },
          {
            label: 'Kabuni / Capco / Mindtree',
            detail: 'Listed in project stacks (HTML5)',
          },
        ],
      },
      {
        id: 'css3',
        name: 'CSS3',
        description:
          'Styling and responsive layouts using media queries against mockups and style guides.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Hands-on experience on CSS3; RWD with media queries' },
          {
            label: 'Kabuni / Capco / Mindtree',
            detail: 'Listed in project stacks (CSS3)',
          },
        ],
      },
      {
        id: 'sass-scss',
        name: 'SASS/SCSS',
        description:
          'Stylesheet authoring for React and component-library projects.',
        evidence: 'applied',
        contexts: [
          { label: 'SES', detail: 'SCSS in project stack' },
          { label: 'BlueMarble', detail: 'SCSS in project stack' },
          {
            label: 'Capco / Mindtree / Kabuni',
            detail: 'SCSS listed across component projects',
          },
        ],
      },
      {
        id: 'jquery',
        name: 'jQuery',
        description:
          'Front-end scripting on component-based marketing and product sites.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Hands-on experience on J Query' },
          {
            label: 'vScreen, Raid, Windex, SC Johnson, Kabuni',
            detail: 'J Query listed in project stacks',
          },
        ],
      },
      {
        id: 'material-ui',
        name: 'Material UI',
        description: 'UI framework used on React SaaS and e-commerce work.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'UI Framework: Bootstrap & Material UI' },
          { label: 'SES', detail: 'Material UI in stack' },
          { label: 'BlueMarble', detail: 'Material UI in stack' },
        ],
      },
      {
        id: 'bootstrap',
        name: 'Bootstrap',
        description:
          'UI framework for responsive layouts and component-based page builds.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'UI Framework: Bootstrap & Material UI' },
          {
            label: 'Capco / Mindtree / Kabuni',
            detail: 'Bootstrap listed in project stacks',
          },
        ],
      },
      {
        id: 'vue-js',
        name: 'Vue JS',
        description: 'Listed among resume frontend skills.',
        evidence: 'applied',
        contexts: [
          {
            label: 'Resume skills',
            detail: 'Vue Js appears in the skills section; no project stack entry',
          },
        ],
      },
    ],
  },

  {
    id: 'api',
    label: 'APIs / Data Integration',
    summary:
      'Fetching and integrating remote data into React applications via GraphQL and REST.',
    items: [
      {
        id: 'graphql',
        name: 'GraphQL',
        description:
          'GraphQL queries and mutations for e-commerce and SaaS React applications.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Worked with GraphQl & Rest API integrations' },
          { label: 'Telekom', detail: 'graphQL Queries and mutations' },
          { label: 'SES', detail: 'Graphql Api Queries' },
          { label: 'BlueMarble', detail: 'Graphql Api Queries' },
        ],
      },
      {
        id: 'rest-apis',
        name: 'REST APIs',
        description:
          'REST API integration for React products and front-end data flows.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Worked with GraphQl & Rest API integrations' },
          { label: 'BISON', detail: 'React Js and rest Api' },
        ],
      },
      {
        id: 'react-query',
        name: 'React Query',
        description: 'Used to fetch data from the server in React applications.',
        evidence: 'applied',
        contexts: [
          {
            label: 'Synopsis',
            detail: 'Worked with React Query to fetch data from server',
          },
        ],
      },
    ],
  },

  {
    id: 'cms',
    label: 'CMS / E-commerce',
    summary:
      'Content platforms and commerce storefronts including Magento PWA Studio and VTEX.',
    items: [
      {
        id: 'wordpress',
        name: 'WordPress',
        description:
          'WordPress design & development for responsive sites, SEO plugins, and CMS content workflows.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Worked on CMS: Wordpress, craft' },
          { label: 'Mediaclues', detail: 'Own project — WordPress designer & developer' },
          { label: 'Yugmarg', detail: 'Chandigarh newspaper site' },
          { label: 'Gta5theshop', detail: 'WordPress + PayPal integration' },
        ],
      },
      {
        id: 'craft-cms',
        name: 'Craft CMS',
        description:
          'Craft CMS for dynamic, admin-manageable responsive web builds.',
        evidence: 'applied',
        contexts: [
          { label: 'Synopsis', detail: 'Worked on CMS: Wordpress, craft' },
          {
            label: 'Kabuni',
            detail:
              'Responsive web design with Craft; content manageable from admin panel',
          },
        ],
      },
      {
        id: 'vtex',
        name: 'VTEX',
        description:
          'VTEX SaaS commerce work including designs and email templates.',
        evidence: 'applied',
        contexts: [
          {
            label: 'ICC',
            detail: 'T20 World Cup clothing SaaS — VTEX designs & email templates',
          },
        ],
      },
      {
        id: 'pwa-venia',
        name: 'PWA Studio / Venia UI',
        description:
          'Adobe PWA Studio with Venia UI, extending Magento components for e-commerce.',
        evidence: 'applied',
        contexts: [
          {
            label: 'Telekom',
            detail:
              'HomePage-PageBuilder, forms, ratings, My Account via veniaUI / Magento components',
          },
          {
            label: 'Resume skills',
            detail: 'PWA Studio - Venia Ui with React Js',
          },
        ],
      },
    ],
  },

  {
    id: 'devops',
    label: 'DevOps / Cloud',
    summary:
      'Listed on the resume under Interests / exploring — not tied to a specific employer project stack.',
    items: [
      {
        id: 'jenkins',
        name: 'Jenkins',
        description: 'Listed in resume Interests alongside DevOps tooling.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume Interests', detail: 'Jenkins' }],
      },
      {
        id: 'ci-cd',
        name: 'CI/CD',
        description: 'Listed in resume Interests as CI-CD.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume Interests', detail: 'CI-CD' }],
      },
      {
        id: 'aws',
        name: 'AWS',
        description: 'Listed in resume Interests / exploring cloud skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume Interests', detail: 'AWS' }],
      },
      {
        id: 'azure',
        name: 'Azure',
        description: 'Listed in resume Interests / exploring cloud skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume Interests', detail: 'Azure' }],
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        description: 'Listed in resume Interests / exploring skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume Interests', detail: 'Kubernetes' }],
      },
      {
        id: 'linux',
        name: 'Linux',
        description: 'Linux commands listed among resume skills.',
        evidence: 'applied',
        contexts: [{ label: 'Resume skills', detail: 'Linux commands' }],
      },
    ],
  },

  {
    id: 'database',
    label: 'Database / Other Technologies',
    summary:
      'Data stores and foundational topics listed on the resume skills / interests sections.',
    items: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        description: 'Listed among resume skills.',
        evidence: 'applied',
        contexts: [{ label: 'Resume skills', detail: 'MongoDB' }],
      },
      {
        id: 'firebase',
        name: 'Firebase',
        description: 'Listed among resume skills (FireBase).',
        evidence: 'applied',
        contexts: [{ label: 'Resume skills', detail: 'FireBase' }],
      },
      {
        id: 'java',
        name: 'Java',
        description: 'Listed in resume Interests / exploring skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume Interests', detail: 'Java' }],
      },
      {
        id: 'dsa',
        name: 'DSA',
        description: 'Data structures & algorithms — listed in resume Interests.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume Interests', detail: 'DSA' }],
      },
    ],
  },

  {
    id: 'ai',
    label: 'AI / GenAI',
    summary:
      'AI & GenAI tools and practices listed on the resume. Not attributed to a specific employer project.',
    items: [
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        description: 'Listed under resume AI & GenAI skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume AI & GenAI', detail: 'ChatGPT' }],
      },
      {
        id: 'claude-ai',
        name: 'Claude AI',
        description: 'Listed under resume AI & GenAI skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume AI & GenAI', detail: 'Claude AI' }],
      },
      {
        id: 'perplexity-ai',
        name: 'Perplexity AI',
        description: 'Listed under resume AI & GenAI skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume AI & GenAI', detail: 'Perplexity AI' }],
      },
      {
        id: 'notebooklm',
        name: 'NotebookLM',
        description: 'Listed under resume AI & GenAI skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume AI & GenAI', detail: 'NotebookLM' }],
      },
      {
        id: 'ai-agents',
        name: 'AI Agents',
        description: 'Listed under resume AI & GenAI skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume AI & GenAI', detail: 'AI Agents' }],
      },
      {
        id: 'prompt-engineering',
        name: 'Prompt Engineering',
        description: 'Listed under resume AI & GenAI skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume AI & GenAI', detail: 'Prompt Engineering' }],
      },
      {
        id: 'generative-ai',
        name: 'Generative AI',
        description: 'Listed under resume AI & GenAI skills.',
        evidence: 'exploring',
        contexts: [{ label: 'Resume AI & GenAI', detail: 'Generative AI' }],
      },
    ],
  },
]

export function getSkillCategory(
  id: SkillCategoryId,
): SkillCategoryGroup | undefined {
  return skillCategories.find((c) => c.id === id)
}

export function getSkillItem(
  skillId: string,
): { category: SkillCategoryGroup; item: SkillItem } | undefined {
  for (const category of skillCategories) {
    const item = category.items.find((s) => s.id === skillId)
    if (item) return { category, item }
  }
  return undefined
}

/** Flat name list per category — for lightweight consumers */
export function skillNamesByCategory(): Record<SkillCategoryId, string[]> {
  return skillCategories.reduce(
    (acc, category) => {
      acc[category.id] = category.items.map((item) => item.name)
      return acc
    },
    {} as Record<SkillCategoryId, string[]>,
  )
}
