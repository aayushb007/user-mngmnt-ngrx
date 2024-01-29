import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from 'src/app/model/pager';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public tasks = [];
  public pageNo = 1;
  public searchString = "";
  sortField = [];
  @ViewChild("tables") table!: DatatableComponent;
  @ViewChild("content", { static: false }) content!: TemplateRef<any>;
  public pager = new Pager();
  constructor(private taskService:TaskService) { }
  async ngOnInit() {

    await this.getTasks();
  }
  pageChange(page:any) {
    this.pageNo = page;
     this.getTasks(this.pageNo, 5);

  }
  async getTasks(pageNo?: any, limit?: any) {
    let data = {
      page: pageNo ? pageNo : this.pageNo,
      limit: limit ? limit : 5,
    };
    var usersResponse:any = await this.taskService.getTasks(data).toPromise();
    if (usersResponse) {
      this.tasks = usersResponse.task;
      this.pager.total = usersResponse.totalCount
      console.log(this.tasks);
    }
    console.log(this.tasks);


  }

}
