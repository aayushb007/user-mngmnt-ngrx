export interface Task {
  id:number,
  userId : number,
  featureId: number;
  description: string;
  status:string
  title: string;
  startDate: string;
  dueDate: string;
}
