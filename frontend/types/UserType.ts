export interface UserType {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  tasksCreated: number;
  tasksCompleted: number;
  workspaces: number;
  gitHubProfile: string | null;
  linkedInProfile: string | null;
  portfolioWebsite: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  loading: boolean;
  error?: string;
}