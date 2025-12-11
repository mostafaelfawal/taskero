export interface WorkspaceType {
  _id?: string;
  name: string;
  description: string;
  owners: { avatar: string }[];
  admins: string[];
  members: string[];
  projects: string[];
  createdAt: string;
  updatedAt: string;
}
