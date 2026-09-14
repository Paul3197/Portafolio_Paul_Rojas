export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Principles", href: "#principles" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  // Where to drop the real screenshot later.
  imagePath: string;
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "proyecto-1",
    index: "01",
    title: "Enterprise Resource Planning",
    category: "ERP · Electronic Invoicing · Business Processes",
    description:
      "Contributed to an ERP system, developing a software module and its electronic invoicing workflows tied to SUNAT business processes — with a focus on backend services, integrations, and maintainable application logic.",
    highlights: [
      "Business process modeling",
      "Electronic invoicing workflows",
      "API and backend development",
      "Enterprise application logic",
    ],
    tags: [".NET", "C#", "REST APIs", "SQL", "SUNAT"],
    imagePath: "/images/projects/proyecto-1.jpg",
  },
  {
    id: "proyecto-2",
    index: "02",
    title: "Financial Information Platform",
    category: "Financial Software · Data Centralization",
    description:
      "Designed and built financial software of my own, created to centralize financial information for companies — supporting a more structured approach to accessing and managing business data.",
    highlights: [
      "Financial information workflows",
      "Data centralization",
      "Full-stack backend and frontend integration",
      "Business-oriented software design",
    ],
    tags: ["React", "TypeScript", ".NET", "PostgreSQL"],
    imagePath: "/images/projects/proyecto-2.jpg",
  },
];

export type Capability = {
  title: string;
  description: string;
  icon: "erp" | "financial" | "fullstack" | "backend" | "database" | "improvements";
};

export const CAPABILITIES: Capability[] = [
  {
    title: "ERP & Business Management Systems",
    description:
      "Business workflows, operational modules, process automation, and enterprise application development.",
    icon: "erp",
  },
  {
    title: "Financial Software",
    description:
      "Platforms that centralize financial information and support structured business operations.",
    icon: "financial",
  },
  {
    title: "Full-Stack Web Applications",
    description:
      "Modern React and Angular frontends connected to robust backend services.",
    icon: "fullstack",
  },
  {
    title: "Backend & API Engineering",
    description:
      ".NET, C#, REST APIs, business logic, integrations, and maintainable service design.",
    icon: "backend",
  },
  {
    title: "Database & Data Modeling",
    description:
      "PostgreSQL, SQL, relational data modeling, queries, and business-oriented data structures.",
    icon: "database",
  },
  {
    title: "Existing Application Improvements",
    icon: "improvements",
    description:
      "Refactoring, bug fixing, new features, integrations, and improvements to existing codebases.",
  },
];

export type Principle = {
  layer: string;
  title: string;
  description: string;
};

export const PRINCIPLES: Principle[] = [
  {
    layer: "Presentation",
    title: "Clean Architecture",
    description:
      "Designing systems with separation of concerns and maintainability in mind.",
  },
  {
    layer: "Application",
    title: "SOLID",
    description:
      "Writing code that is easier to understand, extend, and maintain.",
  },
  {
    layer: "Domain",
    title: "Business Logic",
    description:
      "Understanding the actual business problem before implementing the technical solution.",
  },
  {
    layer: "Infrastructure",
    title: "REST APIs",
    description:
      "Building structured communication between frontend applications and backend services.",
  },
  {
    layer: "Data",
    title: "Database Design",
    description:
      "Modeling data around real operational and financial requirements.",
  },
];

export const TECH_STACK = {
  Frontend: ["React", "Angular", "TypeScript"],
  Backend: [".NET", "C#"],
  Data: ["PostgreSQL", "SQL"],
  Infrastructure: ["Docker"],
  Architecture: ["Clean Architecture", "SOLID", "REST APIs"],
};

export const SOCIAL_LINKS = {
  github: "https://github.com/Paul3197",
  linkedin: "https://www.linkedin.com/in/paulrojas-dev/",
  email: "paulrjas31@gmail.com",
};
