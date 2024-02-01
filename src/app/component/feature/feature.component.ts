import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from 'src/app/model/pager';
import { FeatureService } from 'src/app/service/feature.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent {
  public features = [];
  public pageNo = 1;
  public searchString = "";
  sortField = [];
  @ViewChild("tables") table!: DatatableComponent;
  @ViewChild("content", { static: false }) content!: TemplateRef<any>;
  public pager = new Pager();
  constructor(private featureService:FeatureService,private router:Router) { }
  async ngOnInit() {

    await this.getFeatures();
  }
  pageChange(page:any) {
    this.pageNo = page;
     this.getFeatures(this.pageNo, 5);

  }

  async getFeatures(pageNo?: any, limit?: any) {
    let data = {
      page: pageNo ? pageNo : this.pageNo,
      limit: limit ? limit : 15,
    };
    var usersResponse:any = await this.featureService.getFeatures(data).toPromise();
    if (usersResponse) {
      this.features = usersResponse.features;
      this.pager.total = usersResponse.totalCount
      console.log(this.features);
    }
    console.log(this.features);


  }
  navigateToEdit(id:any){
    this.router.navigate([`feature/edit`, id]);
   
  }
  deleteTask(Id: any): void {
    
  }
}
