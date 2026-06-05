export interface Project {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  technologies: string[];
  responsibilities: string;
  githubUrl?: string;
  websiteUrl?: string;
  projectType: "open-source" | "personal";
  role: string;
  desktopImage: string;
  desktopImageAlt: string;
  mobileImage: string;
  mobileImageAlt: string;
}

export const projects: Project[] = [
  {
    id: "g4mix",
    title: "G4mix",
    description: "projects.g4mix.description",
    imageAlt: "Logo G4mix",
    technologies: ["Node.js", "TypeScript", "React Native", "PostgreSQL", "Docker", "AWS"],
    responsibilities: "projects.g4mix.responsibilities",
    githubUrl: "https://github.com/G4mix",
    projectType: "open-source",
    role: "projects.g4mix.role",
    desktopImage: "/g4mix-desktop-demo.png",
    desktopImageAlt: "Desktop G4mix",
    mobileImage: "/g4mix-mobile-demo.png",
    mobileImageAlt: "Mobile G4mix"
  },
  {
    id: "ofertas-dev-luch",
    title: "Ofertas Dev Luch",
    description: "projects.ofertas-dev-luch.description",
    imageAlt: "Logo Ofertas Dev Luch",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Web Scraping", "API Integration"],
    responsibilities: "projects.ofertas-dev-luch.responsibilities",
    websiteUrl: "https://ofertas.dev-luch.com",
    projectType: "personal",
    role: "projects.ofertas-dev-luch.role",
    desktopImage: "/ofertas-dev-luch-desktop-demo.png",
    desktopImageAlt: "Desktop Ofertas Dev Luch",
    mobileImage: "/ofertas-dev-luch-mobile-demo.png",
    mobileImageAlt: "Mobile Ofertas Dev Luch"
  }
];
