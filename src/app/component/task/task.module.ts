import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskCreateEditComponent } from './task-create-edit/task-create-edit.component';
import { TaskRoutingModule } from './task-routing.module';



@NgModule({
  declarations: [
    TaskDetailsComponent,
    TaskCreateEditComponent,

  ],
  imports: [
    TaskRoutingModule,
    CommonModule
  ]
})
export class TaskModule { }
