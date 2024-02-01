import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskService } from 'src/app/service/task.service';
import { AppState } from 'src/app/state/app.state.interface';
import { addTask } from 'src/app/state/task.actions';
import { Task } from 'src/app/state/task.model';

@Component({
  selector: 'app-task-create-edit',
  templateUrl: './task-create-edit.component.html',
  styleUrls: ['./task-create-edit.component.css']
})
export class TaskCreateEditComponent {
  task!: Task[];
  public taskId:any
  public isEdit = false;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,private store: Store<AppState>) { }
  newForm!: FormGroup;
  userId!:string | null;
  user_id!:string;
  title!:string;
  desc!:string;
  due_date!:string;
  status!:string;
  async ngOnInit(){
    this.initForm();
    this.taskId = this.route.snapshot.paramMap.get("id");
    if(this.taskId){
     this.isEdit = true;
     await this.checkrouterparameter();
    }
  }
  async checkrouterparameter() {
    this.taskService.getTaskDetail(this.taskId).subscribe((result:any)=>{
      console.log(result.users);
      // this.user = result.t;
      })
  }
  private initForm() {
    let title = '';
    let desc = '';
    let user_id = '';
    let due_date;
    let status = '';


    this.newForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'user_id': new FormControl(user_id,Validators.required),
      'due_date': new FormControl(due_date, Validators.required),
      'status': new FormControl(status, Validators.required)
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
      return `${controlName} is required.`;
    }
    // Add more custom validation messages as needed
    return '';
  }
  onSubmit() {
    this.userId = localStorage.getItem('id');
    const user = this.userId !== null ? this.userId : '';
    console.log(user);
    
    const newTask = {
      id : 1 ,
     featureId : 1 ,
     taskType : 'task',
     title : this.newForm.value['title'],
     userId : this.newForm.value['user_id'],
     description : this.newForm.value['desc'],
     startDate : "2023-06-20T00:00:00.000Z",
      dueDate : this.newForm.value['due_date'],
      status : this.newForm.value['status']
    }
    console.log('task',newTask);
   
     this.store.dispatch(addTask({task : newTask}))
     this.router.navigate(['/task/']);
  }
}
