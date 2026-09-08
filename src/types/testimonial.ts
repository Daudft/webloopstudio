export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  content: string;
  rating: number;
  projectSlug?: string;
  highlight?: string;
}
