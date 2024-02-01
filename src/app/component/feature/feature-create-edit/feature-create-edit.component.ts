import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from 'src/app/service/feature.service';
import { TaskService } from 'src/app/service/task.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-feature-create-edit',
  templateUrl: './feature-create-edit.component.html',
  styleUrls: ['./feature-create-edit.component.css']
})
export class FeatureCreateEditComponent {
  feature!: any[];
  users!: any[];
  tasks!: any[];

  public featureId:any
  public isEdit = false;
  constructor(private featureService: FeatureService, private route: ActivatedRoute, private router: Router,private taskService:TaskService,private userService:UserService) { }
  newForm!: FormGroup;
  userId!:string | null;
  user_id!:string;
  title!:string;
  desc!:string;
  due_date!:string;
  status!:string;
  async ngOnInit(){
    this.initForm();
    this.getUsers();
    this.getTasks();
    this.featureId = this.route.snapshot.paramMap.get("id");
    if(this.featureId){
     this.isEdit = true;
     await this.checkrouterparameter();
    }
  }

  async getUsers(){
    let data = {
      page: 1,
      limit: 1000,
    };
   
    var usersResponse:any = await this.userService.getUsers(data).toPromise();
    if (usersResponse) {

      this.users = usersResponse.users;
   
    }
    console.log(this.users);

  }
  async getTasks(){
    let data = {
      page: 1,
      limit: 1000,
    };
    var taskResponse:any = await this.taskService.getTasks().toPromise();
    if (taskResponse) {

      this.tasks = taskResponse.task;
   
    }
    console.log(this.tasks);

   
  }
  async checkrouterparameter() {
    this.featureService.getFeatureDetail(this.featureId ).subscribe((result:any)=>{
      console.log(result.feature);
      // this.user = result.t;
      
      let f =result.feature;
      var startDate = f.startDate;
      var dueDate = f.dueDate;

      var sdate;
      var ddate;
      if (typeof startDate === 'string') {
        startDate = new Date(startDate);
        dueDate = new Date(dueDate);
      }
      
      // Check if startDate is a valid Date object
      if (startDate instanceof Date) {
        // Format the date as yyyy-mm-dd
        var formattedStartDate = startDate.toISOString().split('T')[0];
        var formattedDueDate = startDate.toISOString().split('T')[0];

        sdate = formattedStartDate;
        ddate= formattedDueDate;
        // Now, formattedStartDate contains the date in "yyyy-mm-dd" format
        console.log(formattedStartDate);
      } else {
        console.error("Invalid startDate");
      }
      this.newForm.patchValue({
        title : f.title,
        desc: f.description,
        task_id: f.taskId,
        selectedUser : f.assignTo[0] || f.assignTo,
        start_date: sdate,
        due_date: ddate,
        status: f.status
      })
      })
  }
  private initForm() {
    let title = '';
    let desc = '';
    let task_id = '';
    let start_date;
    let due_date;
    let status = '';


    this.newForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'task_id': new FormControl(null,Validators.required),
      'start_date': new FormControl(due_date, Validators.required),
      'due_date': new FormControl(due_date, Validators.required),
      'status': new FormControl(status, Validators.required),
      'selectedUser': new FormControl(null, Validators.required)

    })
  }
  isFormValid() {
    return this.newForm.valid;
  }

  // Add a method to display validation messages
  getValidationMessage(controlName: string) {
    const control = this.newForm.get(controlName);
    console.log(control);
    
    if (control?.hasError('required')) {
      return `Field is required.`;
    }
    // Add more custom validation messages as needed
    return '';
  }
  async onSubmit() {
    if (!this.newForm.valid) {
      return;
    }
    this.userId = localStorage.getItem('id');
    const user = this.userId !== null ? this.userId : '';
    console.log(user);
    
    const newTask = {
     taskId :  this.newForm.value['task_id'],
     
     title : this.newForm.value['title'],
     description : this.newForm.value['desc'],
     status : this.newForm.value['status'],
     assignTo : this.newForm.value['selectedUser'],
     startDate : this.newForm.value['start_date'],
     dueDate : this.newForm.value['due_date'],
    }
    console.log('task',newTask);
   const res:any =await this.featureService.addFeature(newTask).toPromise();
    if (res) {
      console.log(res);
      
      this.router.navigate(['/feature/']);
    }
  }
  async onEdit(){
    if (!this.newForm.valid) {
      return;
    }
    this.userId = localStorage.getItem('id');
    const user = this.userId !== null ? this.userId : '';
    console.log(user);
    
    const newTask = {
     taskId :  this.newForm.value['task_id'],
     title : this.newForm.value['title'],
     description : this.newForm.value['desc'],
     status : this.newForm.value['status'],
     assignTo : this.newForm.value['selectedUser'],
     startDate : this.newForm.value['start_date'],
     dueDate : this.newForm.value['due_date'],
    }
    console.log('task',newTask);
   const res:any =await this.featureService.editFeature(this.featureId,newTask).toPromise();
    if (res) {
      console.log(res);
      
      this.router.navigate(['/feature/']);
    }
  }
}
