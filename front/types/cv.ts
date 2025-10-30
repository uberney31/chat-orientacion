export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  skills: Skill[];
  lastUpdated?: Date;
}

