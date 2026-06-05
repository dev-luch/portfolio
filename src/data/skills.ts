import { Lang } from "@utils/langUtils";
import { getSkillDuration } from "@utils/dynamicDuration";

export interface Skill {
  id: string;
  name: string;
  categories: string[];
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS' | 'EX';
  percentage: number;
  descriptionKey: string;
  startDate: string;
  endDate?: string;
  projects: string[];
  certifications?: string[];
  relatedSkills: string[];
  icon?: string;
  color: string;
  glowColor: string;
}

export const getSkillTranslation = (skill: Skill, t: (key: string) => string, lang: Lang = "en-US") => ({
  ...skill,
  description: t(skill.descriptionKey),
  experience: getSkillDuration(skill.startDate, lang, skill.endDate),
  projects: skill.projects.map(project =>
    project.startsWith('skills.') ? t(project) : project
  )
});

export const skillsData: Skill[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    categories: ['core', 'frontend', 'backend'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.typescript',
    startDate: '2022-09-01',
    projects: ['Portfolio', 'G4Mix', 'Ofertas Dev Luch'],
    relatedSkills: ['JavaScript', 'React', 'NestJS'],
    icon: '/developer-icons/typescript.svg',
    color: '#3178C6',
    glowColor: '#3178C6'
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    categories: ['core', 'backend'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.nestjs',
    startDate: '2024-09-01',
    projects: ['G4Mix Backend', 'Ofertas Dev Luch'],
    relatedSkills: ['Node.js', 'TypeScript', 'PostgreSQL'],
    icon: '/developer-icons/nestjs.svg',
    color: '#E0234E',
    glowColor: '#E0234E'
  },
  {
    id: 'git',
    name: 'Git',
    categories: ['core', 'tools'],
    rank: 'S',
    percentage: 100,
    descriptionKey: 'skills.descriptions.git',
    startDate: '2021-09-01',
    projects: ['Todos os projetos'],
    relatedSkills: ['GitHub', 'VS Code', 'Docker'],
    icon: '/developer-icons/git.svg',
    color: '#F05032',
    glowColor: '#F05032'
  },
  {
    id: 'github',
    name: 'GitHub',
    categories: ['core', 'tools', 'cloud'],
    rank: 'SS',
    percentage: 150,
    descriptionKey: 'skills.descriptions.github',
    startDate: '2021-09-01',
    projects: ['skills.projects.all-projects'],
    relatedSkills: ['Git', 'VS Code', 'CI/CD'],
    icon: '/developer-icons/social-icons/github.svg',
    color: '#181717',
    glowColor: '#181717'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    categories: ['core', 'frontend', 'backend'],
    rank: 'S',
    percentage: 100,
    descriptionKey: 'skills.descriptions.javascript',
    startDate: '2021-09-01',
    projects: ['Portfolio', 'G4Mix', 'Ofertas Dev Luch'],
    relatedSkills: ['TypeScript', 'React', 'Node.js'],
    icon: '/developer-icons/javascript.svg',
    color: '#F7DF1E',
    glowColor: '#F7DF1E'
  },
  {
    id: 'react',
    name: 'React',
    categories: ['core', 'frontend'],
    rank: 'S',
    percentage: 100,
    descriptionKey: 'skills.descriptions.react',
    startDate: '2022-09-01',
    projects: ['Portfolio', 'G4Mix', 'Ofertas Dev Luch'],
    relatedSkills: ['JavaScript', 'Next.js', 'Tailwind CSS'],
    icon: '/developer-icons/react.svg',
    color: '#61DAFB',
    glowColor: '#61DAFB'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    categories: ['core', 'frontend'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.nextjs',
    startDate: '2022-09-01',
    projects: ['Portfolio', 'G4Mix'],
    relatedSkills: ['React', 'TypeScript', 'Vercel'],
    icon: '/developer-icons/nextjs.svg',
    color: '#000000',
    glowColor: '#000000'
  },
  {
    id: 'html5',
    name: 'HTML5',
    categories: ['frontend'],
    rank: 'S',
    percentage: 100,
    descriptionKey: 'skills.descriptions.html5',
    startDate: '2021-09-01',
    projects: ['skills.projects.almost-all-projects'],
    relatedSkills: ['CSS', 'JavaScript', 'React'],
    icon: '/developer-icons/html5.svg',
    color: '#E34F26',
    glowColor: '#E34F26'
  },
  {
    id: 'css3',
    name: 'CSS3',
    categories: ['frontend'],
    rank: 'S',
    percentage: 100,
    descriptionKey: 'skills.descriptions.css3',
    startDate: '2021-09-01',
    projects: ['skills.projects.almost-all-projects'],
    relatedSkills: ['HTML', 'JavaScript', 'Tailwind CSS'],
    icon: '/developer-icons/css3.svg',
    color: '#1572B6',
    glowColor: '#1572B6'
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    categories: ['frontend'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.tailwindcss',
    startDate: '2023-09-01',
    projects: ['Ofertas Dev Luch'],
    relatedSkills: ['CSS', 'React', 'Next.js'],
    icon: '/developer-icons/tailwindcss.svg',
    color: '#06B6D4',
    glowColor: '#06B6D4'
  },
  {
    id: 'sass',
    name: 'Sass',
    categories: ['frontend'],
    rank: 'D',
    percentage: 60,
    descriptionKey: 'skills.descriptions.sass',
    startDate: '2025-03-01',
    projects: ['skills.projects.learning-projects'],
    relatedSkills: ['CSS', 'SCSS', 'Frontend'],
    icon: '/developer-icons/sass.svg',
    color: '#CC6699',
    glowColor: '#CC6699'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    categories: ['backend', 'core'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.nodejs',
    startDate: '2021-09-01',
    projects: ['G4Mix Backend', 'Ofertas Dev Luch'],
    relatedSkills: ['JavaScript', 'NestJS', 'Express'],
    icon: '/developer-icons/nodejs.svg',
    color: '#339933',
    glowColor: '#339933'
  },
  {
    id: 'express',
    name: 'Express',
    categories: ['backend'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.express',
    startDate: '2021-09-01',
    projects: ['APIs REST'],
    relatedSkills: ['Node.js', 'JavaScript', 'APIs REST'],
    icon: '/developer-icons/expressjs-light.svg',
    color: '#000000',
    glowColor: '#000000'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    categories: ['backend'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.postgresql',
    startDate: '2021-09-01',
    projects: ['G4Mix Database', 'Ofertas Dev Luch'],
    relatedSkills: ['NestJS', 'APIs REST', 'Node.js'],
    icon: '/developer-icons/postgresql.svg',
    color: '#336791',
    glowColor: '#336791'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    categories: ['backend'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.mongodb',
    startDate: '2022-09-01',
    projects: ['Projetos pessoais'],
    relatedSkills: ['Node.js', 'JavaScript', 'APIs REST'],
    icon: '/developer-icons/mongodb.svg',
    color: '#47A248',
    glowColor: '#47A248'
  },
  {
    id: 'redis',
    name: 'Redis',
    categories: ['backend'],
    rank: 'C',
    percentage: 70,
    descriptionKey: 'skills.descriptions.redis',
    startDate: '2025-06-01',
    projects: ['Ofertas Dev Luch'],
    relatedSkills: ['Node.js', 'Cache', 'Performance'],
    icon: '/developer-icons/redis.svg',
    color: '#DC382D',
    glowColor: '#DC382D'
  },
  {
    id: 'aws',
    name: 'AWS',
    categories: ['cloud'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.aws',
    startDate: '2024-09-01',
    projects: ['Ofertas Dev Luch', 'G4Mix'],
    relatedSkills: ['Docker', 'Vercel', 'APIs REST'],
    icon: '/developer-icons/aws.svg',
    color: '#FF9900',
    glowColor: '#FF9900'
  },
  {
    id: 'docker',
    name: 'Docker',
    categories: ['cloud'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.docker',
    startDate: '2022-09-01',
    projects: ['Ofertas Dev Luch', 'G4Mix'],
    relatedSkills: ['AWS', 'Node.js', 'NestJS'],
    icon: '/developer-icons/docker.svg',
    color: '#2496ED',
    glowColor: '#2496ED'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    categories: ['cloud', 'frontend'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.vercel',
    startDate: '2023-09-01',
    projects: ['Portfolio', 'G4Mix', 'Ofertas Dev Luch'],
    relatedSkills: ['Next.js', 'React', 'Git'],
    icon: '/developer-icons/vercel-light.svg',
    color: '#000000',
    glowColor: '#000000'
  },
  {
    id: 'react-native',
    name: 'React Native',
    categories: ['mobile', 'frontend'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.react-native',
    startDate: '2025-03-01',
    endDate: '2026-03-01',
    projects: ['G4mix'],
    relatedSkills: ['React', 'JavaScript', 'Mobile'],
    icon: '/developer-icons/react.svg',
    color: '#61DAFB',
    glowColor: '#61DAFB'
  },
  {
    id: 'expo',
    name: 'Expo',
    categories: ['mobile', 'frontend'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.expo',
    startDate: '2025-03-01',
    endDate: '2026-03-01',
    projects: ['G4mix'],
    relatedSkills: ['React', 'JavaScript', 'Mobile'],
    icon: '/developer-icons/react.svg',
    color: '#61DAFB',
    glowColor: '#61DAFB'
  },
  {
    id: 'flutter',
    name: 'Flutter',
    categories: ['mobile'],
    rank: 'E',
    percentage: 50,
    descriptionKey: 'skills.descriptions.flutter',
    startDate: '2025-06-01',
    endDate: '2026-06-01',
    projects: ['skills.projects.learning-projects'],
    relatedSkills: ['Dart', 'Mobile', 'UI/UX'],
    icon: '/developer-icons/flutter.svg',
    color: '#02569B',
    glowColor: '#02569B'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    categories: ['tools'],
    rank: 'S',
    percentage: 100,
    descriptionKey: 'skills.descriptions.vscode',
    startDate: '2021-09-01',
    projects: ['skills.projects.all-projects'],
    relatedSkills: ['Git', 'JavaScript', 'TypeScript'],
    icon: '/developer-icons/vscode.svg',
    color: '#007ACC',
    glowColor: '#007ACC'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    categories: ['tools', 'core'],
    rank: 'S',
    percentage: 100,
    descriptionKey: 'skills.descriptions.cursor',
    startDate: '2025-06-01',
    projects: ['skills.projects.all-projects'],
    relatedSkills: ['Git', 'JavaScript', 'TypeScript'],
    icon: '/developer-icons/vscode.svg',
    color: '#007ACC',
    glowColor: '#007ACC'
  },
  {
    id: 'figma',
    name: 'Figma',
    categories: ['tools'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.figma',
    startDate: '2022-09-01',
    projects: ['Prototipação de projetos', 'Portfolio', 'G4Mix'],
    relatedSkills: ['UI/UX', 'Design', 'Frontend'],
    icon: '/developer-icons/figma.svg',
    color: '#F24E1E',
    glowColor: '#F24E1E'
  },
  {
    id: 'postman',
    name: 'Postman',
    categories: ['tools', 'backend'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.postman',
    startDate: '2024-09-01',
    projects: ['Testes de API', 'Ofertas Dev Luch', 'G4Mix'],
    relatedSkills: ['APIs REST', 'Backend', 'Testing'],
    icon: '/developer-icons/postman.svg',
    color: '#FF6C37',
    glowColor: '#FF6C37'
  },
  {
    id: 'jest',
    name: 'Jest',
    categories: ['tools', 'frontend'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.jest',
    startDate: '2022-09-01',
    projects: ['Testes unitários', 'Ofertas Dev Luch', 'G4Mix'],
    relatedSkills: ['JavaScript', 'Testing', 'React'],
    icon: '/developer-icons/jest.svg',
    color: '#C21325',
    glowColor: '#C21325'
  },
  {
    id: 'cypress',
    name: 'Cypress',
    categories: ['tools', 'frontend'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.cypress',
    startDate: '2023-09-01',
    projects: ['Testes E2E', 'G4Mix'],
    relatedSkills: ['Testing', 'Frontend', 'JavaScript'],
    icon: '/developer-icons/cypress.svg',
    color: '#17202C',
    glowColor: '#17202C'
  },
  {
    id: 'eslint',
    name: 'ESLint',
    categories: ['tools', 'core'],
    rank: 'A',
    percentage: 90,
    descriptionKey: 'skills.descriptions.eslint',
    startDate: '2022-09-01',
    projects: ['skills.projects.all-projects'],
    relatedSkills: ['JavaScript', 'TypeScript', 'Code Quality'],
    icon: '/developer-icons/eslint.svg',
    color: '#4B32C3',
    glowColor: '#4B32C3'
  },
  {
    id: 'prettier',
    name: 'Prettier',
    categories: ['tools'],
    rank: 'B',
    percentage: 80,
    descriptionKey: 'skills.descriptions.prettier',
    startDate: '2022-09-01',
    projects: ['skills.projects.all-projects'],
    relatedSkills: ['JavaScript', 'TypeScript', 'Code Quality'],
    icon: '/developer-icons/prettier.svg',
    color: '#F7B93E',
    glowColor: '#F7B93E'
  }
];

export const skillCategories = [
  { id: 'core', name: 'Stack Principal', color: '#00F0FF' },
  { id: 'frontend', name: 'Frontend', color: '#8B5CF6' },
  { id: 'backend', name: 'Backend', color: '#F59E0B' },
  { id: 'cloud', name: 'Cloud & DevOps', color: '#10B981' },
  { id: 'mobile', name: 'Mobile', color: '#EF4444' },
  { id: 'tools', name: 'Ferramentas', color: '#6B7280' }
];

export const rankConfig = {
  E: { color: '#EF4444', glow: '#EF4444', label: 'Iniciante', percentage: 50 },
  D: { color: '#F97316', glow: '#F97316', label: 'Básico', percentage: 60 },
  C: { color: '#EAB308', glow: '#EAB308', label: 'Intermediário', percentage: 70 },
  B: { color: '#22C55E', glow: '#22C55E', label: 'Bom', percentage: 80 },
  A: { color: '#3B82F6', glow: '#3B82F6', label: 'Avançado', percentage: 90 },
  S: { color: '#8B5CF6', glow: '#8B5CF6', label: 'Expert', percentage: 100 },
  SS: { color: '#FFD700', glow: '#FFD700', label: 'Master', percentage: 150 },
  SSS: { color: '#FF6B35', glow: '#FF6B35', label: 'Legend', percentage: 200 },
  EX: { color: '#FF00FF', glow: '#FF00FF', label: 'Godlike', percentage: 250 }
};