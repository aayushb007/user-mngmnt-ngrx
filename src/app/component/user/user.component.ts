import { Component, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from 'src/app/model/pager';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/task.state.interface';
import * as UserActions from '../../state/user.actions'
import { isLoadingSelector, usersSelector } from 'src/app/state/user.selectors';
import { Observable } from 'rxjs';
import { User } from 'src/app/users.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public users$!:Observable<User[]> ;
  users:any[] = [];
  isLoading$!: Observable<boolean>;
  public pageNo = 1;
  public searchString = "";
  sortField = [];
  @ViewChild("tables") table!: DatatableComponent;
  @ViewChild("content", { static: false }) content!: TemplateRef<any>;
  public pager = new Pager();
  constructor(private userService: UserService,private store: Store,private router:Router) { 
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.users$ = this.store.pipe(select(usersSelector))
  }
  async ngOnInit() {
  this.store.dispatch(UserActions.loadUser())
  this.users$.subscribe((users:any) => { this.users = users.users;
    this.pager.total = users.totalCount
    console.log(this.users);
  });

//  this.users = this.store.pipe(select(usersSelector));
 console.log(this.users);
//  this.pager.total =5
  // await this.getUsers();      
  }
  pageChange(page:any) {
    this.pageNo = page;
    let data = {
      page:  this.pageNo,
    }
    //  this.store.dispatch(UserActions.loadUser(data));


  }
  async getUsers(pageNo?: any, limit?: any) {
    let data = {
      page: pageNo ? pageNo : this.pageNo,
      limit: limit ? limit : 5,
    };
    // this.store.dispatch(UserActions.loadUsers(data));

    var usersResponse:any = await this.userService.getUsers(data).toPromise();
    if (usersResponse) {

      this.users$ = usersResponse.users;
      this.pager.total = usersResponse.totalCount
      this.users$.subscribe(users => this.users = users);
    }
    console.log(this.users);


  }
  navigateToEdit(id:any){
    this.router.navigate([`user/edit`, id]);
   
  }
  getUserById(id:any){
    this.router.navigate([`user/details/`, id]);

   
  }
}
