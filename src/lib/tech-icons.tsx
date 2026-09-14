import type { IconType } from "react-icons";
import {
  SiReact,
  SiAngular,
  SiTypescript,
  SiDotnet,
  SiSharp,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";
import { Database, Layers, ShieldCheck, Network } from "lucide-react";

export const TECH_ICONS: Record<string, IconType> = {
  React: SiReact,
  Angular: SiAngular,
  TypeScript: SiTypescript,
  ".NET": SiDotnet,
  "C#": SiSharp,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
};

export const LUCIDE_TECH_ICONS: Record<string, typeof Database> = {
  SQL: Database,
  "Clean Architecture": Layers,
  SOLID: ShieldCheck,
  "REST APIs": Network,
};
