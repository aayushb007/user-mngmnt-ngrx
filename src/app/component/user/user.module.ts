import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserDetailsComponent,
    UserCreateEditComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
