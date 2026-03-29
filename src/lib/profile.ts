import { portfolio } from '@/data/portfolio';

type CourseworkBlock = {
  label: string;
  title: string;
  courses: string;
};

type ExperienceEntry = {
  title: string;
  company: string;
  period: string;
  state: string;
  description: string;
};

type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  state: string;
  description: string;
  coursework?: CourseworkBlock[];
};

export async function getProfileSnapshot(): Promise<{
  experience: ExperienceEntry[];
  education: EducationEntry[];
  source: 'local';
}> {
  return {
    experience: portfolio.experience,
    education: portfolio.education,
    source: 'local'
  };
}
