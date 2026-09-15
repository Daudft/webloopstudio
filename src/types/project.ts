export type ProjectCategory = 'Web Development' | 'Mobile Apps' | 'UI/UX Design' | 'AI & Automation' | 'Branding';

export interface ProjectOutcome {
  /** Short headline figure, e.g. "2x" or "3 weeks". */
  value: string;
  /** What the figure means, e.g. "faster checkout". */
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  thumbnail: string;
  year: string;
  /** Only include when you have a real, verifiable result to show. */
  outcome?: ProjectOutcome;
}
