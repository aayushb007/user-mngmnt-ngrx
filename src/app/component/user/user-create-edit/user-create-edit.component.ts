import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent {
  public userForm!: FormGroup;
  public userId:any
  public isEdit = false;
  public user = {
    name: '',
    email: '',
    password: ''
  };
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
){}

async ngOnInit(){
 this.userId = this.route.snapshot.paramMap.get("id");
 if(this.userId){
  this.isEdit = true;
  await this.checkrouterparameter();
 }
 
}
async checkrouterparameter() {
  this.userService.getUserDetail(this.userId).subscribe((result:any)=>{
    console.log(result.users);
    this.user = result.users;
    })
}
onSubmit() {
  this.userService.editUser(this.userId,this.user).subscribe((res)=>{
    console.log(res);
    alert('User updated successfully')
  })
  console.log('Form submitted:', this.user);
}
onAdd(){
  this.userService.createUser(this.user).subscribe((res)=>{
    console.log(res);
    alert('User created successfully')

  })
}
}
