
export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  completedAt?: string | null;
  createdAt?: string
  updatedAt?: string
}
