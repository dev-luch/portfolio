import { Briefcase, Clock, GraduationCap, LucideIcon } from "lucide-react";

export interface Experience {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  status: "completed" | "current" | "future";
  image: string;
  imageAlt: string;
  technologies: string[];
  responsibilities: string;
  githubUrl?: string;
  websiteUrl?: string;
  date?: string;
}

export const experiences: Experience[] = [
  {
    id: 0,
    title: "Estágio",
    icon: GraduationCap,
    description: "experience.mstore-digital.description",
    image: "/mstore-logo.svg",
    imageAlt: "Logo da MStore Digital",
    technologies: ["React", "Node.js", "TypeScript", "JavaScript", "CSS"],
    responsibilities: "experience.mstore-digital.responsibilities",
    status: "completed",
    date: "experience.mstore-digital.date"
  },
  {
    id: 1,
    title: "Dev Júnior",
    icon: Briefcase,
    description: "experience.soublox.description",
    image: "/soublox-logo.png",
    imageAlt: "Logo da Soublox",
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL"],
    responsibilities: "experience.soublox.responsibilities",
    status: "current",
    date: "experience.soublox.date"
  },
  {
    id: 2,
    title: "??????",
    icon: Clock,
    description: "experience.future.description",
    image: "/soublox-logo.png",
    imageAlt: "Próximos desafios",
    technologies: ["?", "?", "?", "?", "?"],
    responsibilities: "experience.future.responsibilities",
    date: "experience.future.date",
    status: "future"
  }
];
