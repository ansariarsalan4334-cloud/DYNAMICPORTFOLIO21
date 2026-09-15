// ============================================================================
// ARSTECH — CENTRAL CONFIG FILE
// Edit everything about the portfolio's content here. Nothing content-related
// should need to be changed inside component files — only here.
// ============================================================================

export const personal = {
  name: 'ANSARI ARSALAN SULTAN AHMED',
  brand: 'ARSTECH',
  roles: ['AI/ML Student & Developer', 'Full-Stack Web Developer', 'AI/ML Enthusiast'],
  tagline: 'Building intelligent ideas into digital experiences.',
  heroGreeting: "Hi, I'm Arsalan.",
  heroRole: 'AI/ML Developer & Web Developer',
  heroDescription:
    'I build intelligent applications, modern websites and digital experiences that combine technology, creativity and practical problem solving.',
  availableForProjects: true,
  email: 'ansariarsalan4334@gmail.com', // TODO: replace with your real email
};

export const aboutText = {
  title: 'About Me',
  paragraphs: [
    "I'm an AI/ML student and developer who enjoys turning ideas into working software — from interactive web interfaces to machine learning experiments.",
    'My focus is on writing clean, practical code and understanding how things work under the hood, whether that means training a model or building a full-stack application from scratch.',
    "I'm still early in my journey, and I treat every project as a chance to learn something new and get closer to production-quality engineering.",
  ],
  pillars: [
    {
      id: 'developer',
      title: 'Developer',
      description: 'Building full-stack web applications with modern tools and clean architecture.',
    },
    {
      id: 'aiml',
      title: 'AI / ML',
      description: 'Exploring machine learning and artificial intelligence through hands-on projects.',
    },
    {
      id: 'problem-solver',
      title: 'Problem Solver',
      description: 'Breaking down complex requirements into working, practical solutions.',
    },
    {
      id: 'learner',
      title: 'Continuous Learner',
      description: 'Constantly picking up new tools, languages and techniques as I build.',
    },
  ],
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  { id: 'programming', title: 'Programming', skills: ['Python', 'C', 'Java', 'JavaScript'] },
  { id: 'web', title: 'Web Development', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { id: 'aiml', title: 'AI / ML', skills: ['Machine Learning', 'Artificial Intelligence', 'Python for AI/ML'] },
  { id: 'database', title: 'Database', skills: ['SQL', 'MySQL', 'DBMS'] },
  { id: 'tools', title: 'Tools', skills: ['Git', 'GitHub', 'VS Code'] },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string; // leave undefined until you have a real link
  liveUrl?: string; // leave undefined until you have a real link
  status?: 'in-progress' | 'complete' | 'planned';
};

export const projects: Project[] = [
  {
    id: 'arstech-portfolio',
    title: 'ARSTECH Portfolio',
    description: 'Premium 3D personal portfolio website — the site you are viewing right now.',
    technologies: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    githubUrl: undefined, // TODO: add your repo link
    liveUrl: undefined, // TODO: add your live deployment link
    status: 'in-progress',
  },
  {
    id: 'bds-collection',
    title: 'BDS COLLECTION',
    description: 'Premium fashion e-commerce website concept and build.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    githubUrl: undefined,
    liveUrl: undefined,
    status: 'in-progress',
  },
  {
    id: 'shopping-management-system',
    title: 'Online Shopping Management System',
    description: 'Database management project modelling products, orders and customers.',
    technologies: ['SQL', 'MySQL', 'DBMS'],
    githubUrl: undefined,
    liveUrl: undefined,
    status: 'complete',
  },
  {
    id: 'aiml-project',
    title: 'AI / ML Project',
    description: 'Placeholder for an upcoming AI/ML project — details to be added.',
    technologies: ['Python'],
    githubUrl: undefined,
    liveUrl: undefined,
    status: 'planned',
  },
];

export type TimelineEntry = {
  id: string;
  type: 'education' | 'internship' | 'certification' | 'achievement' | 'hackathon';
  title: string;
  organization: string;
  period: string;
  description?: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: 'engineering-aiml',
    type: 'education',
    title: 'Bachelor of Engineering - Artificial Intelligence and Machine Learning',
    organization: 'ANJUMAN ISLAM KALSEKAR TECHNICAL CAMPUS',
    period: '2025-2028',
    description: 'Currently pursuing a degree focused on artificial intelligence and machine learning .',
  },
  // Add more entries here: internships, certifications, hackathons, achievements.
  // Example shape:
  // {
  //   id: 'unique-id',
  //   type: 'internship',
  //   title: 'Role title',
  //   organization: 'Company name',
  //   period: 'Jun 2026 – Aug 2026',
  //   description: 'One or two lines about the role.',
  // },
];

export type Certification = {
  id: string;
  title: string;
  organization: string;
  date: string;
  category?: 'ai-ml' | 'web' | 'database' | 'programming' | string;
  description?: string;
  skills?: string[];
  credentialId?: string;
  certificateUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: 'deeplearning-supervised-ml',
    title: 'Supervised Machine Learning: Regression and Classification',
    organization: 'DeepLearning.AI & Stanford University',
    date: '2026',
    category: 'ai-ml',
    description:
      'Mastered foundational machine learning algorithms, gradient descent optimization, cost functions, regularization, and practical predictive modeling with Scikit-Learn.',
    skills: ['Supervised Learning', 'Linear Regression', 'Logistic Regression', 'Python', 'NumPy', 'Scikit-Learn'],
    credentialId: 'STN-ML-2024-8841',
    certificateUrl: 'https://coursera.org/verify',
  },
  {
    id: 'deeplearning-neural-networks',
    title: 'Neural Networks and Deep Learning',
    organization: 'DeepLearning.AI',
    date: '2026',
    category: 'ai-ml',
    description:
      'Built and trained multi-layer deep neural networks and backpropagation from scratch in Python, implementing vectorized matrix operations and hyperparameter tuning.',
    skills: ['Deep Learning', 'Neural Networks', 'Backpropagation', 'Vectorization', 'Hyperparameter Tuning'],
    credentialId: 'DL-NN-2026-3910',
    certificateUrl: 'https://coursera.org/verify',
  },
  {
    id: 'meta-frontend-developer',
    title: 'Meta Front-End Developer Specialization',
    organization: 'Meta',
    date: '2026',
    category: 'web',
    description:
      'Developed responsive single-page web applications with React, modern state management, component architecture, Tailwind CSS, and UX best practices.',
    skills: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'UI/UX Design', 'Web Performance'],
    credentialId: 'META-FED-2026-7729',
    certificateUrl: 'https://coursera.org/verify',
  },
  {
    id: 'oracle-database-sql',
    title: 'Relational Database Design & SQL Fundamentals',
    organization: 'Oracle Academy',
    date: '2026',
    category: 'database',
    description:
      'Engineered normalized relational schemas, multi-table JOINs, subqueries, view definitions, and indexing strategies for high-performance query execution.',
    skills: ['SQL', 'MySQL', 'DBMS', 'Relational Schemas', 'Query Optimization'],
    credentialId: 'ORA-SQL-2026-5514',
    certificateUrl: 'https://coursera.org/verify',
  },
  {
    id: 'umich-python-data-structures',
    title: 'Python for Data Structures & Algorithms',
    organization: 'University of Michigan',
    date: '2026',
    category: 'programming',
    description:
      'Advanced OOP programming in Python, algorithmic complexity analysis (Big-O), abstract data types, recursive procedures, and data sorting algorithms.',
    skills: ['Python', 'Data Structures', 'Algorithms', 'OOP', 'Problem Solving'],
    credentialId: 'UMICH-PY-2026-1182',
    certificateUrl: 'https://coursera.org/verify',
  },
  {
    id: 'freecodecamp-fullstack',
    title: 'Full Stack Web Development Certification',
    organization: 'freeCodeCamp',
    date: '2026',
    category: 'web',
    description:
      'Engineered full-stack applications with asynchronous JavaScript, RESTful APIs, Node.js, and client-server communication with clean code architecture.',
    skills: ['Full-Stack', 'Node.js', 'REST APIs', 'Express', 'Frontend Architecture'],
    credentialId: 'FCC-FS-2026-9943',
    certificateUrl: 'https://freecodecamp.org/certification',
  },
];

export type SocialLink = {
  id: string;
  label: string;
  url?: string; // leave undefined until you provide the real URL
};

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: "https://github.com/ansariarsalan4334-cloud" },
  { id: 'linkedin', label: 'LinkedIn', url: "https://www.linkedin.com/in/arsalan-ansari-a4293a349/" },
  { id: 'email', label: 'Email', url: 'mailto:ansariarsalan4334@gmail.com' },
  { id: 'instagram', label: 'Instagram', url: "https://www.instagram.com/_imarsalan_4?stkn=MTZvNjN3dWRyZ29xcw==" },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

// Central theme knobs referenced by the 3D scene and CSS accents.
export const theme = {
  colors: {
    background: '#050507',
    violet: '#7c6cff',
    cyan: '#4cd9d0',
    amber: '#ffb454',
  },
  three: {
    particleCount: { desktop: 900, mobile: 220 },
    coreRotationSpeed: 0.06,
    enablePostProcessing: true, // automatically disabled on low-power/mobile devices
  },
};
