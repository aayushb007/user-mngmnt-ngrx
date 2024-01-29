import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  public Id: any;
  public user:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService
  ) {}

  async ngOnInit() {
    this.getUserDetails(this.route.snapshot.paramMap.get("id"));
    
  }
  getUserDetails(id:any){
     this.userService.getUserDetail(id).subscribe((result:any)=>{
     console.log(result.users);
     this.user = result.users;
     })
  }
}
