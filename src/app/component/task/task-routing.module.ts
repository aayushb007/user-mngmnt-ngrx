import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateEditComponent } from './task-create-edit/task-create-edit.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskComponent } from './task.component';




const routes: Routes = [
      {
      path: 'add',
      component: TaskCreateEditComponent,
      },
      {
        path: 'edit/:id',
        component: TaskCreateEditComponent,
      },
      {
        path: 'details/:id',
        component: TaskDetailsComponent,
      },
      {
        path: '',
        component: TaskComponent,
      },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}