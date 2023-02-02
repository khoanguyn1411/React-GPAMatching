import { Project, ProjectDetail } from "./project";

export interface ProjectByUser {
  /** Project which created by user. */
  readonly ownedProject: ProjectDetail | null;
  readonly requestedProjects: readonly Project[];
  readonly joinedProjects: readonly Project[];
}
