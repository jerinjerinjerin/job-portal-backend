export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  refreshToken: string | null;
  role: 'employer' | 'candidate';
}

export interface ProfileAttributes {
    id: string;
    userId: string;
    bio?: string;
    avatar?: string;
}

export interface JobAttributes {
    id: string;
    userId: string;
    title: string;
    description: string;
    company: string;
    location: string;
}

export interface ApplicationAttributes {
    id: string;
    userId: string;
    jobId: string;
    status: 'pending' | 'accepted' | 'rejected';
}

export interface SkillAttributes {
  id: string;
  name: string;
}

export interface JobSkillAttributes {
  id: string;
  jobId: string;
  skillId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplicationSkillAttributes {
  id: string;
  applicationId: string;
  skillId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
