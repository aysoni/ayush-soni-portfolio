export const personal = {
  name: 'Ayush Soni',
  role: 'Backend Software Engineer',
  tagline: 'I build scalable microservices and AI-augmented backend systems that power mission-critical platforms.',
  email: 'soniayush2104@gmail.com',
  phone: '+91 8690678559',
  location: 'Pune, India',
  linkedin: 'https://linkedin.com/in/soni-ayush',
  github: 'https://github.com/aysoni',
  navLogo: 'AS',
  /** Base filename without .pdf — download appends `_YYYY-MM-DD` before `.pdf` */
  resumeFileBase: 'Ayush_Soni_Resume',
  /** Served from public/resume/ (copy from src/lib when you update the PDF) */
  resumePublicPath: '/resume/Ayush_Soni_Resume.pdf',
}

export const typedPhrases = [
  'Backend Software Engineer',
  'Microservices Architect',
  'Spring Boot Developer',
  'AI-Augmented Engineer',
  'Systems Builder',
]

export const heroStats = [
  { value: '2.8+', label: 'Years Exp.' },
  { value: '15+', label: 'Projects' },
  { value: '30%', label: 'API Latency ↓' },
  { value: '500+', label: 'Commits' },
]

export const stats = [
  { label: 'Experience', value: '2.8+', description: 'Years in production systems' },
  { label: 'Projects', value: '10+', description: 'Live enterprise applications' },
  { label: 'Skills', value: '15+', description: 'Production technologies' },
  { label: 'Commits', value: '5K+', description: 'Active development' },
]

export const aboutParagraphs = [
  `I'm a <strong>Backend Software Engineer</strong> at Virtusa, Pune, focused on enterprise Spring Boot microservices, Kafka-driven workflows, and secure REST APIs for enterprise IT governance and data-reconciliation platforms.`,
  `I care about <strong>performance and reliability</strong> — from SQL tuning and indexing to OAuth2/JWT and production incident response.`,
  `Recent impact: <strong>~30% faster APIs</strong>, <strong>~40% quicker reports</strong>, and significant reduction in manual steps via Camunda BPM automation.`,
  `I also lean on <strong>AI-assisted development tools</strong> like Claude and Amazon Q to accelerate boilerplate scaffolding, debugging, and code review — shipping faster without cutting corners on quality.`,
]

export const aboutTags = [
  'Java 11', 'Spring Boot', 'Microservices', 'Kafka', 'PostgreSQL', 'Oracle SQL',
  'Camunda BPM', 'Docker', 'Jenkins', 'CI/CD', 'JUnit', 'OAuth2', 'AI-Assisted Dev',
]

export const skillGroups = [
  { title: 'Languages', tags: ['Java SE 11', 'SQL', 'JavaScript'] },
  { title: 'Frameworks & Libraries', tags: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Hibernate / JPA', 'React'] },
  { title: 'Databases', tags: ['Oracle SQL', 'PostgreSQL'] },
  { title: 'Messaging & Workflow', tags: ['Apache Kafka', 'Camunda BPM'] },
  { title: 'DevOps & Cloud', tags: ['Git', 'GitLab', 'Jenkins', 'CI/CD Pipelines', 'Docker', 'Linux'] },
  { title: 'AI-Augmented Development', tags: ['Claude (Anthropic)', 'Amazon Q Developer', 'Prompt Engineering', 'AI Code Review'] },
  { title: 'Security & Testing', tags: ['OAuth2', 'JWT', 'RBAC', 'JUnit', 'Redis'] },
  { title: 'Tools & IDEs', tags: ['Maven', 'IntelliJ IDEA', 'WebLogic', 'Postman'] },
]

export interface SkillItem {
  name: string
  icon: string
  tier: 'Production' | 'Strong' | 'Working Knowledge'
  tools: string[]
  filled: number
  total: number
}

export interface SkillGroup {
  tier: string
  description: string
  skills: SkillItem[]
}

export const skillCapabilities: SkillGroup[] = [
  {
    tier: 'Production Experience',
    description: 'Technologies powering enterprise systems, SLA compliance, and mission-critical APIs.',
    skills: [
      { name: 'Java 11 / SE', icon: 'fab fa-java', tier: 'Production', tools: ['Streams', 'Multithreading', 'JVM Tuning'], filled: 5, total: 5 },
      { name: 'Spring Boot & Microservices', icon: 'fas fa-leaf', tier: 'Production', tools: ['Spring Security', 'REST APIs', 'Spring Data JPA'], filled: 5, total: 5 },
      { name: 'Oracle SQL & PostgreSQL', icon: 'fas fa-database', tier: 'Production', tools: ['Query Optimization', 'Composite Indexes', 'Schema Design'], filled: 5, total: 5 },
      { name: 'Apache Kafka', icon: 'fas fa-stream', tier: 'Production', tools: ['Event Streaming', 'Consumer Groups', 'Decoupled Pipelines'], filled: 4, total: 5 },
      { name: 'Spring Security & OAuth2', icon: 'fas fa-lock', tier: 'Production', tools: ['JWT Authentication', 'RBAC', 'Stateless API Security'], filled: 4, total: 5 },
      { name: 'JUnit & Service Testing', icon: 'fas fa-vials', tier: 'Production', tools: ['Unit Testing', 'Regression Suites', 'Mockito'], filled: 4, total: 5 },
    ],
  },
  {
    tier: 'Working Knowledge',
    description: 'Workflow orchestration, container infrastructure, and supporting frameworks.',
    skills: [
      { name: 'Camunda BPM', icon: 'fas fa-project-diagram', tier: 'Working Knowledge', tools: ['Workflow Automation', 'BPMN 2.0', 'Task Workers'], filled: 4, total: 5 },
      { name: 'Docker & CI/CD Pipelines', icon: 'fab fa-docker', tier: 'Working Knowledge', tools: ['Containerization', 'Jenkins', 'GitLab CI'], filled: 4, total: 5 },
      { name: 'Redis Caching', icon: 'fas fa-bolt', tier: 'Working Knowledge', tools: ['Session Store', 'In-Memory Cache', 'Spring Cache'], filled: 3, total: 5 },
      { name: 'React & Frontend', icon: 'fab fa-react', tier: 'Working Knowledge', tools: ['Component State', 'Async APIs', 'Next.js'], filled: 3, total: 5 },
    ],
  },
]

/** Flattened skill list for backward compatibility */
export const skillRatings: SkillItem[] = skillCapabilities.flatMap((g) => g.skills)

/**
 * Each experience entry can optionally include a `projects` array —
 * client engagements delivered during that role. Render these nested
 * under the role (e.g. indented sub-cards) in the Experience section.
 *
 * NOTE: Client names and internal system codenames have been generalized
 * below to respect employer/client confidentiality (NDA) obligations.
 */
export const experience = [
  {
    role: 'Engineer',
    company: 'Virtusa',
    location: 'Pune, India',
    period: 'Jan 2026 – Present',
    bullets: [
      'Led root cause analysis and resolution of P1/P2 production incidents, restoring SLA compliance and improving MTTR.',
      'Implemented OAuth2 & JWT-based authentication within Spring Security to secure REST APIs across microservices boundaries.',
      'Integrated <span class="highlight">Apache Kafka</span> for async event-driven communication, improving system decoupling and throughput.',
      'Contributed to CI/CD pipeline maintenance via Jenkins and GitLab across QA, DevOps, and business stakeholders.',
    ],
    projects: [
      {
        client: 'Global Telecommunications Client',
        name: 'IT Governance Dashboard',
        desc: 'Core backend developer for an enterprise IT Governance Dashboard for a large telecommunications client — supporting visibility into compliance and operational risk across enterprise infrastructure.',
        tech: ['Java', 'Spring Boot', 'WebLogic', 'Oracle SQL', 'Hibernate/JPA'],
        metrics: [
          '⚡ ~35% improvement in data processing via Oracle SQL schema optimisation',
          '🚀 30% faster API response time through strategic indexing and targeted database tuning',
          '🔒 Contributed to a security risk analysis module supporting compliance reporting',
          '🌐 RESTful APIs consumed by front-end dashboards with consistent sub-second response times',
        ],
      },
    ],
  },
  {
    role: 'Associate Engineer',
    company: 'Virtusa',
    location: 'Pune, India',
    period: 'Jan 2024 – Dec 2025',
    bullets: [
      'Designed & maintained enterprise-grade Spring Boot microservices and REST APIs powering IT governance and discrepancy management platforms.',
      'Improved API response time by <span class="highlight">30%</span> via SQL query optimisation, strategic indexing, and targeted database tuning across Oracle & PostgreSQL.',
      'Reduced report generation time by <span class="highlight">40%</span> by rewriting complex queries, eliminating redundant joins and leveraging indexed views.',
    ],
    projects: [
      {
        client: 'Global Telecommunications Client',
        name: 'Network Discrepancy Detection Platform',
        desc: 'Backend microservices supporting automated discrepancy detection between network topology and inventory datasets for a large-scale enterprise environment.',
        tech: ['Spring Boot', 'PostgreSQL', 'Microservices', 'Kafka', 'Camunda BPM'],
        metrics: [
          '🤖 ~50% reduction in manual intervention via Camunda BPM workflow automation',
          '📉 40% faster report generation by rewriting complex PostgreSQL queries',
          '📡 Kafka for fault-tolerant high-throughput event streaming',
          '🗃️ Optimised PostgreSQL schema design for high-volume batch comparisons with minimal latency',
        ],
      },
    ],
  },
  {
    role: 'Java Full Stack Developer Intern',
    company: 'Virtusa',
    location: 'Chennai, India (Remote)',
    period: 'May 2023 – Aug 2023',
    bullets: [
      'Built a full-stack web application using Spring Boot (backend) and React (frontend), delivering REST APIs for auth, content management, and social features.',
      'Implemented backend services with Java, Spring Boot, Hibernate/JPA, and SQL; wrote JUnit tests to ensure service reliability.',
      'Optimised React components and async API calls, measurably improving client-side responsiveness and reducing unnecessary re-renders.',
    ],
  },
]

/** Personal projects only — client work now lives under `experience[].projects` */
export const projects = [
  {
    num: '01',
    client: 'PERSONAL PROJECT',
    iconClass: 'fas fa-network-wired',
    diagramType: 'taskflow-arch' as const,
    name: 'TaskFlow — Team Task-Board Platform',
    desc: 'Dockerized team task-board platform with a React frontend, two independent Spring Boot microservices, an Nginx API gateway, and per-service PostgreSQL databases.',
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'Nginx'],
    metrics: [
      '🧩 Service-owned databases & API gateway enforcing clear microservice boundaries',
      '🔐 JWT-based authentication and REST APIs for account, project, and task management',
      '🚀 Dockerized across local, free-tier, and production environments with automatic HTTPS via Caddy',
      '🔁 CI/CD-ready workflow with independent service builds and tagged container image deploys',
    ],
    links: {
      github: 'https://github.com/aysoni',
      live: '#projects',
      caseStudy: '#projects',
    },
  },
  {
    num: '02',
    client: 'PERSONAL PROJECT',
    iconClass: 'fas fa-server',
    diagramType: 'social-arch' as const,
    name: 'Social Media Backend Platform',
    desc: 'RESTful backend microservices for user management, posts, likes, and comments — designed for horizontal scalability and long-term maintainability.',
    tech: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'JUnit'],
    metrics: [
      '📊 25% improvement in DB query performance via strategic indexing',
      '🧱 RESTful microservices for user management, posts, likes, and comments',
      '♾️ Stateless REST APIs improving horizontal scalability and long-term maintainability',
      '📄 Server-side pagination & sorting to reduce payload size under load',
    ],
    links: {
      github: 'https://github.com/aysoni',
      live: '#projects',
      caseStudy: '#projects',
    },
  },
]

export const certifications = [
  { iconClass: 'fab fa-java', name: 'Oracle Certified Professional: Java SE 11 Developer', issuer: 'Oracle · Jan 2025' },
  { iconClass: 'fas fa-robot', name: 'Gen AI Assisted Engineer', issuer: 'Virtusa · Dec 2024' },
  { iconClass: 'fas fa-sync-alt', name: 'Agile Methodology', issuer: 'Cognizant · Mar 2023' },
]

export const education = {
  degree: 'B.Tech — CSE (AI & Data Science)',
  university: 'DIT University, Dehradun',
  period: 'Jul 2019 – Dec 2023',
  cgpa: '8.30 / 10.0',
}

export const blogPosts = [
  {
    slug: 'optimising-spring-boot-apis',
    title: 'How I improved API response times by 30% in Spring Boot',
    date: 'March 10, 2026',
    readTime: '5 min read',
    excerpt: 'A deep-dive into SQL indexing strategies, HikariCP tuning, and N+1 query elimination that helped us hit sub-200ms p95 latency on a high-traffic enterprise platform.',
    tags: ['Spring Boot', 'Performance', 'SQL'],
  },
  {
    slug: 'kafka-vs-rabbitmq-microservices',
    title: 'Kafka vs RabbitMQ: Lessons from a real microservices migration',
    date: 'February 20, 2026',
    readTime: '7 min read',
    excerpt: 'After migrating a discrepancy detection platform from synchronous REST calls to Kafka event streams, here\'s what I wish I had known before we started.',
    tags: ['Kafka', 'Microservices', 'Architecture'],
  },
  {
    slug: 'camunda-bpm-workflow-automation',
    title: 'Automating approval pipelines with Camunda BPM',
    date: 'January 15, 2026',
    readTime: '6 min read',
    excerpt: 'How we used Camunda BPM to replace a fragile, manual multi-step remediation process — cutting human intervention by 50% and making workflows auditable.',
    tags: ['Camunda', 'BPM', 'Automation'],
  },
]