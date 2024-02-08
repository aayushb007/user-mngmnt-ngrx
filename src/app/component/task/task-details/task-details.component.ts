import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  public Id: any;
  public task:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}
  async ngOnInit() {
    this.getTaskDetails(this.route.snapshot.paramMap.get("id"));
  }
  getTaskDetails(id:any){
    this.taskService.getTaskDetail(id).subscribe((result:any)=>{
      if (result.task) {
        console.log(result.task);
        this.task = result.task;
      } else {
        console.error("Task not found");
      }
    })
 }
}
