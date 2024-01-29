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
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks$: Observable<Task[]>;
  tasks!: any[];
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  public pageNo = 1;
  public searchString = "";
  sortField = [];
  @ViewChild("tables") table!: DatatableComponent;
  @ViewChild("content", { static: false }) content!: TemplateRef<any>;
  public pager = new Pager();
  constructor(private taskService:TaskService,private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.tasks$ = this.store.pipe(select(tasksSelector));
    
   }
  async ngOnInit() {
    this.store.dispatch(TasksAction.loadTasks());
    this.tasks$.subscribe((task:any)=>{ this.tasks =task,this.pager.total = 10} )    
    console.log(this.tasks);

  }
  pageChange(page:any) {
    this.pageNo = page;
  
  }
 
  deleteTask(taskId: any): void {
    this.store.dispatch(TasksAction.deleteTask({ taskId: taskId }));
  }

}
