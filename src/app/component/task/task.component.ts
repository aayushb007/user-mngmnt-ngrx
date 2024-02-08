import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { Pager } from 'src/app/model/pager';
import { TaskService } from 'src/app/service/task.service';
import { AppState } from 'src/app/state/app.state.interface';
import { Task } from 'src/app/state/task.model';
import { errorSelector, isLoadingSelector, tasksSelector } from 'src/app/state/task.selectors';
import * as TasksAction from 'src/app/state/task.actions';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public pageSize = 5; // Number of items per page
public page: number = 1; // Initial page
public pagedTasks: Task[] = [];
  tasks$: Observable<Task[]>;
  public taskId:any
  public isEdit = false;
  tasks!: any[];
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  public pageNo = 1;
  public searchString = "";
  sortField = [];
  @ViewChild("tables") table!: DatatableComponent;
  @ViewChild("content", { static: false }) content!: TemplateRef<any>;
  public pager = new Pager();
  constructor(private taskService:TaskService, private route: ActivatedRoute,private store: Store<AppState>,private router:Router) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.tasks$ = this.store.pipe(select(tasksSelector));
    
   }
  ngOnInit() {
   
    this.store.dispatch(TasksAction.loadTasks());
    this.tasks$.subscribe((task:any)=>{ console.log(task);
     this.tasks =task;
     this.pagedTasks = this.tasks
     this.updatePagedTasks();} )    
    console.log(this.tasks);

  }

  pageChange(page:any) {
    this.page = page.offset + 1;
    console.log(this.page);
    
    this.updatePagedTasks();
  }
  updatePagedTasks(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    console.log(this.tasks);
    console.log(startIndex,endIndex);
    
    this.pagedTasks = this.tasks.slice(startIndex, endIndex);
    console.log(this.pagedTasks);
    
    this.pager.total = this.tasks.length;
  }
  navigateToEdit(id:any){
    this.router.navigate([`task/edit`, id]);
   
  }

  getTaskById(id:any){
    this.router.navigate([`task/details`, id]);

  }
 
  deleteTask(taskId: any): void {
    this.store.dispatch(TasksAction.deleteTask({ taskId: taskId }));
  }

}
