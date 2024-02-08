import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserComponent } from './user.component';



const routes: Routes = [
  
      {
      path: 'add',
      component: UserCreateEditComponent,
      },
      {
        path: 'edit/:id',
        component: UserCreateEditComponent,
      },
      {
        path: 'details/:id',
        component: UserDetailsComponent,
      },
      {
        path: '',
        component: UserComponent,
      },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}