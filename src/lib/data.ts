export const personal = {
  name: 'Ayush Soni',
  role: 'Backend Software Engineer',
  tagline: 'I build scalable microservices and enterprise-grade APIs that power mission-critical platforms.',
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
  'Systems Builder',
]

export const heroStats = [
  { value: '2.4+', label: 'Years Exp.' },
  { value: '30%', label: 'API Latency ↓' },
  { value: '40%', label: 'Report Time ↓' },
  { value: '50%', label: 'Manual Steps ↓' },
]

export const stats = [
  { label: 'Experience', value: '2.4+', description: 'Years in production systems' },
  { label: 'Projects', value: '10+', description: 'Live enterprise applications' },
  { label: 'Skills', value: '15+', description: 'Production technologies' },
  { label: 'Commits', value: '5K+', description: 'Active development' },
]

export const aboutParagraphs = [
  `I'm a <strong>Backend Software Engineer</strong> at Virtusa, Pune, focused on enterprise Spring Boot microservices, Kafka-driven workflows, and secure REST APIs for IT governance and discrepancy platforms.`,
  `I care about <strong>performance and reliability</strong> — from SQL tuning and indexing to OAuth2/JWT and production incident response.`,
  `Recent impact: <strong>~30% faster APIs</strong>, <strong>~40% quicker reports</strong>, and significant reduction in manual steps via Camunda BPM automation.`,
]

export const aboutTags = [
  'Java 11', 'Spring Boot', 'Microservices', 'Kafka', 'PostgreSQL', 'Oracle SQL',
  'Camunda BPM', 'Docker', 'Jenkins', 'CI/CD', 'JUnit', 'OAuth2',
]

export const skillGroups = [
  { title: 'Languages', tags: ['Java SE 11', 'SQL', 'JavaScript'] },
  { title: 'Frameworks & Libraries', tags: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Hibernate / JPA', 'React'] },
  { title: 'Databases', tags: ['Oracle SQL', 'PostgreSQL'] },
  { title: 'Messaging & Workflow', tags: ['Apache Kafka', 'Camunda BPM'] },
  { title: 'DevOps & Cloud', tags: ['Jenkins', 'CI/CD Pipelines', 'GitLab', 'Docker', 'Linux'] },
  { title: 'Security & Testing', tags: ['OAuth2', 'JWT', 'RBAC', 'JUnit', 'Redis', 'Postman'] },
]

/** 0–10 scale for animated skill bars */
export const skillRatings = [
  { name: 'Java 11', icon: 'fab fa-java', filled: 8, total: 10 },
  { name: 'Spring Boot', icon: 'fas fa-leaf', filled: 9, total: 10 },
  { name: 'Microservices', icon: 'fas fa-shield-alt', filled: 8, total: 10 },
  { name: 'Oracle / PostgreSQL', icon: 'fas fa-database', filled: 8, total: 10 },
  { name: 'Apache Kafka', icon: 'fas fa-stream', filled: 8, total: 10 },
  { name: 'Camunda BPM', icon: 'fas fa-project-diagram', filled: 7, total: 10 },
  { name: 'Docker', icon: 'fab fa-docker', filled: 7, total: 10 },
  { name: 'Spring Security / JWT', icon: 'fas fa-lock', filled: 8, total: 10 },
  { name: 'React', icon: 'fab fa-react', filled: 6, total: 10 },
  { name: 'JUnit / Testing', icon: 'fas fa-vials', filled: 8, total: 10 },
  { name: 'CI/CD (Jenkins)', icon: 'fas fa-code-branch', filled: 7, total: 10 },
  { name: 'Redis', icon: 'fas fa-bolt', filled: 6, total: 10 },
]

export const experience = [
  {
    role: 'Associate Engineer',
    company: 'Virtusa',
    location: 'Pune, India',
    period: 'Jan 2024 – Present',
    bullets: [
      'Designed & maintained enterprise-grade Spring Boot microservices and REST APIs powering IT governance and discrepancy management platforms.',
      'Improved API response time by <span class="highlight">30%</span> via SQL query optimisation, strategic indexing, and targeted database tuning across Oracle & PostgreSQL.',
      'Reduced report generation time by <span class="highlight">40%</span> by rewriting complex queries, eliminating redundant joins and leveraging indexed views.',
      'Led root cause analysis and resolution of P1/P2 production incidents, restoring SLA compliance and improving MTTR.',
      'Implemented OAuth2 & JWT-based authentication within Spring Security to secure REST APIs across microservices boundaries.',
      'Integrated <span class="highlight">Apache Kafka</span> for async event-driven communication, improving system decoupling and throughput.',
      'Contributed to CI/CD pipeline maintenance via Jenkins and GitLab across QA, DevOps, and business stakeholders.',
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

export const projects = [
  {
    num: '01',
    client: 'BT GROUP',
    name: 'OR IT Governance Dashboard',
    desc: 'Core backend developer for BT Group\'s enterprise IT Governance Dashboard — monitoring compliance and operational risk across large-scale infrastructure.',
    tech: ['Java', 'Spring Boot', 'WebLogic', 'Oracle SQL', 'Hibernate/JPA'],
    metrics: [
      '⚡ ~35% improvement in data processing via Oracle SQL schema optimisation',
      '🔒 Led Vulnerability Management module for automated security risk analysis',
    ],
  },
  {
    num: '02',
    client: 'DISCREPANCY DETECTION',
    name: 'OR Imperium Platform',
    desc: 'Backend microservices for automated discrepancy detection between network topology and inventory datasets, processing millions of records per run.',
    tech: ['Spring Boot', 'PostgreSQL', 'Microservices', 'Kafka', 'Camunda BPM'],
    metrics: [
      '🤖 ~50% reduction in manual intervention via Camunda BPM workflow automation',
      '📡 Kafka for fault-tolerant high-throughput event streaming',
    ],
  },
  {
    num: '03',
    client: 'PERSONAL PROJECT',
    name: 'Social Media Backend Platform',
    desc: 'RESTful backend microservices for user management, posts, likes, and comments — designed for horizontal scalability and long-term maintainability.',
    tech: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'JUnit'],
    metrics: [
      '📊 25% improvement in DB query performance via strategic indexing',
      '📄 Server-side pagination & sorting to reduce payload size under load',
    ],
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

