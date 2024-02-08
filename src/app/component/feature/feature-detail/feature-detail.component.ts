import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from 'src/app/service/feature.service';

@Component({
  selector: 'app-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.css']
})
export class FeatureDetailComponent {
  public Id: any;
  public feature:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private featureService: FeatureService
  ) {}
  async ngOnInit() {
    this.getfeatureDetails(this.route.snapshot.paramMap.get("id"));
  }
  getfeatureDetails(id:any){
    this.featureService.getFeatureDetail(id).subscribe((result:any)=>{
      if(result.feature){
          console.log(result.feature);
          this.feature = result.feature;
          
      }else{
        console.error("Feature not found");

      }
      

    })

  }
}
