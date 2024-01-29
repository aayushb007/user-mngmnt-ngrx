export interface Task {
    id: number;
    taskType: string;
    title: string;
    desc: string;
    status: string;
    startDate: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    FeatureId: number;
    feature_id: number | null;
    Users: User[];
  }

  export interface User {
    id?: number;
    name: string;
    email: string;
    
  }